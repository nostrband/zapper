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

export const StyledAvatar = styled((props) => {
   const exclude = new Set(['withBorder'])
   const omitProps = Object.fromEntries(
      Object.entries(props).filter((e) => !exclude.has(e[0]))
   )
   return <Avatar {...omitProps} />
})(({ withBorder = false, theme, variant }) => {
   const commonStyles = {
      width: 48,
      height: 48,
      border: withBorder ? `2px solid ${theme.palette.text.primary}` : 'none',
   }
   if (variant === 'rounded') {
      return {
         ...commonStyles,
         borderRadius: '12px',
      }
   }
   return commonStyles
})
