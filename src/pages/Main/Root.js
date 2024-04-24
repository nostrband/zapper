import { Button, Form } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'

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
      <>
         <p className="mt-5">You can zap any Nostr event by id.</p>
         <Form className="d-flex gap-1" onSubmit={handleSubmit}>
            <Form.Control
               onChange={(e) => setId(e.target.value)}
               value={id}
               placeholder="Event ID or npub"
            />
            <Button variant="outline-secondary" type="submit">
               Zap
            </Button>
         </Form>

         <p className="mt-4">
            To learn more about this Nostr micro-app and how to use it click{' '}
            <Link to="/about">here</Link>.
         </p>
      </>
   )
}

export default Root
