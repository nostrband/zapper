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

   const handleToggleColorMode = () => {
      toggleColorMode()
   }

   return (
      <StyledHeader>
         <InnerContainer>
            <AppLogo />

            <Stack direction="row" alignItems="center" gap="0.5rem">
               <IconButton onClick={handleToggleColorMode}>
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
