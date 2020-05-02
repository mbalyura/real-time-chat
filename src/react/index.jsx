import React from 'react';
import ReactDOM from 'react-dom';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import Chanel from './Chanel';

export default (initState, userName) => {
  const dom = (
    <>
      <Row className="h-100">
        <Col className="aside" xs={3}>
          <Row className="chanels-menu mx-auto mb-3">
            <h4 className="my-2">Chanels</h4>
            <Button className="ml-auto">+</Button>
          </Row>
          <Row className="chanels">
            <Chanel data={initState} />
          </Row>
        </Col>
        <Col className="section d-flex flex-column">
          <div className="messages-container overflow-auto">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Cupiditate, unde id. Velit officiis sunt possimus, autem
            dolores iure, eius rem similique molestias maxime soluta
            dolore quidem nostrum dolor hic error.
          </div>
          <div className="form-container mt-auto mb-4 w-100">
            <Form className="">
              <Form.Label>
                {userName}
                :
              </Form.Label>
              <Form.Control type="text" />
            </Form>
          </div>
        </Col>
      </Row>
    </>
  );

  ReactDOM.render(
    dom,
    document.getElementById('chat'),
  );
};
