import { Typography } from '@mui/material'
import { forwardRef } from 'react'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded'
import {
   IconWrapper,
   StyledAlert,
   StyledContainer,
   StyledIconButton,
} from './styled'
import { ErrorMarkIcon, SuccessMarkIcon } from '../../assets/icons'

export const Notification = forwardRef(
   ({ type = 'success', message, onDismiss }, ref) => {
      return (
         <StyledAlert ref={ref}>
            <StyledContainer>
               <IconWrapper type={type}>
                  {type === 'success' ? <SuccessMarkIcon /> : <ErrorMarkIcon />}
               </IconWrapper>
               <Typography fontSize="0.875rem" fontWeight={400}>
                  {message}
               </Typography>

               <StyledIconButton onClick={onDismiss} color="inherit">
                  <CloseRoundedIcon color="inherit" />
               </StyledIconButton>
            </StyledContainer>
         </StyledAlert>
      )
   }
)
