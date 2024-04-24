import React from 'react'
import { Stack, Typography } from '@mui/material'
import { useCopyToClipboard } from '@uidotdev/usehooks'
import toast from 'react-hot-toast'
import { CopyButton, StyledListItem, StyledSatsView } from './styled'
import { encodeNpub, formatSats } from '../../../../../utils/helpers/general'
import { Profile } from '../../../../../shared/Profile'

export const ItemRecipient = (props) => {
   const { weight = 0, amount = 0, pubkey } = props
   const weightPercentage = Math.round(weight * 100)
   const sats = formatSats(amount)
   const encodedNpub = encodeNpub(pubkey)

   // eslint-disable-next-line
   const [_, copyToClipboard] = useCopyToClipboard()

   const handleCopyUserNpub = () => {
      copyToClipboard(encodedNpub)
      toast.success('Copied!')
   }

   return (
      <StyledListItem>
         <Profile profile={props} />
         <Stack direction="row" alignItems="center" gap="1rem">
            <CopyButton onClick={handleCopyUserNpub} />
            <Stack>
               <Typography variant="body2" fontWeight={500}>
                  {weightPercentage}%
               </Typography>
               <StyledSatsView>{sats} sats</StyledSatsView>
            </Stack>
         </Stack>
      </StyledListItem>
   )
}
