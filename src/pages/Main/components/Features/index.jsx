import React from 'react'
import { FEATURES } from './const'
import { Container } from './styled'
import { ItemFeature } from './ItemFeature'

export const Features = () => {
   return (
      <Container>
         {FEATURES.map((feature) => {
            return <ItemFeature key={feature.id} {...feature} />
         })}
      </Container>
   )
}
