import React from 'react'
import { Modal } from '../../shared/Modal'

export const AutoZapModal = ({ show, onHide, seconds }) => {
   return (
      <Modal
         show={show}
         onHide={onHide}
         title={`Auto zapping in ${seconds} seconds...`}
         onClick={onHide}
         footerButtonText="Cancel"
      >
         Click cancel to zap manually.
      </Modal>
   )
}
