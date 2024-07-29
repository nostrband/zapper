import React from 'react'
import { Modal } from '../../shared/Modal'
import { ModalZapperContent } from './ModalZapperContent'

export const ModalZapper = ({ onClose, zapperProps }) => {
   return (
      <Modal
         PaperProps={{ sx: { maxWidth: '800px', width: '100%' } }}
         open
         onClose={onClose}
         onClickCloseIcon={onClose}
         title=""
         id="zapper-modal"
      >
         <ModalZapperContent {...zapperProps} />
      </Modal>
   )
}
