import React, { useContext } from 'react'
import { IconButton, Stack } from '@mui/material'
import { InnerContainer, StyledHeader, StyledIconButton } from './styled'
import { AppLogo } from '../../../shared/AppLogo'
import { ColorModeContext } from '../../../store/ColorMode.Context'
import {
   GitHubLogoIcon,
   LightModeIcon,
   NightModeIcon,
} from '../../../assets/icons'

export const Header = () => {
   const { toggleColorMode, mode } = useContext(ColorModeContext)
   const darkMode = mode === 'dark'

   return (
      <StyledHeader>
         <InnerContainer>
            <AppLogo />

            <Stack direction="row" alignItems="center" gap="1.5rem">
               <IconButton onClick={toggleColorMode}>
                  {darkMode ? <LightModeIcon /> : <NightModeIcon />}
               </IconButton>

               <StyledIconButton
                  href="https://github.com/nostrband/zapper"
                  target="_blank"
               >
                  <GitHubLogoIcon />
               </StyledIconButton>
            </Stack>
         </InnerContainer>
      </StyledHeader>
   )
}
