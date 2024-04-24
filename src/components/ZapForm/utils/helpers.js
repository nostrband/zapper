import { TYPE_ANON_ZAP, TYPE_SEND_SATS, TYPE_ZAP } from '../../../modules/nostr'

export const getSubmitLabel = (amount, type, zapsLength) => {
   if (!amount) return 'Specify amount first'
   let label = ''

   if (type === TYPE_ZAP || type === TYPE_ANON_ZAP) label = 'Zap'
   if (type === TYPE_SEND_SATS) label = 'Send'

   label += ` ${amount} sats`
   if (zapsLength > 1) label += ` to ${zapsLength} recipients`
   return label
}
