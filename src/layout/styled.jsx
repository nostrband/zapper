import { Box, Container, styled } from '@mui/material'

export const StyledContainer = styled(Container)({
   display: 'flex',
   flexDirection: 'column',
   height: '100%',
   position: 'relative',
   gap: '1rem',
   '& > #main': {
      flex: 1,
   },
})

export const BackgroundContainer = styled(Box)({
   position: 'absolute',
   top: 0,
   width: '100%',
   display: 'flex',
   justifyContent: 'center',
   zIndex: -1,
})
