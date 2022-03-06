import React from 'react';
import { Row, Col } from 'react-bootstrap';

import ChannelsList from './ChannelsList';
import ChannelsMenu from './ChannelsMenu';
import Messages from './Messages';
import NewMessageForm from './NewMessageForm';
import Toaster from './Toaster';

const App = () => (
  <>
    <Row>
      <ChannelsMenu />
    </Row>
    <Row className="h-75">
      <Col md={3}>
        <ChannelsList />
      </Col>
      <Col className="d-flex flex-column h-100" md={9}>
        <Messages />
        <NewMessageForm />
      </Col>
    </Row>
    <Row>
      <Toaster />
    </Row>
  </>
);

export default App;
