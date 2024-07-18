import NDK, { NDKRelay, NDKNip07Signer, NDKEvent } from '@nostr-dev-kit/ndk'
import {
   generatePrivateKey,
   getSignature,
   getEventHash,
   getPublicKey,
} from 'nostr-tools'
import { bech32 } from '@scure/base'
import { ZAP_STATUS } from '../utils/constants/general'

export const TYPE_ZAP = 'zap'
export const TYPE_ANON_ZAP = 'anon-zap'
export const TYPE_SEND_SATS = 'send-sats'

let hasNip07 = false
let hasWebLN = false

let ndkObject = null

let cancelNextZap = false

const utf8Decoder = new TextDecoder('utf-8')

function getTags(e, name) {
   return e.tags.filter((t) => t.length > 0 && t[0] === name)
}

function getTag(e, name) {
   const tags = getTags(e, name)
   if (tags.length === 0) return null
   return tags[0]
}

function getTagValue(e, name, index, def) {
   const tag = getTag(e, name)
   if (tag === null || !tag.length || (index && index >= tag.length))
      return def !== undefined ? def : ''
   return tag[1 + (index || 0)]
}

function enableWindowInterface(name, cb) {
   // check window[name] periodically, backoff exponentially,
   // and if we've detected it give it a bit more time
   // to init
   let period = 100
   let has = false
   async function check() {
      if (has) {
         cb()
      } else if (name in window) {
         has = true
         // wait until it initializes
         setTimeout(check, 200)
      } else {
         period *= 2
         setTimeout(check, period)
      }
   }

   // start
   check()
}

enableWindowInterface('nostr', () => {
   hasNip07 = true
   //  if (ndkObject)
   //    ndkObject.signer = new NDKNip07Signer();
})

enableWindowInterface('webln', () => {
   hasWebLN = true
   window.webln.enable()
})

export function setWebLNEnabled(e) {
   hasWebLN = e
}

async function getNDK(relays) {
   if (!ndkObject) {
      relays = [...new Set([...relays, 'wss://relay.nostr.band/all'])]

      //      const nip07signer = hasNip07 ? new NDKNip07Signer() : null
      ndkObject = new NDK() //{ signer: nip07signer })
   }

   const rs = []
   for (const r of relays) {
      if (ndkObject.pool.relays.get(r)) continue

      const relay = new NDKRelay(r)
      ndkObject.pool.addRelay(relay)
      rs.push(relay.connect())
   }

   const to = new Promise((ok) => {
      setTimeout(ok, 1000)
   })

   // wait until all new relays connect, or a timeout is hit
   await Promise.race([to, Promise.allSettled(rs)])

   return ndkObject
}

async function fetchMetas(ndk, pubkeys) {
   const filter = {
      kinds: [0],
      authors: pubkeys,
   }
   let events = await ndk.fetchEvents(filter)
   events = [...events.values()]
   events.forEach((e) => {
      try {
         e.profile = JSON.parse(e.content)
      } catch {
         console.log('error')
      }
   })

   console.log('pubkeys', pubkeys, 'events', events)

   return events
}

async function fetchEventById(ndk, id) {
   const filter = {
      ids: [id],
   }
   const event = await ndk.fetchEvent(filter)
   console.log('id', id, 'event', event)

   return event
}

async function fetchEventByAddr(ndk, addr) {
   const v = addr.split(':')
   const filter = {
      kinds: [Number(v[0])],
      authors: [v[1]],
   }
   if (v[2] !== '') filter['#d'] = [v[2]]

   const events = await ndk.fetchEvents(filter)
   console.log('filter', filter, 'events', events)
   for (const e of events.values()) {
      const d = getTagValue(e, 'd')
      if (e.kind === Number(v[0]) && e.pubkey === v[1] && d === v[2]) {
         console.log('addr', addr, 'event', e)
         return e
      }
   }

   return null
}

async function fetchPrism(ndk, id) {
   const list = await fetchEventById(ndk, id)
   const pubkeys = []
   list.tags.forEach((t) => {
      if (t.length >= 2 && t[0] === 'zap') pubkeys.push(t[1])
   })
   return fetchMetas(ndk, pubkeys)
}

async function fetchInvoice(zap) {
   let url = `${zap.callback}${zap.callback.includes('?') ? '&' : '?'}amount=${
      zap.amount
   }`
   if (zap.type !== TYPE_SEND_SATS) {
      const event = encodeURI(JSON.stringify(await zap.zap.toNostrEvent()))
      url += `&nostr=${event}`
   }
   console.log('invoice url', zap, url)

   const res = await fetch(url)
   console.log('invoice url result', res)
   if (res.status !== 200) throw new Error('Failed to fetch invoice')

   const body = await res.json()
   if (body.status === 'ERROR') throw new Error('Failed to generate invoice')

   return body.pr
}

