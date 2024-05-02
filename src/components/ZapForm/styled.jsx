import { Button, Stack, Typography, styled } from '@mui/material'

export const StyledTitle = styled((props) => (
   <Typography {...props} variant="h1" />
))({
   fontSize: '2rem',
   fontWeight: 600,
   lineHeight: '38.72px',
   textAlign: 'center',
   fontFamily: 'InterDisplay',
})

export const StyledForm = styled((props) => (
   <Stack {...props} component="form" />
))(() => ({
   maxWidth: '340px',
   width: '100%',
   margin: '0 auto',
   gap: '1rem',
}))

export const SubmitButton = styled((props) => (
   <Button {...props} fullWidth variant="contained" />
))(({ theme }) => ({
   borderRadius: '12px',
   boxShadow: '0px 2px 1px 0px #FFFFFF26 inset',
   padding: '15.5px 1rem',
   fontSize: '0.875rem',
   fontWeight: 600,
   '&:disabled': {
      color: theme.palette.text.secondary,
      cursor: 'not-allowed',
   },
}))

export const StyledHint = styled((props) => (
   <Typography {...props} variant="caption" />
))(({ theme }) => ({
   textAlign: 'center',
   color: `${theme.palette.text.primary}B3`,
}))
