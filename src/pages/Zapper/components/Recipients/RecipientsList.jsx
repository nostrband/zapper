import { List } from '@mui/material'
import React from 'react'
import { ItemRecipient } from './ItemRecipient'

export const RecipientsList = ({ recipients = [], isNewZap, onRestartZap }) => {
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
