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
   const darkMode = theme.palette.mode === 'dark'
   const decor = darkMode ? DecorDarkImage : DecorLightImage
   const bgOnLightModeMobile = darkMode ? {} : { background: 'none' }
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
         ...bgOnLightModeMobile,
      },
   }
})
