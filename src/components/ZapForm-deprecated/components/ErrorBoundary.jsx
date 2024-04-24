import React from 'react'
import { Button } from 'react-bootstrap'

export const ErrorBoundary = ({ error }) => {
   return (
      <div>
         <h4>Error</h4>
         <div>{error}</div>
         <Button onClick={() => window.location.reload()}>Retry</Button>
      </div>
   )
}
