import { TYPE_ANON_ZAP, TYPE_SEND_SATS, TYPE_ZAP } from '../../../modules/nostr'
import { formatCurrency, formatSats } from '../../../utils/helpers/general'

export const getSubmitLabel = (amount, type, zapsLength) => {
   if (!amount) return 'Specify amount first'
   let label = ''

   if (type === TYPE_ZAP || type === TYPE_ANON_ZAP) label = 'Zap'
   if (type === TYPE_SEND_SATS) label = 'Send'

   label += ` ${formatCurrency(amount)} sats`
   if (zapsLength > 1) label += ` to ${zapsLength} recipients`
   return label
}

export const getNumericValue = (value = 0) => {
   return Number(String(value).replace(/\D/g, ''))
}

export const getStatusLabel = (zaps) => {
   let status = ''
   const paid = zaps.reduce((total, zap) => {
      return total + (zap.status === 'done' ? zap.amount : 0)
   }, 0)
   const done = zaps.filter((z) => z.status === 'done').length
   const error = zaps.filter((z) => z.status === 'error').length
   const todo = done === zaps.length ? done : `${done}/${zaps.length}`
   status = `Sent ${formatSats(paid)} sats to ${todo} recipients`
   if (error) status += `, ${error} errors`
   return status
}
