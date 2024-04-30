import React, { memo } from 'react'
import { useOptimizedMediaSource } from '../../hooks/useOptimizedMediaSource'
import { getProfileName } from './helpers'
import { Container, StyledAvatar, StyledUserName } from './styled'
import { encodeNpub } from '../../utils/helpers/general'

export const Profile = memo(function Profile({
   profile,
   withUserName = true,
   withBorder = false,
}) {
   const profileImage = useOptimizedMediaSource({
      pubkey: profile.pubkey,
      originalImage: profile.meta?.profile?.picture,
   })
   const userName = getProfileName(profile)

   const linkPath = `nostr:${encodeNpub(profile.pubkey)}`

   return (
      <Container component="a" href={linkPath} target="_blank">
         <StyledAvatar
            variant="rounded"
            src={profileImage}
            alt={userName}
            title={userName}
            withBorder={withBorder}
         />
         {withUserName && <StyledUserName>{userName}</StyledUserName>}
      </Container>
   )
})
