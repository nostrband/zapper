import { Box, Stack, styled } from '@mui/material'

export const Container = styled(Box)(({ theme }) => ({
   ':root': {
      fontFamily: `'Inter', sans-serif`,
   },
   '@supports (font-variation-settings: normal)': {
      ':root': {
         fontFamily: `'InterVariable', sans-serif`,
         fontOpticalSizing: 'auto',
      },
   },
   '&:is(&, & > *)': {
      boxSizing: 'border-box',
      padding: 0,
      margin: 0,
      fontFamily: '',
   },
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
   maxWidth: '840px',
   margin: '0 auto',
   minHeight: '100%',
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
