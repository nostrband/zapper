import React from 'react'
import { Stack, Typography } from '@mui/material'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import { Modal } from '../../../shared/Modal'

export const ModalSuccess = ({ open, onClose, hasErrors = false }) => {
   return (
      <Modal
         open={open}
         onClose={onClose}
         onClickCloseIcon={onClose}
         title="Zap finished"
      >
         <Stack gap="1rem">
            <Typography variant="h1" fontSize="1.5rem" textAlign="center">
               {hasErrors ? 'Done with errors' : 'Done!'}
            </Typography>
            <Stack alignItems="center">
               <CheckCircleIcon
                  color={hasErrors ? 'warning' : 'success'}
                  fontSize="large"
               />
            </Stack>
            {hasErrors && (
               <Typography variant="subtitle1" textAlign="center">
                  You can view logs and retry with the failed recipients.
               </Typography>
            )}
         </Stack>
      </Modal>
   )
}
