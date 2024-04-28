import { Box, Typography, styled } from '@mui/material'

export const Container = styled(Box)(({ theme }) => ({
   position: 'relative',
   flex: '1',
   padding: '1.5rem',
   borderRadius: '24px',
   border: `1px solid ${theme.palette.text.primary}1A`,
   minHeight: '188px',
   width: '100%',
   display: 'flex',
   flexDirection: 'column',
   gap: '1rem',
   '@media screen and (max-width: 485px)': {
      padding: '1rem',
      gap: '0.5rem',
   },
}))

export const Background = styled('div')(({ url }) => ({
   position: 'absolute',
   top: 0,
   left: 0,
   width: '100%',
   height: '100%',
   backgroundImage: `url(${url})`,
   backgroundRepeat: 'no-repeat',
   backgroundPosition: 'left center',
   backgroundSize: 'cover',
   borderRadius: 'inherit',
   zIndex: -1,
}))

export const Title = styled(Typography)(() => ({
   fontSize: '1.125rem',
   fontWeight: 600,
}))

export const Description = styled(Typography)(({ theme }) => ({
   fontSize: '0.75rem',
   color: theme.palette.text.secondary,
}))
