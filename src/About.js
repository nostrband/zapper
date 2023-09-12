import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from 'react-router-dom';

import './About.css';

import Header from './components/Header';
import Footer from './components/Footer';

function About() {
  return (
    <Container className="About mt-5">
      <Row>
        <Col>
          <Header />
        </Col>
      </Row>
      <Row className="mt-5">
        <Col>
          <h1>About</h1>
	  
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

export default About;
