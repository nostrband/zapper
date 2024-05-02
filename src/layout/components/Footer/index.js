import React from 'react'
import {
   InnerContainer,
   StyledDescriptionText,
   StyledFooter,
   StyledIconButton,
   StyledLink,
} from './styled'
import { AppLogo } from '../../../shared/AppLogo'
import { GitHubLogoIcon } from '../../../assets/icons'

export const Footer = () => {
   return (
      <StyledFooter>
         <InnerContainer>
            <AppLogo />

            <StyledDescriptionText>
               Zapper is an open source project by{' '}
               <StyledLink
                  href=" https://nostr.band"
                  target="_blank"
                  rel="noreferrer"
               >
                  Nostr.Band
               </StyledLink>
               . Design by{' '}
               <StyledLink
                  href="https://opensats.org/"
                  target="_blank"
                  rel="noreferrer"
               >
                  OpenSats initiative.
               </StyledLink>
            </StyledDescriptionText>

            <StyledIconButton
               href="https://github.com/nostrband/zapper"
               target="_blank"
            >
               <GitHubLogoIcon />
            </StyledIconButton>
         </InnerContainer>
      </StyledFooter>
   )
}
