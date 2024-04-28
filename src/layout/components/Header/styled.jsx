import { IconButton, Stack, styled } from '@mui/material'

export const StyledHeader = styled('header')(({ theme }) => ({
   padding: '1rem 0',
   width: '100%',
   display: 'flex',
   justifyContent: 'center',
   borderBottom: `1px solid ${theme.palette.text.primary}1A`,
}))

export const InnerContainer = styled((props) => (
   <Stack {...props} direction="row" />
))({
   alignItems: 'center',
   justifyContent: 'space-between',
   width: '100%',
})

export const StyledIconButton = styled(IconButton)({
   color: 'inherit',
})
