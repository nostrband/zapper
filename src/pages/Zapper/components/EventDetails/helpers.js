import { nostr } from '../../../../modules/nostr'

export const getSubtitle = (target) => {
   if (target.kind === 1) {
      return target.content
   }
   if (target.kind === 30023) {
      return (
         nostr.getTagValue(target, 'title') ||
         nostr.getTagValue(target, 'summary')
      )
   }
   return `Kind: ${target.kind}. ${nostr.getTagValue(target, 'alt')}`
}
