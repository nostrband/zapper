import { List } from '@mui/material'
import React from 'react'
import { ItemRecipient } from './ItemRecipient'

export const RecipientsList = ({ recipients = [] }) => {
   return (
      <List>
         {recipients.map((recipient) => (
            <ItemRecipient key={recipient.pubkey} {...recipient} />
         ))}
      </List>
   )
}
