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
          <h1 className='mb-4'>Zapper is a Nostr micro-app for sending zaps.</h1>

          <h3>Why a separate micro-app?</h3>
          <p>
            <ul>
              <li>Zapper can zap any event, not just ones that are supported by your nostr client.</li>
              <li>Zapper supports zap splits, unlike most apps out there.</li>
              <li>Zapper handles errors gracefully and allows you to retry the zap if anything fails.</li>
              <li>Zapper can be integrated by other apps - just redirect to it, or embed as an iframe.</li>
            </ul>
          </p>

          <h3>API</h3>
          <p>
            If you want to integrate with Zapper, just redirect users to 
            the <code>/zap</code> endpoint and add these query string parameters:
            <ul>
              <li><b>id</b> - required, bech32 id (npub, note, nevent, naddr) </li>
              <li><b>amount</b> - optional, amount in sats</li>
              <li><b>comment</b> - optional, comment text</li>
              <li><b>type</b> - optional, type of payment ("zap" - default, "anon-zap" or "send-sats")</li>
              <li><b>auto_send</b> - optional, if set to "true", will send the zap automatically</li>
            </ul>

          </p>

          <h3>Need help?</h3>
          <p>
            Just drop your issues on <a href="https://github.com/nostrband/zapper/issues">github</a> or 
            contact <a href='https://snort.social/p/npub1xdtducdnjerex88gkg2qk2atsdlqsyxqaag4h05jmcpyspqt30wscmntxy'>brugeman</a> on Nostr.
          </p>


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
