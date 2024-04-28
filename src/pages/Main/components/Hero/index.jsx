import { Button, Stack, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Container, StyledForm, StyledInput, StyledTitle } from './styled'

export const Hero = () => {
   const navigate = useNavigate()
   const [id, setId] = useState('')

   const handleSubmit = (e) => {
      e.preventDefault()
      navigate({
         pathname: '/zap',
         search: `id=${id}`,
      })
   }

   const handleInputChange = (e) => setId(e.target.value)

   return (
      <Container>
         <Stack gap="2rem">
            <StyledTitle>Send bulk lightning payments over nostr</StyledTitle>
            <Typography textAlign="center" maxWidth="640px" margin="0 auto">
               Zapper is a micro-app that allows anyone to send a payment to
               multiple recipients at once.
            </Typography>
         </Stack>
         <StyledForm component="form" onSubmit={handleSubmit}>
            <StyledInput
               value={id}
               onChange={handleInputChange}
               placeholder="npub, note, nevent, naddr"
            />
            <Button className="submit_btn" type="submit">
               Zap
            </Button>
         </StyledForm>
      </Container>
   )
}
