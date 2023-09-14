import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import InputGroup from 'react-bootstrap/InputGroup'
import { Clipboard, QrCodeScan } from 'react-bootstrap-icons'
import { nostr } from '../nostr'
import { copy, formatSats } from '../utils/utils'
import Profile from './Profile'
import { useEffect, useState } from 'react'
import QRCode from 'qrcode'
import { toast } from 'react-toastify'

function ZapModal({ isOpen, onClose, currentZap, zaps, onDone }) {
	const [showQR, setShowQR] = useState(false)

	const isLast = !zaps.find((z) => !z.status)

	//  useEffect(() => {setShowQR(false)}, [currentZap])

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
				<Modal.Title>
					Sending
					{zaps.length > 1 &&
						` ${currentZap.index + 1}/${zaps.length}`}
					...
				</Modal.Title>
			</Modal.Header>
			<Modal.Body className='d-flex flex-column'>
				<Profile event={currentZap} />
				<div className='mt-3'>
					<h5>{formatSats(currentZap.amount)} sats</h5>
				</div>
				{currentZap.comment && (
					<div className='mt-2'>{currentZap.comment}</div>
				)}
				{currentZap.status === 'paying' && (
					<div className='mt-2'>Fetching invoice...</div>
				)}
				{currentZap.status === 'done' && (
					<div className='mt-2'>Sent!</div>
				)}
				{currentZap.status === 'error' && (
					<div className='mt-2'>Error: {currentZap.error + ''}</div>
				)}
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
					{currentZap.status === 'error'
						? 'Close'
						: currentZap.status === 'done'
						? 'Done'
						: 'Cancel'}
				</Button>
			</Modal.Footer>
		</Modal>
	)
}

export default ZapModal
