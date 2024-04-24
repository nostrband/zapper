import React, { forwardRef } from 'react'
import { StyledInput } from './styled'

export const AmountField = forwardRef(({ value, onChange, ...rest }, ref) => {
   return (
      <StyledInput
         value={value}
         onChange={onChange}
         {...rest}
         ref={ref}
         type="number"
         min={0}
         onWheel={(e) => e.target?.blur()}
      />
   )
})
