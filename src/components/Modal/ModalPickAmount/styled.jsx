import { Button, styled } from '@mui/material'

export const StyledButton = styled((props) => {
   const exclude = new Set(['active'])
   const omitProps = Object.fromEntries(
      Object.entries(props).filter((e) => !exclude.has(e[0]))
   )
   return (
      <Button {...omitProps} fullWidth variant="outlined" color="secondary" />
   )
})(({ theme, active = false }) => {
   return {
      color: theme.palette.text.primary,
      background: active ? `${theme.palette.text.primary}26` : 'transparent',
   }
})
