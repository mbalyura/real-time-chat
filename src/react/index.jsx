import React from 'react';
import ReactDOM from 'react-dom';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Chanel from './Chanel';

export default (data) => {
  const dom = (
    <Row>
      <Col md={3}>
        <Chanel data={data} />
      </Col>
      <Col md={9}>messages</Col>
    </Row>
  );

  ReactDOM.render(
    dom,
    document.getElementById('chat'),
  );
};
