import React from 'react'
import { Modal } from '../../shared/Modal'

export const EventModal = ({ show, onHide, target = {} }) => {
   return (
      <Modal show={show} onHide={onHide} title="Event json" onClick={onHide}>
         <pre
            style={{
               overflowY: 'scroll',
               height: '300px',
               border: '1px solid #ddd',
            }}
         >
            {JSON.stringify(
               {
                  id: target.id,
                  pubkey: target.pubkey,
                  kind: target.kind,
                  created_at: target.created_at,
                  tags: target.tags,
                  content: target.content,
                  sig: target.sig,
               },
               null,
               2
            )}
         </pre>
      </Modal>
   )
}
