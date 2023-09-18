import { TYPE_ZAP, TYPE_ANON_ZAP, TYPE_SEND_SATS } from '../../../modules/nostr'

export const TABS = [
   {
      title: 'Zap',
      value: TYPE_ZAP,
   },
   {
      title: 'Anon zap',
      value: TYPE_ANON_ZAP,
   },
   {
      title: 'Send sats',
      value: TYPE_SEND_SATS,
   },
]

export const QUERY_PARAM_KEYS = {
   ID: 'id',
   TYPE: 'type',
   COMMENT: 'comment',
   AUTO_SEND: 'auto_send',
   AMOUNT: 'amount',
}
