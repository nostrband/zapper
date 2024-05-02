import React from 'react'
import { Link } from 'react-router-dom'
import { AppTitle, Container, LogoWrapper } from './styled'
import { AppLogoIcon } from '../../assets/icons'

export const AppLogo = () => {
   return (
      <Container component={Link} to="/">
         <LogoWrapper>
            <AppLogoIcon />
         </LogoWrapper>

         <AppTitle id="app_title">Zapper</AppTitle>
      </Container>
   )
}