async function fetchInvoiceCallback(meta) {
   try {
      let lnurl = ''
      const { lud06, lud16 } = JSON.parse(meta.content)
      if (lud16) {
         const [name, domain] = lud16.split('@')
         lnurl = `https://${domain}/.well-known/lnurlp/${name}`
      } else if (lud06) {
         const { words } = bech32.decode(lud06, 1000)
         const data = bech32.fromWords(words)
         lnurl = utf8Decoder.decode(data)
      } else {
         return {}
      }

      const res = await fetch(lnurl)
      console.log('res', res)
      const body = await res.json()

      const canNostr = body.allowsNostr && body.nostrPubkey
      return { callback: body.callback, canNostr }
   } catch (err) {
      console.log('fetch error', err)
   }

   return {}
}

export function cancelZap() {
   cancelNextZap = true
}

function maybeCancel(zap, log, updateZap) {
   if (!cancelNextZap) return false
   cancelNextZap = false
   zap.status = ZAP_STATUS.ERROR
   zap.error = 'Cancelled'
   zap.cancelled = true
   log('Cancelled')
   updateZap(zap)
   return true
}

export async function sendZap(zap, log, updateZap) {
   if (maybeCancel(zap, log, updateZap)) return zap

   zap.status = ZAP_STATUS.INVOICE
   updateZap(zap)

   try {
      log(`Zapping ${zap.pubkey}...`)
      if (!zap.meta)
         throw new Error(`Failed to load profile info for ${zap.pubkey}`)

      // get the nostr-invoice url
      log('Fetching callback...')
      const { callback, canNostr } = await fetchInvoiceCallback(zap.meta)
      zap.callback = callback

      if (maybeCancel(zap, log, updateZap)) return zap
      if (!callback) throw new Error('Failed to fetch invoice endpoint')

      if (zap.type !== TYPE_SEND_SATS && !canNostr)
         throw new Error('Zaps not supported by recipient')

      updateZap(zap)
      log(`Callback: ${zap.callback}`)

      if (zap.type === TYPE_ZAP || zap.type === TYPE_ANON_ZAP) {
         log('Signing...')
         if (zap.type === TYPE_ZAP) {
            if (!hasNip07 || !window.nostr)
               throw new Error('Please use a browser extension to login')

            const signed = await window.nostr.signEvent({
               kind: zap.zap.kind,
               created_at: zap.zap.created_at,
               tags: zap.zap.tags,
               content: zap.zap.content,
            })
            zap.zap.pubkey = signed.pubkey
            zap.zap.id = signed.id
            zap.zap.sig = signed.sig
         } else {
            const sk = generatePrivateKey()
            zap.zap.pubkey = getPublicKey(sk)
            zap.zap.id = getEventHash(zap.zap)
            zap.zap.sig = getSignature(zap.zap, sk)
         }
         console.log('signed zap', zap)
         updateZap(zap)
         log('Signed')
      }
      if (maybeCancel(zap, log, updateZap)) return zap

      // get invoice tied to our zap request
      log('Fetching invoice...')
      zap.invoice = await fetchInvoice(zap)
      updateZap(zap)
      log(`Invoice: ${zap.invoice}`)
      if (maybeCancel(zap, log, updateZap)) return zap

      // try to pay w/ webln
      if (hasWebLN) {
         zap.status = ZAP_STATUS.PAYING
         updateZap(zap)

         log('Paying...')
         const r = await window.webln.sendPayment(zap.invoice)
         log(`Paid: ${r.preimage}`)
         console.log('zap result', r)

         zap.status = ZAP_STATUS.DONE
      } else {
         // show the invoice and wait until it's paid
         zap.status = ZAP_STATUS.WAITING
      }
   } catch (e) {
      console.log('Zap send failed', e)
      log(`Error: ${e}`)
      zap.error = e
      zap.status = ZAP_STATUS.ERROR
   }
   updateZap(zap)

   return zap
}

export function arrayEquals(a, b) {
   return (
      Array.isArray(a) &&
      Array.isArray(b) &&
      a.length === b.length &&
      a.every((val, index) => val === b[index])
   )
}

function createZap(ndk, { comment, relays, msats, pubkey, target }) {
   const zap = new NDKEvent(ndk, {
      kind: 9734,
      content: comment,
      created_at: Math.floor(Date.now() / 1000),
      tags: [
         ['relays', ...relays],
         ['amount', msats.toString()],
         ['p', pubkey],
      ],
   })

   if (target) {
      if (
         target.kind === 0 ||
         target.kind === 3 ||
         (target.kind >= 10000 && target.kind < 20000) ||
         (target.kind >= 30000 && target.kind < 40000)
      ) {
         zap.tags.push([
            'a',
            `${target.kind}:${target.pubkey}:${getTagValue(target, 'd')}`,
         ])
      }
      zap.tags.push(['e', target.id])
   }

   return zap
}

export const nostr = {
   hasWebLN: () => hasWebLN,
   getTagValue,
   getNDK,
   fetchMetas,
   fetchEventByAddr,
   fetchPrism,
   fetchEventById,
   createZap,
   sendZap,
}
