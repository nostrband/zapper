import { InputBase, Stack, Typography, styled } from '@mui/material'
import { forwardRef } from 'react'

export const Container = styled(Stack)(() => ({
   gap: '3rem',
   alignItems: 'center',
   justifyContent: 'center',
   position: 'relative',
   width: '100%',
   height: '100vh',
   maxHeight: '450px',
   '@media screen and (max-width: 485px)': {
      maxHeight: '400px',
      gap: '1.5rem',
   },
}))

export const StyledTitle = styled((props) => (
   <Typography {...props} variant="h1" />
))(() => ({
   fontSize: '3.5rem',
   fontWeight: 700,
   textAlign: 'center',
   display: '-webkit-box',
   WebkitLineClamp: 2,
   WebkitBoxOrient: 'vertical',
   maxWidth: '735px',
   '@media screen and (max-width: 620px)': {
      fontSize: '2.75rem',
   },
   '@media screen and (max-width: 485px)': {
      fontSize: '1.75rem',
   },
}))

export const StyledForm = styled((props) => (
   <Stack {...props} direction="row" />
))(() => ({
   gap: '1rem',
   width: '100%',
   maxWidth: '506px',
   '& > .submit_btn': {
      minWidth: '74px',
   },
}))

export const StyledInput = styled(
   forwardRef((props, ref) => (
      <InputBase
         {...props}
         inputRef={ref}
         classes={{ input: 'input_root' }}
         fullWidth
      />
   ))
)(({ theme }) => ({
   fontSize: '0.875rem',
   borderWidth: 2,
   borderStyle: 'solid',
   borderColor: `${theme.palette.text.primary}21`,
   borderRadius: '12px',
   fontWeight: 600,
   padding: '0',
   '& .input_root': {
      padding: '1rem',
   },
}))
