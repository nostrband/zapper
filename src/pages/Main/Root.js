import { Button, Form } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { Layout } from '../../layout/Layout'

function Root() {
   const navigate = useNavigate()
   const [id, setId] = useState('')

   const handleSubmit = (e) => {
      e.preventDefault()

      navigate({
         pathname: '/zap',
         search: `id=${id}`,
      })
   }

   return (
      <Layout>
         <p>Hello, enter event id or npub to zap it.</p>
         <Form className="d-flex gap-1" onSubmit={handleSubmit}>
            <Form.Control
               onChange={(e) => setId(e.target.value)}
               value={id}
               placeholder="Event ID or npub"
            />
            <Button variant="outline-secondary" type="submit">
               Enter
            </Button>
         </Form>
      </Layout>
   )
}

export default Root
