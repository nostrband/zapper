import { Box, Container, styled, useMediaQuery } from '@mui/material'
import {
   DecorDarkImage,
   DecorLightImage,
   DecorDarkSmallImage,
   DecorLightSmallImage,
} from '../assets/images'

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

const getGradientBackgroundSource = (mode, isMobile) => {
   const darkMode = mode === 'dark'
   if (isMobile) {
      return darkMode ? DecorDarkSmallImage : DecorLightSmallImage
   }
   return mode === 'dark' ? DecorDarkImage : DecorLightImage
}

export const BackgroundContainer = styled(Box)(({ theme }) => {
   const isMobile = useMediaQuery('(max-width: 485px)')
   const decor = getGradientBackgroundSource(theme.palette.mode, isMobile)

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
      backgroundPosition: 'top center',
      '@media screen and (max-width: 485px)': {
         fontSize: '0.75rem',
      },
   }
})
