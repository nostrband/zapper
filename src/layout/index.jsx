import React from 'react'
import { Outlet } from 'react-router-dom'
import { Header } from './components/Header'
import { Footer } from './components/Footer'
import { BackgroundContainer, StyledContainer } from './styled'
import { DecorImage } from '../assets/images'

export const Layout = () => {
   return (
      <StyledContainer>
         <Header />
         <main id="main">
            <BackgroundContainer>
               <img src={DecorImage} alt="Hero decoration" width="100%" />
            </BackgroundContainer>
            <Outlet />
         </main>
         <Footer />
      </StyledContainer>
   )
}
