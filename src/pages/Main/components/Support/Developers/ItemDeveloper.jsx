import React from 'react'
import { Avatar } from '@mui/material'
import { useOptimizedMediaSource } from '../../../../../hooks/useOptimizedMediaSource'
import { getProfileUsername, getShortenNpub } from '../utils/helpers'

export const ItemDeveloper = (props) => {
   const { profile, pubkey } = props

   const profileImage = useOptimizedMediaSource({
      pubkey,
      originalImage: profile?.picture,
   })

   const username = getProfileUsername(profile) || getShortenNpub(pubkey)
   const avatarTitle = username[0].toUpperCase()

   return (
      <Avatar src={profileImage} alt={username}>
         {avatarTitle}
      </Avatar>
   )
}
