import React from 'react';
import { connect } from 'react-redux';
import io from 'socket.io-client';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Channels from './Channels';
import Messages from './Messages';
import NewMessageForm from './NewMessageForm';

import * as actions from '../actions/index.js';

const actionCreators = {
  addMessageOnSocket: actions.addMessageOnSocket,
  addChannelOnSocket: actions.addChannelOnSocket,
};

class App extends React.Component {
  componentDidMount() {
    const { addMessageOnSocket, addChannelOnSocket } = this.props;
    const socket = io();
    socket
      .on('newMessage', ({ data: { attributes } }) => {
        console.warn('*** IO new message ***');
        addMessageOnSocket(attributes);
      })
      .on('newChannel', ({ data: { attributes } }) => {
        console.warn('*** IO new channel ***');
        addChannelOnSocket(attributes);
      });
  }

  render() {
    return (
      <Row className="h-100">
        <Col className="aside" xs={3}>
          <Channels />
        </Col>
        <Col className="section d-flex flex-column">
          <Messages />
          <NewMessageForm />
        </Col>
      </Row>
    );
  }
}

export default connect(null, actionCreators)(App);
