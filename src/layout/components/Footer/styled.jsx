import { IconButton, Stack, Typography, styled } from '@mui/material'

export const StyledFooter = styled('footer')(({ theme }) => ({
   borderTop: `1px solid ${theme.palette.text.primary}1A`,
   width: '100%',
   paddingTop: '1rem',
   paddingBottom: '3rem',
   '@media screen and (max-width: 485px)': {
      paddingBottom: '1rem',
   },
}))

export const InnerContainer = styled((props) => (
   <Stack {...props} direction="row" />
))({
   alignItems: 'flex-start',
   justifyContent: 'space-between',
   width: '100%',
   gap: '1rem',
   flexWrap: 'wrap',
})

export const StyledIconButton = styled(IconButton)({
   color: 'inherit',
})

export const StyledDescriptionText = styled((props) => (
   <Typography {...props} variant="body2" />
))(({ theme }) => ({
   color:
      theme.palette.mode === 'dark' ? '#94A3B8' : theme.palette.text.primary,
}))

export const StyledLink = styled('a')(({ theme }) => ({
   '&:not(:hover)': {
      textDecoration: 'none',
   },
   '&:is(&, :hover)': {
      color: theme.palette.text.primary,
   },
   fontWeight: 600,
}))
