import { Box, Stack, styled } from '@mui/material'
import { ZapperBackground } from '../../../../assets/icons'

export const Container = styled(Box)(({ theme }) => ({
   position: 'relative',
   borderRadius: '24px',
   border: `1px solid ${theme.palette.text.primary}1A`,
   width: '100%',
   backgroundImage: `url(${ZapperBackground})`,
   backgroundRepeat: 'no-repeat',
   backgroundPosition: 'bottom',
   backgroundSize: 'contain',
}))

export const StyledImageWrapper = styled(Stack)(() => ({
   alignItems: 'center',
   height: '530px',
   width: '100%',
   '& > img': {
      objectFit: 'contain',
      objectPosition: 'bottom',
      width: '100%',
      height: '100%',
   },
   '@media screen and (max-width: 485px)': {
      height: '460px',
      '& > img': {
         objectFit: 'contain',
         objectPosition: 'center',
      },
   },
}))
