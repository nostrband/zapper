import React from 'react'
import { CheckCircle } from 'react-bootstrap-icons'
import { Modal } from '../../shared/Modal'

export const SuccessModal = ({ show, onHide, hasErrors = false }) => {
   return (
      <Modal show={show} onHide={onHide} title="Event json" onClick={onHide}>
         <h1>{hasErrors ? 'Done with errors' : 'Done!'}</h1>
         <center className="mt-3">
            <CheckCircle color={hasErrors ? 'yellow' : 'lime'} size={96} />
         </center>
         {hasErrors && (
            <p className="mt-4">
               You can view logs and retry with the failed recipients.
            </p>
         )}
      </Modal>
   )
}
