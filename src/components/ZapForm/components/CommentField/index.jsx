import React, { forwardRef } from 'react'
import { Box } from '@mui/material'
import { StyledIconButton, StyledTextArea } from './styled'

export const CommentField = forwardRef(({ onIconClick, ...props }, ref) => {
   return (
      <Box position="relative" height="auto">
         <StyledTextArea {...props} minRows={1} ref={ref} />
         <StyledIconButton onClick={onIconClick} />
      </Box>
   )
})
