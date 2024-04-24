import React, { forwardRef } from 'react'
import { StyledTextArea } from './styled'

export const CommentField = forwardRef((props, ref) => {
   return <StyledTextArea {...props} minRows={2} ref={ref} />
})
