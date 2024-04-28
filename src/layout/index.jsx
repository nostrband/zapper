import React from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { Header } from './components/Header'
import { Footer } from './components/Footer'
import { BackgroundContainer, StyledContainer } from './styled'

export const Layout = () => {
   const { pathname } = useLocation()
   const showFooter = pathname !== '/zap'
   return (
      <StyledContainer>
         <Header />
         <BackgroundContainer />
         <main id="main">
            <Outlet />
         </main>
         {showFooter && <Footer />}
      </StyledContainer>
   )
}
