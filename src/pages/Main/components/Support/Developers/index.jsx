import React from 'react'
import { Button } from '@mui/material'
import { Container, StyledAvatarGroup, StyledSkeleton, Title } from './styled'
import { ItemDeveloper } from './ItemDeveloper'

const MOCK_DATA = Array(7).fill(1)

export const Developers = ({ items = [], title = '', isLoading = false }) => {
   const renderContent = () => {
      if (isLoading) {
         // eslint-disable-next-line
         return MOCK_DATA.map((v, idx) => <StyledSkeleton key={idx} />)
      }
      return items.map((dev) => <ItemDeveloper {...dev} key={dev.pubkey} />)
   }
   return (
      <Container>
         <Title>Support {title}</Title>
         <StyledAvatarGroup max={7}>{renderContent()}</StyledAvatarGroup>
         <Button>Zap {title}</Button>
      </Container>
   )
}
