import React from 'react';
import io from 'socket.io-client';

import { Row, Col } from 'react-bootstrap';
import { ToastContainer, toast, Slide } from 'react-toastify';
import i18next from 'i18next';

import ChannelsList from './ChannelsList';
import ChannelsMenu from './ChannelsMenu';
import Messages from './Messages';
import NewMessageForm from './NewMessageForm';
import Spinner from './Spinner';

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
      .on('connect', () => toast(i18next.t('alerts.connected'), { className: 'alert alert-success' }))
      .on('disconnect', () => toast(i18next.t('alerts.disconnected'), { className: 'alert alert-danger' }))
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
        <Row>
          <ToastContainer
            position="bottom-center"
            autoClose={2000}
            transition={Slide}
            hideProgressBar
            newestOnTop
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover={false}
            style={{ width: '25%', textAlign: 'center' }}
          />
          <Spinner />
        </Row>
      </>
    );
  }
}

export default App;
