import React from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap'
import { Modal } from '../../shared/Modal'
import { COMMENTS } from '../../utils/constants/general'

export const CommentModal = ({
   show,
   onHide,
   onPickComment,
   pickedComment,
}) => {
   return (
      <Modal show={show} onHide={onHide} title="Pick comment" onClick={onHide}>
         <Container className="p-0">
            <Row className="gx-1">
               {COMMENTS.map((comment) => (
                  <Col key={comment} md="6" xs="6" className="mb-2">
                     <Button
                        variant={
                           pickedComment === comment
                              ? 'primary'
                              : 'outline-secondary'
                        }
                        className="w-100"
                        onClick={() => {
                           onPickComment(comment)
                           onHide()
                        }}
                     >
                        <b>{comment}</b>
                     </Button>
                  </Col>
               ))}
            </Row>
         </Container>
      </Modal>
   )
}
