import { Box, Stack, Typography, styled } from '@mui/material'

export const Container = styled(Box)(({ theme }) => ({
   display: 'flex',
   flexDirection: 'column',
   gap: '1.5rem',
   padding: '1.5rem 2rem',
   borderRadius: '24px',
   background:
      theme.palette.mode === 'light'
         ? theme.palette.background.default
         : `${theme.palette.background.default}80`,
   width: '100%',
   maxWidth: '640px',
   margin: '0 auto',
   minHeight: '100%',
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

export const StyledHint = styled((props) => (
   <Typography {...props} variant="caption" />
))(({ theme }) => ({
   textAlign: 'center',
   color: `${theme.palette.text.primary}B3`,
}))
