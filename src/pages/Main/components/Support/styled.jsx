import { Stack, Typography, styled } from '@mui/material'

export const Container = styled((props) => <Stack {...props} />)(() => ({
   gap: '1.5rem',
   alignItems: 'center',
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

export const Subtitle = styled(Typography)(() => ({
   fontSize: '1.125rem',
   maxWidth: '640px',
   textAlign: 'center',
   '@media screen and (max-width: 485px)': {
      fontSize: '1rem',
   },
}))
