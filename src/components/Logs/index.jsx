import { Fade, Stack } from '@mui/material'
import React, { useState } from 'react'
import { StyledExpandButton, StyledPre } from './styled'

export const Logs = ({ logs }) => {
   const [expanded, setExpanded] = useState(false)

   const handleExpandDetails = () =>
      setExpanded((prevExpanded) => !prevExpanded)

   if (!logs || !logs.length) return null

   return (
      <Stack gap="1rem">
         <Stack alignItems="center">
            <StyledExpandButton onClick={handleExpandDetails}>
               View logs
            </StyledExpandButton>
         </Stack>

         <Fade in={expanded} unmountOnExit>
            <StyledPre>{logs}</StyledPre>
         </Fade>
      </Stack>
   )
}
