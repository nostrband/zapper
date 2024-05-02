import React, { useState } from 'react'
import { Fade, Stack } from '@mui/material'
import {
   StyledDateView,
   StyledDescription,
   StyledExpandButton,
   StyledPre,
} from './styled'
import { Profile } from '../../../../shared/Profile'
import { getSubtitle } from './helpers'
import { formatDate } from '../../../../utils/helpers/general'

export const EventDetails = ({ target }) => {
   const [expanded, setExpanded] = useState(false)

   const handleExpandDetails = () =>
      setExpanded((prevExpanded) => !prevExpanded)

   return (
      <Stack gap="1rem">
         <Stack alignItems="center">
            <StyledExpandButton onClick={handleExpandDetails}>
               Event details
            </StyledExpandButton>
         </Stack>

         <Fade in={expanded} unmountOnExit>
            <Stack gap="1rem">
               {target && (
                  <Stack gap="0.25rem">
                     <Profile profile={target} />
                     <StyledDescription>
                        {getSubtitle(target)}
                     </StyledDescription>
                     <StyledDateView>
                        {formatDate(target.created_at)}
                     </StyledDateView>
                  </Stack>
               )}
               <StyledPre>
                  {target
                     ? JSON.stringify(
                          {
                             id: target.id,
                             pubkey: target.pubkey,
                             kind: target.kind,
                             created_at: target.created_at,
                             tags: target.tags,
                             content: target.content,
                             sig: target.sig,
                          },
                          null,
                          2
                       )
                     : 'No details'}
               </StyledPre>
            </Stack>
         </Fade>
      </Stack>
   )
}
