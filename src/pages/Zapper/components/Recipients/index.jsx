import React, { memo } from 'react'
import { Stack } from '@mui/material'
import { RecipientsList } from './RecipientsList'
import { StyledSectionTitle } from './styled'

export const Recipients = memo(
   ({ recipients = [], isNewZap, onRestartZap }) => {
      const title = recipients.length > 1 ? 'Recipients' : 'Recipient'
      return (
         <Stack gap="1rem">
            <StyledSectionTitle>{title}</StyledSectionTitle>
            <RecipientsList
               isNewZap={isNewZap}
               recipients={recipients}
               onRestartZap={onRestartZap}
            />
         </Stack>
      )
   }
)
