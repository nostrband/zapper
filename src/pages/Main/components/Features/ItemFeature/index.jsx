import React from 'react'
import { Background, Container, Description, Title } from './styled'

export const ItemFeature = ({ description, title, background, icon }) => {
   return (
      <Container>
         {icon}
         <Title>{title}</Title>
         <Description>{description}</Description>
         <Background url={background} />
      </Container>
   )
}
