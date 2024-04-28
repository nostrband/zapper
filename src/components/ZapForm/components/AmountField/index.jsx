import React, { forwardRef } from 'react'
import { Box } from '@mui/material'
import { StyledIconButton, StyledInput } from './styled'

export const AmountField = forwardRef(
   ({ value, onChange, onIconClick, ...rest }, ref) => {
      return (
         <Box position="relative">
            <StyledInput
               value={value}
               onChange={onChange}
               onWheel={(e) => e.target?.blur()}
               {...rest}
               ref={ref}
            />
            <StyledIconButton onClick={onIconClick} />
         </Box>
      )
   }
)
