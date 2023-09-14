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
import { nostr } from '../modules/nostr'
import { copy, formatSats } from '../utils/helpers/general'
import Profile from './Profile'
import QRCode from 'qrcode'
import { toast } from 'react-toastify'

const ZAP_STATUTES = {
	PAYING: 'paying',
	DONE: 'done',
	ERROR: 'error',
	WAITING: 'waiting',
}

function ZapModal({ isOpen, onClose, currentZap, zaps, onDone }) {
	const [showQR, setShowQR] = useState(false)

	const isLast = !zaps.find((z) => !z.status)

	const modalTitle = `Sending ${zaps.length > 1 && currentZap.index + 1}/${
		zaps.length
	}...`

	useEffect(() => {
		if (!showQR || !currentZap.invoice) return
		const canvas = document.getElementById('canvas')
		QRCode.toCanvas(canvas, currentZap.invoice, function (error) {
			if (error) {
				toast.error('Failed to create QR code')
				console.log('qr code error', error)
			}
		})
	}, [showQR, currentZap])

	console.log(currentZap)

	const getButtonText = useCallback(() => {
		if (currentZap.status === ZAP_STATUTES.ERROR) {
			return 'Close'
		}
		if (currentZap.status === ZAP_STATUTES.DONE) {
			return 'Done'
		}
		return 'Cancel'
	}, [currentZap])

	const getZapStatusLabel = useCallback(() => {
		if (currentZap.status === ZAP_STATUTES.PAYING) {
			return 'Fething invoice...'
		}
		if (currentZap.status === ZAP_STATUTES.DONE) {
			return 'Sent!'
		}
		if (currentZap.status === ZAP_STATUTES.PAYING) {
			return `Error: ${currentZap.error}`
		}
		return ''
	}, [currentZap])

	const zapStatus = getZapStatusLabel()

	return (
		<Modal
			show={isOpen}
			onHide={onClose}
			backdrop='static'
			keyboard={false}
			aria-labelledby='contained-modal-title-vcenter'
			centered
		>
			<Modal.Header>
				<Modal.Title>{modalTitle}</Modal.Title>
			</Modal.Header>
			<Modal.Body className='d-flex flex-column'>
				<Profile event={currentZap} />
				<div className='mt-3'>
					<h5>{formatSats(currentZap.amount)} sats</h5>
				</div>
				{currentZap.comment && (
					<div className='mt-2'>{currentZap.comment}</div>
				)}
				{zapStatus && <div className='mt-2'>{zapStatus}</div>}
				{currentZap.invoice &&
					(currentZap.status === 'waiting' ||
						currentZap.status === 'error') && (
						<>
							{nostr.hasWebLN() && (
								<div className='mt-2'>
									Please pay by invoice:
								</div>
							)}
							<InputGroup>
								<Form.Control
									type='text'
									value={currentZap.invoice}
									readOnly
									aria-label='Invoice'
									aria-describedby='copy-invoice'
								/>
								<Button
									variant='outline-secondary'
									id='copy-invoice'
									onClick={() => copy(currentZap.invoice)}
								>
									<Clipboard />
								</Button>
								<Button
									variant='outline-secondary'
									onClick={() => setShowQR(!showQR)}
								>
									<QrCodeScan />
								</Button>
							</InputGroup>

							<center>
								<canvas
									id='canvas'
									className={!showQR ? 'd-none' : ''}
								></canvas>
							</center>

							<Container className='p-0 mt-2'>
								<Row>
									<Col xs={6}>
										<Button
											variant='outline-primary w-100'
											as='a'
											href={`lightning:${currentZap.invoice}`}
										>
											Open wallet
										</Button>
									</Col>
									<Col xs={6}>
										<Button
											className='w-100'
											onClick={onDone}
										>
											{isLast ? 'Done' : 'Next'}
										</Button>
									</Col>
								</Row>
							</Container>
						</>
					)}
			</Modal.Body>
			<Modal.Footer className='d-flex flex-column'>
				<Button
					variant='outline-secondary'
					size='lg'
					className='w-100'
					onClick={onClose}
				>
					{getButtonText()}
				</Button>
			</Modal.Footer>
		</Modal>
	)
}

export default ZapModal
