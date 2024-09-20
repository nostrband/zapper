import { nip19 } from 'nostr-tools'
import { TYPE_ZAP, nostr } from '../../../modules/nostr'

export const loadTargetData = async (id) => {
   if (!id) throw new Error('Specify id')

   const targets = []
   let target = ''
   let relays = ['wss://relay.nostr.band/']
   const { type: idType, data } = nip19.decode(id)
   switch (idType) {
      case 'npub':
         targets.push({
            pubkey: data,
            weight: 1.0,
         })
         break

      case 'nprofile':
         targets.push({
            pubkey: data.pubkey,
            weight: 1.0,
         })
         relays.push(...(data.relays || []))
         break

      case 'note':
         target = data
         break

      case 'nevent':
         target = data.id
         relays.push(...(data.relays || []))
         break

      case 'naddr':
         target = `${data.kind}:${data.pubkey}:${data.identifier}`
         relays.push(...(data.relays || []))
         break

      case 'nrelay':
         target = data
         break

      default:
         throw new Error(`Bad id ${id}`)
   }
   relays = relays.filter((r) => r !== '')
   // FIXME add current users relays!
   let ndk = await nostr.getNDK(relays)

   let targetEvent = null

   if (target !== '') {
      if (target.toLowerCase().startsWith('wss://')) {
         throw new Error('Nrelay not supported yet')
         // FIXME get relay info
      }
      if (target.includes(':')) {
         targetEvent = await nostr.fetchEventByAddr(ndk, target)
         if (!targetEvent) {
            throw new Error(`Failed to fetch target event by addr ${target}`)
         }
      } else {
         targetEvent = await nostr.fetchEventById(ndk, target)
         if (!targetEvent) {
            throw new Error(`Failed to fetch target event by id ${target}`)
         }
      }
   }

   // check zap tags of the target event for zap-split logic
   if (targetEvent) {
      const tags = targetEvent.tags.filter(
         (t) => t.length >= 2 && t[0] === 'zap'
      )
      if (tags.length) {
         // collect zap-split targets
         tags.forEach((z) => {
            // collect relays
            if (z.length >= 3 && z[2] !== '') relays.push(z[2])

            const pubkey = z[1]
            const weight = z.length >= 4 ? Number(z[3]) : 0.0
            targets.push({ pubkey, weight })
         })

         // all weights are zero
         if (!targets.find((t) => t.weight > 0.0))
            targets.forEach((z) => {
               z.weight = 1.0
            }) // set equal weights

         // make sure ndk connects to these relays too
         ndk = await nostr.getNDK(relays)
      } else {
         targets.push({
            pubkey: targetEvent.pubkey,
            weight: 1.0,
         })
      }
   }

   // no targets? we're done
   if (targets.length === 0) {
      throw new Error('No zap target found')
   }

   const pubkeys = targets.map((pw) => pw.pubkey)
   if (targetEvent) pubkeys.push(targetEvent.pubkey)

   const metas = await nostr.fetchMetas(ndk, pubkeys)

   if (targetEvent) {
      targetEvent.meta = metas.find((m) => m.pubkey === targetEvent.pubkey)
   }

   return {
      relays: [...new Set(relays)],
      targets,
      metas,
      targetEvent,
   }
}

export const getZaps = async (
   target,
   targetPubkeyWeights = [],
   relays = [],
   metas = [],
   type = TYPE_ZAP,
   amount = 0,
   comment = ''
) => {
   const ndk = await nostr.getNDK([])

   const totalWeight = targetPubkeyWeights.reduce((total, pw) => {
      total += pw.weight
      return total
   }, 0)

   const zaps = targetPubkeyWeights.map((pw, index) => {
      const weight = pw.weight / totalWeight
      const msats = Math.floor(1000 * amount * weight)
      const zap = nostr.createZap(ndk, {
         amount,
         comment,
         relays,
         msats,
         pubkey: pw.pubkey,
         target,
      })

      const meta = metas.find((m) => m.pubkey === pw.pubkey)

      return {
         index,
         zap,
         weight,
         meta,
         type,
         pubkey: pw.pubkey,
         amount: msats,
         comment,
         status: '',
      }
   })

   return zaps
}
