import React from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import { Col, Container, Row } from 'react-bootstrap'
import classes from './Layout.module.css'

export const Layout = ({ children }) => {
	return (
		<Container className={`${classes.container} mt-5`}>
			<Row>
				<Col>
					<Header />
				</Col>
			</Row>
			<Row className='mt-5'>
				<Col>
					<main>{children}</main>
				</Col>
			</Row>
			<Row>
				<Col>
					<Footer />
				</Col>
			</Row>
		</Container>
	)
}
