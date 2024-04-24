import { Avatar, Stack, Typography, styled } from '@mui/material'

export const Container = styled((props) => (
   <Stack {...props} direction="row" />
))(() => ({
   alignItems: 'center',
   gap: '1rem',
   textDecoration: 'none',
}))

export const StyledUserName = styled((props) => <Typography {...props} />)(
   ({ theme }) => ({
      fontSize: '0.875rem',
      fontWeight: 600,
      color: theme.palette.text.primary,
      '&:hover': {
         textDecoration: 'underline',
      },
   })
)

export const StyledAvatar = styled((props) => <Avatar {...props} />)(() => ({
   width: 48,
   height: 48,
}))
