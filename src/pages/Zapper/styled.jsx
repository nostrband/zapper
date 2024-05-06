import { Box, Stack, styled } from '@mui/material'

export const PaddingContainer = styled(Box)(() => ({
   padding: '1rem 0',
   '@media screen and (max-width: 485px)': {
      padding: '0',
   },
}))

export const Container = styled(Box)(({ theme }) => ({
   display: 'flex',
   flexDirection: 'column',
   gap: '1.5rem',
   padding: '1.5rem 2rem',
   borderTopLeftRadius: '24px',
   borderTopRightRadius: '24px',
   background:
      theme.palette.mode === 'light'
         ? theme.palette.background.default
         : `${theme.palette.background.default}80`,
   width: '100%',
   maxWidth: '640px',
   margin: '0 auto',
   minHeight: '100%',
   border: '1px solid',
   borderImageSlice: 1,
   borderImageSource:
      theme.palette.mode === 'dark'
         ? 'linear-gradient(180deg, rgba(255, 255, 255, 0.0169) 49.5%, rgba(255, 255, 255, 0.13) 100%)'
         : 'linear-gradient(180deg, rgba(100, 116, 139, 0.0091) 49.5%, rgba(100, 116, 139, 0.13) 100%)',
   '@media screen and (max-width: 485px)': {
      padding: '1rem',
      background: 'transparent',
   },
}))

export const InfoButtonContainer = styled(Stack)({
   width: '100%',
   alignItems: 'flex-end',
   position: 'relative',
   '& > .info_btn': {
      position: 'absolute',
      zIndex: 1,
   },
})
