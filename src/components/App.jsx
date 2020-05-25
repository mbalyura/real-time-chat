import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import io from 'socket.io-client';
import { Row, Col } from 'react-bootstrap';
import { toast } from 'react-toastify';
import i18next from 'i18next';

import ChannelsList from './ChannelsList';
import ChannelsMenu from './ChannelsMenu';
import Messages from './Messages';
import NewMessageForm from './NewMessageForm';
import Spinner from './Spinner';
import Toaster from './Toaster';

import {
  addMessage,
  addChannel,
  renameChannel,
  removeChannel,
} from '../slices';

const App = () => {
  const dispatch = useDispatch();

  const socket = io();

  useEffect(() => {
    socket
      .on('connect', () => toast(i18next.t('alerts.connected'), { className: 'alert alert-success' }))
      .on('disconnect', () => toast(i18next.t('alerts.disconnected'), { className: 'alert alert-danger' }))
      .on('newMessage', ({ data: { attributes } }) => dispatch(addMessage({ message: attributes })))
      .on('newChannel', ({ data: { attributes } }) => dispatch(addChannel({ channel: attributes })))
      .on('renameChannel', ({ data: { attributes } }) => dispatch(renameChannel({ channel: attributes })))
      .on('removeChannel', ({ data: { id } }) => dispatch(removeChannel({ channelId: id })));
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
        <Spinner />
      </Row>
    </>
  );
};

export default App;
