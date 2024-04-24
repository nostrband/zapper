import React from 'react'
import { Stack } from '@mui/material'
import { RecipientsList } from './RecipientsList'
import { StyledSectionTitle } from './styled'

export const Recipients = ({ recipients = [] }) => {
   const title = recipients.length > 1 ? 'Recipients' : 'Recipient'
   return (
      <Stack gap="1rem">
         <StyledSectionTitle>{title}</StyledSectionTitle>
         <RecipientsList recipients={recipients} />
      </Stack>
   )
}
