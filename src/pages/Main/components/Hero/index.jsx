import React, { useState } from 'react'
import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import {
   Container,
   StyledForm,
   StyledInput,
   StyledSubTitle,
   StyledTitle,
   TextContainer,
} from './styled'

export const Hero = () => {
   const navigate = useNavigate()
   const [id, setId] = useState('')

   const handleSubmit = (e) => {
      e.preventDefault()
      if (!id) toast.error('Specify event id or npub')
      else {
         navigate({
            pathname: '/zap',
            search: `id=${id}`,
         })
      }
   }

   const handleInputChange = (e) => setId(e.target.value)

   return (
      <Container name="zap">
         <TextContainer>
            <StyledTitle>Send bulk lightning payments over nostr</StyledTitle>
            <StyledSubTitle>
               Zapper is a micro-app that allows anyone to send a payment to
               multiple recipients at once.
            </StyledSubTitle>
         </TextContainer>
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
