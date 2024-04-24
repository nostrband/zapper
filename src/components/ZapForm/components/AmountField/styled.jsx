import { InputBase, styled } from '@mui/material'
import { forwardRef } from 'react'

export const StyledInput = styled(
   forwardRef((props, ref) => (
      <InputBase {...props} inputRef={ref} classes={{ input: 'input_root' }} />
   ))
)({
   fontSize: '4rem',
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
})
