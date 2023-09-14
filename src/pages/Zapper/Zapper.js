import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import './Zapper.css';

import Header from './components/Header';
import Footer from './components/Footer';
import ZapForm from './components/ZapForm';

function Zapper() {

  return (
    <Container className="Zapper mt-2">
      <Row>
        <Col>
          <Header />
        </Col>
      </Row>
      <Row className="mt-2">
        <Col>
          <ZapForm />
        </Col>
      </Row>
      <Row>
        <Col>
          <Footer />
        </Col>
      </Row>
    </Container>
  );
};

export default Zapper;
