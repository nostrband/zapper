import React from 'react'
import { Developers } from './Developers'
import { Container, Subtitle, Title } from './styled'

export const Support = () => {
   return (
      <Container>
         <Title>See the zapper in action</Title>
         <Subtitle>
            Try our sample zapper event that supports many of the nostr protocol
            developers, designers and service providers.
         </Subtitle>
         <Developers />
      </Container>
   )
}
