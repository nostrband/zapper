import React from 'react'
import { useNavigate } from 'react-router-dom'
import { scroller } from 'react-scroll'
import { useMediaQuery } from '@mui/material'
import { Background, Container, Description, Title } from './styled'

export const ItemFeature = ({ description, title, background, icon, id }) => {
   const navigate = useNavigate()

   const matches = useMediaQuery('(max-width:485px)')

   const handleFeatureClick = () => {
      if (id === 'about') return navigate('/about')
      if (id === 'support') {
         return scroller.scrollTo('support', {
            duration: 100,
            smooth: true,
            offset: matches ? 300 : 100,
         })
      }
      return null
   }
   return (
      <Container onClick={handleFeatureClick} id={id}>
         {icon}
         <Title>{title}</Title>
         <Description>{description}</Description>
         <Background url={background} />
      </Container>
   )
}
