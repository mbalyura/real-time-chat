import React from 'react';
import io from 'socket.io-client';
import { connect } from 'react-redux';

import { Row, Col, Spinner } from 'react-bootstrap';
import { ToastContainer, toast, Slide } from 'react-toastify';

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

const mapStateToProps = (state) => {
  const props = {
    isLoading: state.loadingInfo.isLoading,
  };
  return props;
};

class App extends React.Component {
  componentDidMount() {
    const socket = io();
    socket
      .on('connect', () => toast('Connected!', { className: 'alert alert-success' }))
      .on('disconnect', () => toast('Connection lost!', { className: 'alert alert-danger' }))
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

  showSpinner() {
    const { isLoading } = this.props;
    if (!isLoading) return null;
    const styles = {
      position: 'absolute',
      top: '50%',
      left: '50%',
      zIndex: '100',
    };
    return (
      <Spinner style={styles} animation="grow" variant="dark" size="xl" />
    );
  }

  render() {
    return (
      <>
        {this.showSpinner()}
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
        </Row>
      </>
    );
  }
}

export default connect(mapStateToProps, null)(App);
