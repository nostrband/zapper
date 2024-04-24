import { Stack, Typography, styled } from '@mui/material'

export const Container = styled((props) => (
   <Stack {...props} direction="row" />
))({
   textDecoration: 'none',
   gap: '7.87px',
   alignItems: 'center',
})

export const LogoWrapper = styled('div')(({ theme }) => ({
   display: 'grid',
   placeItems: 'center',
   cursor: 'pointer',
   '&:hover': {
      opacity: '0.9',
   },
   color: theme.palette.text.primary,
   '& #logo-background': {
      fill: theme.palette.mode === 'dark' ? '#FFFFFF1A' : '#3341551A',
   },
}))

export const AppTitle = styled(Typography)(({ theme }) => ({
   fontSize: '21px',
   fontWeight: 600,
   color: theme.palette.text.primary,
}))
