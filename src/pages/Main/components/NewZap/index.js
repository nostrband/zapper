import React, { useState } from 'react'
import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { Container, StyledForm, StyledInput, Title } from './styled'

export const NewZap = () => {
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
         <Title>Create your own zapper</Title>

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
