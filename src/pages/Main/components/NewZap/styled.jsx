import { InputBase, Stack, Typography, styled } from '@mui/material'
import { forwardRef } from 'react'

export const Container = styled(Stack)(() => ({
   alignItems: 'center',
   gap: '4rem',
   marginBottom: '5rem',
   '@media screen and (max-width: 485px)': {
      gap: '1.5rem',
      marginBottom: '2.5rem',
   },
}))

export const Title = styled((props) => (
   <Typography {...props} component="h2" />
))(() => ({
   fontSize: '2.5rem',
   fontWeight: 600,
   '@media screen and (max-width: 485px)': {
      fontSize: '1.5rem',
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
