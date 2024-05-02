import React from 'react'
import { Developers } from './Developers'
import {
   Container,
   ContentContainer,
   Subtitle,
   TextContainer,
   Title,
} from './styled'
import { useLoadItems } from './hooks/useLoadItems'

const DEVELOPERS_ID =
   '2375be2176d462e87407294b0b47c8c36237bcbe66f45b802cc0c24deefa5ed2'
const OPERATORS_ID =
   'b216e1b4d061c75f31464d5ee837cc55fc8327b8b6a79622616cb67ae30824a1'
const MEMERS_ID =
   'a7eb4fa4231234756899b7aac02f7e0646af41e510685940a989079c0b665baa'
const PODCASTERS_ID =
   '63a922e19560e9d39be6c5646006bafde340abaca6d6290cf1921c7c867caf1b'

export const Support = () => {
   const [developers, isDevelopersLoading] = useLoadItems(DEVELOPERS_ID)
   const [operators, isOperatorsLoading] = useLoadItems(OPERATORS_ID)
   const [memers, isMemersLoading] = useLoadItems(MEMERS_ID)
   const [podcasters, isPodcastersLoading] = useLoadItems(PODCASTERS_ID)

   return (
      <Container component="section" name="support">
         <TextContainer>
            <Title>See the zapper in action</Title>
            <Subtitle>
               Try our sample zap-prism events to support many of the nostr
               developers and contributors.
            </Subtitle>
         </TextContainer>

         <ContentContainer>
            <Developers
               items={developers}
               isLoading={isDevelopersLoading}
               title="Nostr Developers"
               eventId={DEVELOPERS_ID}
            />
            <Developers
               items={operators}
               isLoading={isOperatorsLoading}
               title="Relay Operators"
               eventId={OPERATORS_ID}
            />
            <Developers
               items={memers}
               isLoading={isMemersLoading}
               title="Memers"
               eventId={MEMERS_ID}
            />
            <Developers
               items={podcasters}
               isLoading={isPodcastersLoading}
               title="Podcasters"
               eventId={PODCASTERS_ID}
            />
         </ContentContainer>
      </Container>
   )
}
