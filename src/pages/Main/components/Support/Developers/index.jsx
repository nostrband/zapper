import React from 'react'
import { useNavigate } from 'react-router-dom'
import { nip19 } from 'nostr-tools'
import { Button } from '@mui/material'
import { Container, StyledAvatarGroup, StyledSkeleton, Title } from './styled'
import { ItemDeveloper } from './ItemDeveloper'

const MOCK_DATA = Array(7).fill(1)

export const Developers = ({
   items = [],
   title = '',
   eventId = '',
   isLoading = false,
}) => {
   const navigate = useNavigate()

   const renderContent = () => {
      if (isLoading) {
         // eslint-disable-next-line
         return MOCK_DATA.map((v, idx) => <StyledSkeleton key={idx} />)
      }
      return items.map((dev) => <ItemDeveloper {...dev} key={dev.pubkey} />)
   }

   const handleClick = () => {
      const url = `/zap?id=${nip19.noteEncode(eventId)}`
      navigate(url)
   }

   return (
      <Container>
         <Title>Support {title}</Title>
         <StyledAvatarGroup max={7}>{renderContent()}</StyledAvatarGroup>
         <Button onClick={handleClick}>Zap {title}</Button>
      </Container>
   )
}
