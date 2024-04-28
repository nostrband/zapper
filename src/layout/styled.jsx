import { Box, Container, styled } from '@mui/material'
import { DecorImage } from '../assets/images'

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
   left: 0,
   width: '100%',
   display: 'flex',
   justifyContent: 'center',
   zIndex: -1,
   backgroundImage: `url(${DecorImage})`,
   height: '100%',
   backgroundSize: 'contain',
   backgroundRepeat: 'no-repeat',
})
