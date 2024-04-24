import { useCallback, useEffect, useState } from 'react'
import {
   Container,
   Row,
   Col,
   Modal,
   Form,
   Button,
   InputGroup,
} from 'react-bootstrap'
import { Clipboard, QrCodeScan } from 'react-bootstrap-icons'
import QRCode from 'qrcode'
import { toast } from 'react-toastify'
import { nostr } from '../../modules/nostr'
import { copy, formatSats } from '../../utils/helpers/general'
import Profile from '../Profile'
import { ZAP_STATUS } from '../../utils/constants/general'

export function ZapModal({ isOpen, onClose, currentZap, zaps, onDone }) {
   const [showQR, setShowQR] = useState(false)

   const isLast = !zaps.find((z) => !z.status)

   let modalTitle = 'Sending...'
   if (zaps.length > 1)
      modalTitle = `Sending ${currentZap.index + 1}/${zaps.length}...`

   let address = ''
   try {
      const { lud06, lud16 } = JSON.parse(currentZap.meta.content)
      address = lud16 || lud06
   } catch (e) {
      // eslint-disable-next-line no-console
      console.log('Bad meta', e)
   }

   useEffect(() => {
      if (!showQR || !currentZap.invoice) return
      const canvas = document.getElementById('canvas')
      QRCode.toCanvas(canvas, currentZap.invoice, (error) => {
         if (error) {
            toast.error('Failed to create QR code')
            console.error('qr code error', error)
         }
      })
   }, [showQR, currentZap])

   const getButtonText = useCallback(() => {
      if (currentZap.status === ZAP_STATUS.ERROR) {
         return 'Close'
      }
      if (currentZap.status === ZAP_STATUS.DONE) {
         return 'Done'
      }
      return 'Cancel'
   }, [currentZap])

   const getZapStatusLabel = useCallback(() => {
      switch (currentZap.status) {
         case ZAP_STATUS.INVOICE:
            return 'Fetching invoice...'
         case ZAP_STATUS.PAYING:
            return 'Sending sats...'
         case ZAP_STATUS.DONE:
            return 'Sent!'
         case ZAP_STATUS.ERROR:
            return `Error: ${currentZap.error}`
         default:
            return ''
      }
   }, [currentZap])

   const zapStatus = getZapStatusLabel()

   return (
      <Modal
         show={isOpen}
         backdrop="static"
         keyboard={false}
         aria-labelledby="contained-modal-title-vcenter"
         centered
      >
         <Modal.Header>
            <Modal.Title>{modalTitle}</Modal.Title>
         </Modal.Header>
         <Modal.Body className="d-flex flex-column">
            <Profile event={currentZap} />
            <div className="mt-3">
               <h5
                  style={{
                     overflowX: 'hidden',
                     textOverflow: 'ellipsis',
                     whiteSpace: 'nowrap',
                  }}
               >
                  {formatSats(currentZap.amount)} sats{' '}
                  {address && <>to {address}</>}
               </h5>
            </div>
            {currentZap.comment && (
               <div className="mt-1">{currentZap.comment}</div>
            )}
            {zapStatus && <div className="mt-3">{zapStatus}</div>}
            {currentZap.invoice &&
               !currentZap.cancelled &&
               (currentZap.status === 'waiting' ||
                  currentZap.status === 'error') && (
                  <>
                     {nostr.hasWebLN() && (
                        <div className="mt-2">Please pay by invoice:</div>
                     )}
                     <InputGroup>
                        <Form.Control
                           type="text"
                           value={currentZap.invoice}
                           readOnly
                           aria-label="Invoice"
                           aria-describedby="copy-invoice"
                        />
                        <Button
                           variant="outline-secondary"
                           id="copy-invoice"
                           onClick={() => copy(currentZap.invoice)}
                        >
                           <Clipboard />
                        </Button>
                        <Button
                           variant="outline-secondary"
                           onClick={() => setShowQR(!showQR)}
                        >
                           <QrCodeScan />
                        </Button>
                     </InputGroup>

                     <center>
                        <canvas
                           id="canvas"
                           className={!showQR ? 'd-none' : ''}
                        />
                     </center>

                     <Container className="p-0 mt-2">
                        <Row>
                           <Col xs={6}>
                              <Button
                                 variant="outline-primary w-100"
                                 as="a"
                                 href={`lightning:${currentZap.invoice}`}
                              >
                                 Open wallet
                              </Button>
                           </Col>
                           <Col xs={6}>
                              <Button className="w-100" onClick={onDone}>
                                 {isLast ? 'Done' : 'Next'}
                              </Button>
                           </Col>
                        </Row>
                     </Container>
                  </>
               )}
         </Modal.Body>
         <Modal.Footer className="d-flex flex-column">
            <Button
               variant="outline-secondary"
               size="lg"
               className="w-100"
               onClick={onClose}
            >
               {getButtonText()}
            </Button>
         </Modal.Footer>
      </Modal>
   )
}
