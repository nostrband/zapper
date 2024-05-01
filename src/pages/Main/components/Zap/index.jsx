import React, { useContext } from 'react'
import { Container, StyledImageWrapper, StyledPreviewButton } from './styled'
import { ZapperDarkImage, ZapperLightImage } from '../../../../assets/images'
import { ColorModeContext } from '../../../../store/ColorMode.Context'

export const Zap = () => {
   const { mode } = useContext(ColorModeContext)
   const image = mode === 'dark' ? ZapperDarkImage : ZapperLightImage
   return (
      <Container>
         <StyledPreviewButton />
         <StyledImageWrapper>
            <img src={image} alt="Zapper" />
         </StyledImageWrapper>
      </Container>
   )
}
