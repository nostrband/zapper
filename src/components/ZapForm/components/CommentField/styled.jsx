import { TextareaAutosize, styled } from '@mui/material'
import { forwardRef } from 'react'

export const StyledTextArea = styled(
   forwardRef((props, ref) => <TextareaAutosize {...props} ref={ref} />)
)(({ theme }) => ({
   background: 'transparent',
   outline: 'none',
   resize: 'none',
   padding: '0.75rem 1rem',
   borderRadius: '12px',
   borderWidth: 2,
   borderStyle: 'solid',
   borderColor: `${theme.palette.text.primary}21`,
   color: theme.palette.text.primary,
   fontWeight: 600,
   fontSize: '0.875rem',
   '&::placeholder': {
      color: `${theme.palette.text.primary}4D`,
      fontWeight: 600,
   },
   '&::focus': {
      borderColor: `${theme.palette.text.primary}`,
   },
}))
