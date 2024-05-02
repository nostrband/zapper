import React from 'react'
import { Button, Grid, Stack } from '@mui/material'
import { Modal } from '../../../shared/Modal'
import { AMOUNTS } from '../../../utils/constants/general'
import { formatAmount } from '../../../utils/helpers/general'
import { StyledButton } from './styled'

export const ModalPickAmount = ({
   open,
   onClose,
   onPickAmount,
   pickedAmount,
}) => {
   const handleClickComment = (amount) => {
      onPickAmount(amount)
      onClose()
   }
   return (
      <Modal
         open={open}
         onClose={onClose}
         onClickCloseIcon={onClose}
         title="Pick an amount"
      >
         <Stack gap="1rem">
            <Grid container rowSpacing={1} columnSpacing={1} columns={2}>
               {AMOUNTS.map(([amountValue, label]) => (
                  <Grid item key={amountValue} xs={1}>
                     <StyledButton
                        active={pickedAmount === amountValue}
                        onClick={() => handleClickComment(amountValue)}
                     >
                        {formatAmount(amountValue)} {label}
                     </StyledButton>
                  </Grid>
               ))}
            </Grid>
            <Button onClick={onClose} color="secondary">
               Cancel
            </Button>
         </Stack>
      </Modal>
   )
}
