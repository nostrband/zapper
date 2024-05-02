import { InputBase, Stack, Typography, styled } from '@mui/material'
import { forwardRef } from 'react'

export const Container = styled(Stack)(() => ({
   gap: '3rem',
   alignItems: 'center',
   justifyContent: 'center',
   position: 'relative',
   width: '100%',
   height: '100vh',
   maxHeight: '425px',
   '@media screen and (max-width: 485px)': {
      maxHeight: '300px',
      gap: '1.5rem',
   },
}))

export const TextContainer = styled(Stack)(() => ({
   gap: '2rem',
   '@media screen and (max-width: 485px)': {
      gap: '1rem',
   },
}))

export const StyledTitle = styled((props) => (
   <Typography {...props} variant="h1" />
))(() => ({
   fontFamily: 'InterDisplay',
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
      fontSize: '2rem',
   },
   '@media screen and (max-width: 325px)': {
      fontSize: '1.5rem',
   },
}))

export const StyledSubTitle = styled((props) => <Typography {...props} />)(
   () => ({
      textAlign: 'center',
      maxWidth: '640px',
      margin: '0 auto',
      fontSize: '1.125rem',
      '@media screen and (max-width: 485px)': {
         fontSize: '1rem',
      },
      '@media screen and (max-width: 325px)': {
         fontSize: '0.875rem',
      },
   })
)

export const StyledForm = styled((props) => <Stack {...props} />)(() => ({
   gap: '0.75rem',
   width: '100%',
   maxWidth: '506px',
   alignItems: 'center',
   flexDirection: 'row',
   '& > .submit_btn': {
      minWidth: '74px',
   },
   '@media screen and (max-width: 485px)': {
      flexDirection: 'column',
      '& > .submit_btn': {
         width: '100%',
      },
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
   boxSizing: 'content-box',
   '& .input_root': {
      padding: 'calc(1rem - 0.5px) 1rem',
   },
}))
