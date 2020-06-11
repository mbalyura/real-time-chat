import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import io from 'socket.io-client';
import { Row, Col } from 'react-bootstrap';

import ChannelsList from './ChannelsList';
import ChannelsMenu from './ChannelsMenu';
import Messages from './Messages';
import NewMessageForm from './NewMessageForm';
import Toaster from './Toaster';
import { showSuccesToast, showDangerToast } from '../toasts';

import {
  addMessageSucces,
  addChannelSucces,
  renameChannelSucces,
  removeChannelSucces,
} from '../slices';

const App = () => {
  const dispatch = useDispatch();

  const socket = io();

  useEffect(() => {
    socket
      .on('connect', () => showSuccesToast('alerts.connected'))
      .on('disconnect', () => showDangerToast('alerts.disconnected'))
      .on('newMessage', ({ data: { attributes } }) => dispatch(addMessageSucces({ message: attributes })))
      .on('newChannel', ({ data: { attributes } }) => dispatch(addChannelSucces({ channel: attributes })))
      .on('renameChannel', ({ data: { attributes } }) => dispatch(renameChannelSucces({ channel: attributes })))
      .on('removeChannel', ({ data: { id } }) => dispatch(removeChannelSucces({ channelId: id })));
  });

  return (
    <>
      <Row className="mt-5">
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
};

export default App;
