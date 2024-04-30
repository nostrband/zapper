import React from 'react'
import { Container, StyledImageWrapper, StyledPreviewButton } from './styled'
import { ZapperImage } from '../../../../assets/images'

export const Zap = () => {
   return (
      <Container>
         <StyledPreviewButton />
         <StyledImageWrapper>
            <img src={ZapperImage} alt="Zapper" />
         </StyledImageWrapper>
      </Container>
   )
}
