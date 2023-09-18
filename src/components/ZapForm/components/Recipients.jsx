import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { ArrowClockwise, Check, Play, X } from 'react-bootstrap-icons'
import Profile from '../../Profile'
import { formatSats } from '../../../utils/helpers/general'

export const Recipients = ({ zaps, onRestartZaps, isNewZap }) => {
   if (!zaps.length) {
      return null
   }

   const title = zaps.length > 1 ? 'Recipients' : 'Recipient'

   const renderZapStatus = (status) => {
      switch (status) {
         case '':
            return !isNewZap && <Play />
         case 'paying':
         case 'waiting':
            return <ArrowClockwise />
         case 'error':
            return <X />
         case 'done':
            return <Check />
         default:
            return null
      }
   }

   return (
      <div className="d-flex flex-column mt-3">
         <h4>{title}</h4>
         <Container className="p-0">
            {zaps.map((zap) => {
               return (
                  <Row
                     key={zap.pubkey}
                     className="gx-2 mb-2 align-items-center"
                  >
                     <Col xs="7">
                        <Profile event={zap} />
                     </Col>
                     {zap.weight && (
                        <Col xs="auto" className="d-flex flex-column">
                           <div>{`${Math.round(zap.weight * 100)}%`}</div>
                           {zap.amount > 0 && (
                              <div>{formatSats(zap.amount)} sats</div>
                           )}
                        </Col>
                     )}
                     <Col xs="auto">
                        <div
                           role="button"
                           tabIndex="0"
                           onClick={() => onRestartZaps(zap)}
                        >
                           {renderZapStatus(zap.status)}
                        </div>
                     </Col>
                  </Row>
               )
            })}
         </Container>
      </div>
   )
}
