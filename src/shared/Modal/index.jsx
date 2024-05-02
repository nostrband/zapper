import { IconButton, Slide } from '@mui/material'
import React, { forwardRef } from 'react'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded'
import {
   StyledCloseButtonWrapper,
   StyledDialog,
   StyledDialogContent,
   StyledDialogTitle,
} from './styled'

const Transition = forwardRef(function Transition(props, ref) {
   return <Slide direction="up" ref={ref} {...props} />
})

export const Modal = ({
   open,
   onClose,
   onClickCloseIcon,
   children,
   title,
   ...props
}) => {
   return (
      <StyledDialog
         {...props}
         open={open}
         onClose={onClose}
         TransitionComponent={Transition}
      >
         <StyledCloseButtonWrapper>
            <IconButton onClick={onClickCloseIcon} className="close_btn">
               <CloseRoundedIcon />
            </IconButton>
         </StyledCloseButtonWrapper>

         {title && <StyledDialogTitle>{title}</StyledDialogTitle>}
         <StyledDialogContent>{children}</StyledDialogContent>
      </StyledDialog>
   )
}
