import React from 'react';
import io from 'socket.io-client';

import { Row, Col } from 'react-bootstrap';

import ChannelsList from './ChannelsList';
import ChannelsMenu from './ChannelsMenu';
import Messages from './Messages';
import NewMessageForm from './NewMessageForm';

import { dispatch } from '../store.js';
import {
  addChannel,
  removeChannel,
  renameChannel,
  addMessage,
} from '../slices';

class App extends React.Component {
  componentDidMount() {
    const socket = io();

    socket
      .on('newMessage', ({ data: { attributes } }) => {
        console.warn('*** IO new message ***');
        dispatch(addMessage({ message: attributes }));
      })
      .on('newChannel', ({ data: { attributes } }) => {
        console.warn('*** IO new channel ***');
        dispatch(addChannel({ channel: attributes }));
      })
      .on('renameChannel', ({ data: { attributes } }) => {
        console.warn('*** IO rename channel ***');
        dispatch(renameChannel({ channel: attributes }));
      })
      .on('removeChannel', ({ data: { id } }) => {
        console.warn('*** IO remove channel ***');
        dispatch(removeChannel({ channelId: id }));
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

export default App;
