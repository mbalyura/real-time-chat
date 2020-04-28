import React from 'react';
import ReactDOM from 'react-dom';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Chanel from './Chanel';

export default (initState, userName) => {
  const dom = (
    <>
      <Row />
      <Row>
        <Col md={3}>
          <Chanel data={initState} />
        </Col>
        <Col md={9}>{userName}</Col>
      </Row>
    </>
  );

  ReactDOM.render(
    dom,
    document.getElementById('chat'),
  );
};
