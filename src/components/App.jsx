import React from 'react';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

import Chanels from './Chanels';
import Messages from './Messages';
import NewMessageForm from './NewMessageForm';

export default class App extends React.Component {
  render() {
    const { initState } = this.props;

    return (
      <Row className="h-100">
        <Col className="aside" xs={3}>
          <Row className="chanels-menu mx-auto mb-3">
            <h4 className="my-2">Chanels</h4>
            <Button className="ml-auto"><span>+</span></Button>
          </Row>
          <Row className="chanels">
            <Chanels data={initState} />
          </Row>
        </Col>
        <Col className="section d-flex flex-column">
          <Messages />
          <NewMessageForm />
        </Col>
      </Row>
    );
  }
}
