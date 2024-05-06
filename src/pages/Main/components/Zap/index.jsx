import React, { useContext } from 'react'
import { useMediaQuery } from '@uidotdev/usehooks'
import { Container, StyledImageWrapper } from './styled'
import {
   DarkPhoneImage,
   LightPhoneImage,
   DarkPhoneSmallImage,
   LightPhoneSmallImage,
} from '../../../../assets/images'
import { ColorModeContext } from '../../../../store/ColorMode.Context'

const getMockupSource = (mode, isMobile) => {
   const darkMode = mode === 'dark'
   if (isMobile) {
      return darkMode ? DarkPhoneSmallImage : LightPhoneSmallImage
   }
   return mode === 'dark' ? DarkPhoneImage : LightPhoneImage
}

export const Zap = () => {
   const { mode } = useContext(ColorModeContext)
   const isMobile = useMediaQuery('(max-width: 485px)')
   const image = getMockupSource(mode, isMobile)

   return (
      <Container>
         <StyledImageWrapper>
            <img src={image} alt="Zapper" />
         </StyledImageWrapper>
      </Container>
   )
}
