import { TYPE_ANON_ZAP, TYPE_SEND_SATS, TYPE_ZAP } from '../../../modules/nostr'
import { formatSats } from '../../../utils/helpers/general'

export const getHeadingByTab = (type) => {
   if (type === TYPE_ZAP) {
      return 'Zap will be published on Nostr under your name.'
   }
   if (type === TYPE_ANON_ZAP) {
      return 'Zap will be published on Nostr anonymously.'
   }
   return 'No event will be published on Nostr.'
}

export const getSubmitLabel = (amount, type, zapsLength) => {
   if (!amount) return 'Specify amount first'
   let label = ''

   if (type === TYPE_ZAP || type === TYPE_ANON_ZAP) label = 'Zap'
   if (type === TYPE_SEND_SATS) label = 'Send'

   label += ` ${amount} sats`
   if (zapsLength > 1) label += ` to ${zapsLength} recipients`
   return label
}

export const getStatusLabel = (zaps) => {
   let status = ''
   const paid = zaps.reduce((total, zap) => {
      return total + (zap.status === 'done' ? zap.amount : 0)
   }, 0)
   const done = zaps.filter((z) => z.status === 'done').length
   //		const todo = zaps.filter(z => !z.status).length;
   const error = zaps.filter((z) => z.status === 'error').length
   const todo = done === zaps.length ? done : `${done}/${zaps.length}`
   status = `Sent ${formatSats(paid)} sats to ${todo} recipients`
   if (error) status += `, ${error} errors`
   return status
}
