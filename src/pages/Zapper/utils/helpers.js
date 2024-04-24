import { TYPE_ZAP, TYPE_ANON_ZAP } from '../../../modules/nostr'

export const getHeadingByTab = (type) => {
   if (type === TYPE_ZAP) {
      return 'Zap will be published on Nostr under your name.'
   }
   if (type === TYPE_ANON_ZAP) {
      return 'Zap will be published on Nostr anonymously.'
   }
   return 'No event will be published on Nostr.'
}
