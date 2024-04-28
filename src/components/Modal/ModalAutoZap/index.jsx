import React from 'react'
import { Button, Stack, Typography } from '@mui/material'
import { Modal } from '../../../shared/Modal'

export const ModalAutoZap = ({ open, onClose, seconds }) => {
   return (
      <Modal
         open={open}
         onClickCloseIcon={onClose}
         title={`Auto zapping in ${seconds} seconds...`}
      >
         <Stack gap="1rem">
            <Typography fontWeight={500} fontSize="1.25rem" textAlign="center">
               Click cancel to zap manually.
            </Typography>
            <Button fullWidth onClick={onClose}>
               Cancel
            </Button>
         </Stack>
      </Modal>
   )
}
