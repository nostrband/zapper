import { Box, Container, styled } from '@mui/material'
import { DecorDarkImage, DecorLightImage } from '../assets/images'

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

export const BackgroundContainer = styled(Box)(({ theme }) => {
   const decor =
      theme.palette.mode === 'dark' ? DecorDarkImage : DecorLightImage
   return {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
      zIndex: -1,
      backgroundImage: `url(${decor})`,
      height: '100%',
      backgroundSize: 'contain',
      backgroundRepeat: 'no-repeat',
   }
})
