import { useEffect, useState } from 'react'
import { DefaultUserImage } from '../assets/images'

const MEDIA_NOSTR_BAND_BASE_URL = 'https://media.nostr.band/thumbs'

const isGuest = (pubkey) => {
   return !pubkey || pubkey.length !== 64
}

const getPubkeyLast4Chars = (pubkey) => {
   if (pubkey.length >= 4) return pubkey.slice(-4)
   return pubkey
}

export const useOptimizedMediaSource = ({
   pubkey,
   originalImage,
   mediaType = 'picture',
   size = 64,
} = {}) => {
   const [isFailed, setIsFailed] = useState(false)
   const [isLoading, setIsLoading] = useState(false)

   const last4Chars = getPubkeyLast4Chars(pubkey)
   const generatedURL = `${MEDIA_NOSTR_BAND_BASE_URL}/${last4Chars}/${pubkey}-${mediaType}-${size}`

   useEffect(() => {
      if (!pubkey || !originalImage || isGuest(pubkey)) return undefined

      const image = new Image()
      image.onloadstart = () => {
         setIsLoading(true)
         setIsFailed(false)
      }
      image.onload = () => {
         setIsLoading(false)
         setIsFailed(false)
      }
      image.onerror = () => {
         setIsFailed(true)
         setIsLoading(false)
      }

      image.src = generatedURL
      return undefined
   }, [pubkey, originalImage, generatedURL])

   if (!pubkey || !originalImage || isGuest(pubkey)) {
      return DefaultUserImage
   }

   if (isLoading) {
      return DefaultUserImage
   }

   if (isFailed) {
      return originalImage
   }

   return generatedURL
}
