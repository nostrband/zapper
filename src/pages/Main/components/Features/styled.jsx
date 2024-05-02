import { Box, styled } from '@mui/material'

export const Container = styled(Box)(() => ({
   display: 'flex',
   alignItems: 'center',
   gap: '1.5rem',
   justifyContent: 'space-between',
   '@media screen and (max-width: 645px)': {
      flexDirection: 'column',
      gap: '1rem',
   },
}))
