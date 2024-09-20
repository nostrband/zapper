import { nostr } from '../../../../../modules/nostr'

export const getPrismById = async (id) => {
   const relays = ['wss://relay.nostr.band/']
   const ndk = await nostr.getNDK(relays)
   const result = await nostr.fetchPrism(ndk, id)
   return result
}
