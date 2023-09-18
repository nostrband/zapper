import React from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap'
import { Modal } from '../../shared/Modal'
import { AMOUNTS } from '../../utils/constants/general'
import { formatAmount } from '../../utils/helpers/general'

export const AmountModal = ({ show, onHide, onPickAmount, pickedAmount }) => {
   return (
      <Modal show={show} onHide={onHide} title="Pick amount" onClick={onHide}>
         <Container className="p-0">
            <Row className="gx-1">
               {AMOUNTS.map(([amountValue, label]) => (
                  <Col key={amountValue} md="3" xs="4" className="mb-2">
                     <Button
                        variant={
                           pickedAmount === amountValue
                              ? 'primary'
                              : 'outline-secondary'
                        }
                        className="w-100"
                        onClick={() => {
                           onPickAmount(amountValue)
                           onHide()
                        }}
                     >
                        <b>{formatAmount(amountValue)} </b>
                        {label}
                     </Button>
                  </Col>
               ))}
            </Row>
         </Container>
      </Modal>
   )
}
