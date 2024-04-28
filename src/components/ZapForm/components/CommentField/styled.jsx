import { IconButton, TextareaAutosize, styled } from '@mui/material'
import { forwardRef } from 'react'
import { TextBadgePlusIcon } from '../../../../assets/icons'

export const StyledTextArea = styled(
   forwardRef((props, ref) => <TextareaAutosize {...props} ref={ref} />)
)(({ theme }) => ({
   background: 'transparent',
   width: '100%',
   outline: 'none',
   resize: 'none',
   padding: '0.75rem 1rem 2rem',
   borderRadius: '12px',
   borderWidth: 2,
   borderStyle: 'solid',
   borderColor: `${theme.palette.text.primary}21`,
   color: theme.palette.text.primary,
   fontWeight: 600,
   fontSize: '0.875rem',
   '&::placeholder': {
      color: `${theme.palette.text.primary}4D`,
      fontWeight: 600,
   },
   '&::focus': {
      borderColor: `${theme.palette.text.primary}`,
   },
}))

export const StyledIconButton = styled((props) => (
   <IconButton {...props} size="small">
      <TextBadgePlusIcon />
   </IconButton>
))(({ theme }) => ({
   position: 'absolute',
   bottom: '0.5rem',
   right: '0.5rem',
   zIndex: 1,
   width: '35px',
   height: '35px',
   color: theme.palette.text.secondary,
   '&:is(&, :hover, :active)': {
      background: `${theme.palette.background.default}B3`,
   },
}))
