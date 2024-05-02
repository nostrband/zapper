import { nip19 } from 'nostr-tools'

export function formatAmount(a) {
   let s = a
   a = Math.floor(a / 1000)
   if (a >= 1) s = `${a}K`
   a = Math.floor(a / 1000)
   if (a >= 1) s = `${a}M`
   return s
}

export function formatSats(msats) {
   return (msats / 1000).toLocaleString(undefined, {
      minimumFractionDigits: 0,
   })
}

export const formatNpub = (pubkey) => {
   const npub = nip19.npubEncode(pubkey)
   return `${npub.substring(0, 10)}...${npub.substring(npub.length - 4)}`
}

export const encodeNpub = (pubkey) => {
   return nip19.npubEncode(pubkey)
}

export const formatDate = (seconds = 0) => {
   return new Date(seconds * 1000).toLocaleString()
}

export const formatCurrency = (amount = 0) => {
   return new Intl.NumberFormat('en').format(amount)
}
