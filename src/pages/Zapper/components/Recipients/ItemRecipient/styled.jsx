import { IconButton, ListItem, Typography, styled } from '@mui/material'
import { CopyIcon } from '../../../../../assets/icons'

export const StyledListItem = styled(ListItem)(({ theme }) => ({
   display: 'flex',
   justifyContent: 'space-between',
   alignItems: 'center',
   borderBottom: `1px solid ${theme.palette.text.primary}21`,
   padding: '0.5rem 0',
   '&.toggle:not(:hover) .copy_btn': {
      display: 'none',
   },
}))

export const StyledSatsView = styled(Typography)(({ theme }) => ({
   fontSize: '0.875rem',
   color: theme.palette.text.secondary,
   fontWeight: 500,
}))

export const CopyButton = styled((props) => (
   <IconButton {...props} classes={{ root: 'copy_btn' }}>
      <CopyIcon />
   </IconButton>
))(({ theme }) => ({
   '&.copy_btn': {
      color: theme.palette.text.secondary,
   },
}))
