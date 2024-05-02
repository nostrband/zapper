import { formatNpub } from '../../utils/helpers/general'

export const getProfileName = (e) => {
   return (
      e.meta?.profile?.display_name ||
      e.meta?.profile?.name ||
      formatNpub(e.pubkey)
   )
}
