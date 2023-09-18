import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { Link } from 'react-router-dom'

const Header = () => {
   return (
      <header>
         <Row>
            <Col className="d-flex align-items-center">
               <Link
                  to="/"
                  className="link-secondary"
                  style={{ textDecoration: 'none' }}
               >
                  <h4>⚡ Zapper</h4>
               </Link>
            </Col>
         </Row>
      </header>
   )
}

export default Header
