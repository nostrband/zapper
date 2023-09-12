import { useState, useEffect } from 'react';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {

  return (
    <header>
      <Row>
	<Col className="d-flex align-items-center">
	  <h4>
	    <Link to="/">
	      Zapper
	    </Link>
	  </h4>
	</Col>
      </Row>
    </header>
  )
};


export default Header;
