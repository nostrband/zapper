import { IconButton, InputBase, styled } from '@mui/material'
import { forwardRef } from 'react'
import { TextBadgePlusIcon } from '../../../../assets/icons'

export const StyledInput = styled(
   forwardRef((props, ref) => (
      <InputBase {...props} inputRef={ref} classes={{ input: 'input_root' }} />
   ))
)(({ theme }) => ({
   fontSize: '4rem',
   borderWidth: 2,
   borderStyle: 'solid',
   borderColor: `${theme.palette.text.primary}21`,
   borderRadius: '12px',
   '& .input_root': {
      textAlign: 'center',

      '&[type=number]': {
         /* Chrome, Safari, Edge, Opera */
         '&::-webkit-outer-spin-button, &::-webkit-inner-spin-button': {
            WebkitAppearance: 'none',
            margin: 0,
         },
         /* Firefox */
         MozAppearance: 'textfield',
      },
   },
   '@media screen and (max-width: 485px)': {
      fontSize: '3rem',
   },
   maxHeight: 'initial',
   fontFamily: 'InterDisplay',
}))

export const StyledIconButton = styled((props) => (
   <IconButton {...props} size="small">
      <TextBadgePlusIcon />
   </IconButton>
))(({ theme }) => ({
   position: 'absolute',
   bottom: '0.25rem',
   right: '0.5rem',
   zIndex: 1,
   width: '35px',
   height: '35px',
   color: theme.palette.text.secondary,
   '&:is(&, :hover, :active)': {
      background: `${theme.palette.background.default}B3`,
   },
}))
