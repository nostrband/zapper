import React from 'react'
import { Avatar, Button } from '@mui/material'
import { Container, StyledAvatarGroup, Title } from './styled'
import { MOCK_DEVELOPERS } from './const'

export const Developers = () => {
   return (
      <Container>
         <Title>Support Nostr Developers</Title>
         <StyledAvatarGroup max={7}>
            {MOCK_DEVELOPERS.map((dev) => (
               <Avatar key={dev.id} src={dev.picture} alt={dev.name}>
                  {dev.name[0].toUpperCase()}
               </Avatar>
            ))}
         </StyledAvatarGroup>
         <Button>Zap Nostr Developers</Button>
      </Container>
   )
}
