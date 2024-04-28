import React from 'react'
import { Button, Grid, Stack } from '@mui/material'
import { Modal } from '../../../shared/Modal'
import { StyledButton } from './styled'
import { COMMENTS } from '../../../utils/constants/general'

export const ModalPickComment = ({
   open,
   onClose,
   pickedComment,
   onPickComment,
}) => {
   const handleClickComment = (comment) => {
      onPickComment(comment)
      onClose()
   }
   return (
      <Modal
         open={open}
         onClose={onClose}
         onClickCloseIcon={onClose}
         title="Pick a comment"
      >
         <Stack gap="1rem">
            <Grid container rowSpacing={1} columnSpacing={1} columns={2}>
               {COMMENTS.map((comment) => (
                  <Grid item key={comment} xs={1}>
                     <StyledButton
                        active={pickedComment === comment}
                        onClick={() => handleClickComment(comment)}
                     >
                        {comment}
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
