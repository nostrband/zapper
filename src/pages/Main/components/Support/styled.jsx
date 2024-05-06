import { Box, Stack, Typography, styled } from '@mui/material'

export const Container = styled((props) => <Stack {...props} />)(() => ({
   gap: '3rem',
   alignItems: 'center',
   '@media screen and (max-width: 485px)': {
      gap: '1.5rem',
   },
}))

export const TextContainer = styled(Stack)(() => ({
   gap: '2rem',
   '@media screen and (max-width: 485px)': {
      gap: '1.5rem',
   },
}))

export const ContentContainer = styled(Box)(() => ({
   display: 'grid',
   gridTemplateColumns: '1fr 1fr',
   width: '100%',
   gap: '1.5rem',
   '@media screen and (max-width: 645px)': {
      gridTemplateColumns: '1fr',
   },
}))

export const Title = styled((props) => (
   <Typography {...props} component="h2" />
))(() => ({
   fontSize: '2.5rem',
   fontWeight: 600,
   textAlign: 'center',
   fontFamily: 'InterDisplay',
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
