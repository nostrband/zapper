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
   StyledHint,
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
   const needButton =
      // currentZap.status === ZAP_STATUS.ERROR ||
      currentZap.status === ZAP_STATUS.DONE

   const isReady =
      currentZap.invoice &&
      !currentZap.cancelled &&
      (currentZap.status === ZAP_STATUS.WAITING ||
         currentZap.status === ZAP_STATUS.ERROR)

   const isError = currentZap.status === ZAP_STATUS.ERROR

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
               {sats} sats{' '}
               {address && (
                  <>
                     to {address.substring(0, Math.min(address.length, 25))}...
                  </>
               )}
            </StyledAddressView>

            <Profile profile={currentZap} withBorder />

            {currentZap.comment && (
               <Typography>{currentZap.comment}</Typography>
            )}

            {status && <StyledStatus>{status}</StyledStatus>}

            {(isReady || isError) && (
               <Stack gap="1rem" width="100%">
                  {!isError && (
                     <>
                        {!nostr.hasWebLN() && (
                           <StyledHint>Please pay the invoice:</StyledHint>
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
                           <StyledQRCodeContainer onClick={handleCopyInvoice}>
                              <canvas id="canvas" />
                           </StyledQRCodeContainer>
                        </Fade>
                     </>
                  )}
                  <Stack direction="row" gap="0.5rem">
                     {!isError && (
                        <StyledLinkButton
                           fullWidth
                           href={`lightning:${currentZap.invoice}`}
                           target="_blank"
                        >
                           Open Wallet
                        </StyledLinkButton>
                     )}
                     <Button
                        fullWidth
                        color="secondary"
                        onClick={currentZap.cancelled ? onClose : onDone}
                     >
                        {isLast || currentZap.cancelled ? 'Done' : 'Next'}
                     </Button>
                  </Stack>

                  {!isError && (
                     <StyledHint>
                        Pay with your wallet and then tap &quot;
                        {isLast ? 'Done' : 'Next'}&quot;.
                     </StyledHint>
                  )}

                  {needButton && <Divider />}
               </Stack>
            )}
         </Stack>

         {needButton && (
            <Button variant="contained" color="secondary" onClick={onClose}>
               {buttonText}
            </Button>
         )}
      </Stack>
   )
}
