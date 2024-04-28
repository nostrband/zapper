import React, { useCallback } from 'react'
import { Modal } from '../../../shared/Modal'
import { ModalZapContent } from './ModalZapContent'

export const ModalZap = ({ open, onClose, currentZap, zaps, onDone }) => {
   const zapsLength = zaps.length

   const getModalTitle = useCallback(() => {
      let modalTitle = 'Sending...'
      if (zapsLength > 1)
         modalTitle = `Sending ${currentZap.index + 1}/${zapsLength}...`
      return modalTitle
   }, [zapsLength, currentZap])

   return (
      <Modal open={open} onClickCloseIcon={onClose} title={getModalTitle()}>
         <ModalZapContent
            currentZap={currentZap}
            zaps={zaps}
            onDone={onDone}
            onClose={onClose}
         />
      </Modal>
   )
}
