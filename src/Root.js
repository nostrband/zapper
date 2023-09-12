import Container from 'react-bootstrap/Container';

import './Root.css';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Header from './components/Header';
import Footer from './components/Footer';

function Root() {
  return (
    <Container className="Root mt-3">
      <Row>
        <Col>
          <Header />
        </Col>
      </Row>
      <Row>
        <Col>
          Hello, enter event id or npub to zap it.
        </Col>
      </Row>
      <Row>
        <Col>
          <Footer />
        </Col>
      </Row>
    </Container>
  );
}

export default Root;
