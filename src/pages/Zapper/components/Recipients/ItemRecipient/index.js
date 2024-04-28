import React from 'react'
import { IconButton, Stack, Typography } from '@mui/material'
import { useCopyToClipboard } from '@uidotdev/usehooks'
import toast from 'react-hot-toast'
import Play from '@mui/icons-material/PlayArrowOutlined'
import Refresh from '@mui/icons-material/RefreshOutlined'
import Clear from '@mui/icons-material/ClearOutlined'
import Check from '@mui/icons-material/CheckRounded'
import { isMobile, isTablet } from 'react-device-detect'
import { CopyButton, StyledListItem, StyledSatsView } from './styled'
import { encodeNpub, formatSats } from '../../../../../utils/helpers/general'
import { Profile } from '../../../../../shared/Profile'

const renderZapStatus = (status, isNewZap) => {
   switch (status) {
      case '':
         return !isNewZap && <Play />
      case 'paying':
      case 'waiting':
         return <Refresh />
      case 'error':
         return <Clear color="error" />
      case 'done':
         return <Check color="success" />
      default:
         return null
   }
}

export const ItemRecipient = ({ zap, isNewZap, onRestartZap }) => {
   const { weight = 0, amount = 0, pubkey, status } = zap
   const weightPercentage = Math.round(weight * 100)
   const sats = formatSats(amount)
   const encodedNpub = encodeNpub(pubkey)

   // eslint-disable-next-line
   const [_, copyToClipboard] = useCopyToClipboard()

   const handleCopyUserNpub = () => {
      copyToClipboard(encodedNpub)
      toast.success('Copied!')
   }

   const statusIcon = renderZapStatus(status, isNewZap)

   const copyBtnVisibility = isMobile || isTablet ? 'always' : 'toggle'

   return (
      <StyledListItem className={copyBtnVisibility}>
         <Profile profile={zap} />
         <Stack direction="row" alignItems="center" gap="1rem">
            <CopyButton onClick={handleCopyUserNpub} />
            <Stack>
               <Typography variant="body2" fontWeight={500}>
                  {weightPercentage}%
               </Typography>
               <StyledSatsView>{sats} sats</StyledSatsView>
            </Stack>
            {statusIcon && (
               <IconButton onClick={() => onRestartZap(zap)}>
                  {statusIcon}
               </IconButton>
            )}
         </Stack>
      </StyledListItem>
   )
}
