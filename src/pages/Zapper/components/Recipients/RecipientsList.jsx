import { List } from '@mui/material'
import React, { memo } from 'react'
import { ItemRecipient } from './ItemRecipient'

export const RecipientsList = memo(
   ({ recipients = [], isNewZap, onRestartZap }) => {
      return (
         <List>
            {recipients.map((recipient) => (
               <ItemRecipient
                  key={recipient.pubkey}
                  zap={recipient}
                  onRestartZap={onRestartZap}
                  isNewZap={isNewZap}
               />
            ))}
         </List>
      )
   }
)
