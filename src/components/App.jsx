import React from 'react';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Chanels from './Chanels';
import Messages from './Messages';
import NewMessageForm from './NewMessageForm';

export default class App extends React.Component {
  render() {
    return (
      <Row className="h-100">
        <Col className="aside" xs={3}>
          <Chanels />
        </Col>
        <Col className="section d-flex flex-column">
          <Messages />
          <NewMessageForm />
        </Col>
      </Row>
    );
  }
}
