import React, { memo, useCallback, useMemo } from 'react'
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

const Copy = memo(function Copy({ handleCopy }) {
   return <CopyButton onClick={handleCopy} />
})

const Weight = memo(function Weight({ weightPercentage }) {
   return (
      <Typography variant="body2" fontWeight={500}>
         {weightPercentage}%
      </Typography>
   )
})

const copyBtnVisibility = isMobile || isTablet ? 'always' : 'toggle'

export const ItemRecipient = ({ zap, isNewZap, onRestartZap }) => {
   const { weight = 0, amount = 0, pubkey, meta, status } = zap
   const weightPercentage = useMemo(() => Math.round(weight * 100), [weight])
   const sats = useMemo(() => formatSats(amount), [amount])
   const encodedNpub = useMemo(() => encodeNpub(pubkey), [pubkey])
   const profile = useMemo(() => {
      return { pubkey, meta }
   }, [pubkey, meta])

   // eslint-disable-next-line
   const [_, copyToClipboard] = useCopyToClipboard()

   const handleCopyUserNpub = useCallback(() => {
      copyToClipboard(encodedNpub)
      toast.success('Copied!')
   }, [copyToClipboard, encodedNpub])

   const statusIcon = useMemo(
      () => renderZapStatus(status, isNewZap),
      [status, isNewZap]
   )

   return (
      <StyledListItem className={copyBtnVisibility}>
         <Profile profile={profile} />
         <Stack direction="row" alignItems="center" gap="1rem">
            <Copy handleCopy={handleCopyUserNpub} />
            <Stack>
               <Weight weightPercentage={weightPercentage} />
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
