import { Button, Divider, Fade, Stack, Typography } from '@mui/material'
import React, { useCallback, useEffect, useState } from 'react'
import QRCode from 'qrcode'
import toast from 'react-hot-toast'
import { useCopyToClipboard } from '@uidotdev/usehooks'
import { Profile } from '../../../shared/Profile'
import { formatSats } from '../../../utils/helpers/general'
import { ZAP_STATUS } from '../../../utils/constants/general'
import { nostr } from '../../../modules/nostr'

import { CopyIcon, QRCodeIcon } from '../../../assets/icons'
import {
   StyledAddressView,
   StyledIconButton,
   StyledInput,
   StyledLinkButton,
   StyledProgress,
   StyledQRCodeContainer,
   StyledStatus,
} from './styled'

function calculateProgress(currentIndex, totalElements) {
   const progress = (currentIndex / totalElements) * 100
   return Math.round(progress)
}

export const ModalZapContent = ({ currentZap, zaps, onDone, onClose }) => {
   const [showQR, setShowQR] = useState(false)
   // eslint-disable-next-line
   const [_, copyToClipboard] = useCopyToClipboard()

   const isLast = !zaps.find((z) => !z.status)

   useEffect(() => {
      if (!showQR || !currentZap.invoice) return
      const canvas = document.getElementById('canvas')
      QRCode.toCanvas(
         canvas,
         currentZap.invoice,
         {
            width: '100%',
         },
         (error) => {
            if (error) {
               toast.error('Failed to create QR code')
               console.error('qr code error', error)
            }
         }
      )
   }, [showQR, currentZap])

   const getAddress = () => {
      try {
         const { lud06, lud16 } = JSON.parse(currentZap.meta.content)
         return lud16 || lud06
      } catch (e) {
         // eslint-disable-next-line no-console
         console.log('Bad meta', e)
         return ''
      }
   }

   const getZapStatus = useCallback(() => {
      switch (currentZap.status) {
         case ZAP_STATUS.INVOICE:
            return 'Fetching invoice...'
         case ZAP_STATUS.PAYING:
            return 'Sending sats...'
         case ZAP_STATUS.DONE:
            return 'Sent!'
         case ZAP_STATUS.ERROR:
            return `Error: ${currentZap.error}`
         default:
            return ''
      }
   }, [currentZap])

   const getButtonText = useCallback(() => {
      if (currentZap.status === ZAP_STATUS.ERROR) {
         return 'Close'
      }
      if (currentZap.status === ZAP_STATUS.DONE) {
         return 'Done'
      }
      return 'Cancel'
   }, [currentZap])

   const sats = formatSats(currentZap.amount)
   const address = getAddress()
   const status = getZapStatus()
   const buttonText = getButtonText()

   const isReady =
      currentZap.invoice &&
      !currentZap.cancelled &&
      (currentZap.status === 'waiting' || currentZap.status === 'error')

   const handleCopyInvoice = () => {
      copyToClipboard(currentZap.invoice)
      toast.success('Copied!')
   }

   return (
      <Stack gap="1rem">
         <Stack gap="1rem" alignItems="center">
            <StyledProgress
               value={calculateProgress(currentZap.index + 1, zaps.length)}
            />
            <StyledAddressView>
               {sats} sats {address && <>to {address}</>}
            </StyledAddressView>

            <Profile profile={currentZap} withBorder />

            {currentZap.comment && (
               <Typography>{currentZap.comment}</Typography>
            )}

            {status && <StyledStatus>{status}</StyledStatus>}

            {isReady && (
               <Stack gap="1rem" width="100%">
                  {nostr.hasWebLN() && (
                     <Typography>Please pay by invoice:</Typography>
                  )}
                  <Stack direction="row" gap="0.5rem">
                     <StyledInput value={currentZap.invoice} />
                     <StyledIconButton onClick={handleCopyInvoice}>
                        <CopyIcon />
                     </StyledIconButton>
                     <StyledIconButton onClick={() => setShowQR(!showQR)}>
                        <QRCodeIcon />
                     </StyledIconButton>
                  </Stack>

                  <Fade in={showQR} unmountOnExit>
                     <StyledQRCodeContainer>
                        <canvas id="canvas" />
                     </StyledQRCodeContainer>
                  </Fade>

                  <Stack direction="row" gap="0.5rem">
                     <StyledLinkButton
                        fullWidth
                        href={`lightning:${currentZap.invoice}`}
                        target="_blank"
                     >
                        Open Wallet
                     </StyledLinkButton>

                     <Button fullWidth color="secondary" onClick={onDone}>
                        {isLast ? 'Done' : 'Next'}
                     </Button>
                  </Stack>

                  <Divider />
               </Stack>
            )}
         </Stack>

         <Button variant="contained" color="secondary" onClick={onClose}>
            {buttonText}
         </Button>
      </Stack>
   )
}
