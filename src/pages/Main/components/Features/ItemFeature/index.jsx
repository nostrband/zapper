import React from 'react'
import { useNavigate } from 'react-router-dom'
import { scroller } from 'react-scroll'
import { Background, Container, Description, Title } from './styled'

export const ItemFeature = ({ description, title, background, icon, id }) => {
   const navigate = useNavigate()

   const handleFeatureClick = () => {
      if (id === 'about') return navigate('/about')
      if (id === 'support') {
         return scroller.scrollTo('support', {
            duration: 100,
            smooth: true,
         })
      }
      if (id === 'zap') {
         return scroller.scrollTo('zap', {
            duration: 100,
            smooth: true,
         })
      }
      return null
   }
   return (
      <Container onClick={handleFeatureClick}>
         {icon}
         <Title>{title}</Title>
         <Description>{description}</Description>
         <Background url={background} />
      </Container>
   )
}
