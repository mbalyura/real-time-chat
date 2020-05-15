import React from 'react';
import { connect } from 'react-redux';
import io from 'socket.io-client';

import { Row, Col } from 'react-bootstrap';

import ChannelsList from './ChannelsList';
import ChannelsMenu from './ChannelsMenu';
import Messages from './Messages';
import NewMessageForm from './NewMessageForm';

import * as actions from '../actions/index.js';

const actionCreators = {
  addMessageOnSocket: actions.addMessageOnSocket,
  addChannelOnSocket: actions.addChannelOnSocket,
  renameChannelOnSocket: actions.renameChannelOnSocket,
  removeChannelOnSocket: actions.removeChannelOnSocket,
};

class App extends React.Component {
  componentDidMount() {
    const {
      addMessageOnSocket,
      addChannelOnSocket,
      renameChannelOnSocket,
      removeChannelOnSocket,
    } = this.props;

    const socket = io();

    socket
      .on('newMessage', ({ data: { attributes } }) => {
        console.warn('*** IO new message ***');
        addMessageOnSocket(attributes);
      })
      .on('newChannel', ({ data: { attributes } }) => {
        console.warn('*** IO new channel ***');
        addChannelOnSocket(attributes);
      })
      .on('renameChannel', ({ data: { attributes } }) => {
        console.warn('*** IO rename channel ***');
        renameChannelOnSocket(attributes);
      })
      .on('removeChannel', ({ data: { id } }) => {
        console.warn('*** IO remove channel ***');
        removeChannelOnSocket(id);
      });
  }

  render() {
    return (
      <>
        <Row className="mt-5">
          <ChannelsMenu />
        </Row>
        <Row className="h-75">
          <Col className="" md={3}>
            <ChannelsList />
          </Col>
          <Col className="section d-flex flex-column" md={9}>
            <Messages />
            <NewMessageForm />
          </Col>
        </Row>
      </>
    );
  }
}

export default connect(null, actionCreators)(App);
