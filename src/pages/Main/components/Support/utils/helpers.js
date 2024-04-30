export const getShortenNpub = (npub = '') => {
   return `${npub.substring(0, 10)}...${npub.slice(-4)}`
}

export const getProfileUsername = (profile) => {
   if (!profile) return undefined
   return profile?.info?.name || profile?.info?.display_name
}
