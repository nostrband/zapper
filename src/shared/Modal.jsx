import React from 'react'
import { Button, Modal as DefaultModal } from 'react-bootstrap'

export const Modal = ({
   show,
   onHide,
   isCentered = true,
   title,
   closeButton = true,
   children,
   footerContent,
   footerButtonText = 'Close',
   onClick,
}) => {
   return (
      <DefaultModal
         aria-labelledby="contained-modal-title-vcenter"
         show={show}
         centered={isCentered}
         onHide={onHide}
      >
         <DefaultModal.Header closeButton={closeButton}>
            <DefaultModal.Title>{title}</DefaultModal.Title>
         </DefaultModal.Header>
         <DefaultModal.Body>{children}</DefaultModal.Body>
         <DefaultModal.Footer className="d-flex flex-column">
            {footerContent || (
               <Button
                  variant="outline-primary"
                  size="lg"
                  className="w-100"
                  onClick={onClick}
               >
                  {footerButtonText}
               </Button>
            )}
         </DefaultModal.Footer>
      </DefaultModal>
   )
}
