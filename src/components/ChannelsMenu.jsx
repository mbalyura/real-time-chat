import React from 'react';
import { connect } from 'react-redux';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Button from 'react-bootstrap/Button';
import { GoPlus, GoPencil, GoTrashcan } from 'react-icons/go';

import * as actions from '../actions/index.js';

const mapStateToProps = (state) => {
  const props = {
    channels: state.channels,
    currentChannelId: state.currentChannelId,
  };
  return props;
};

const actionCreators = {
  addChannel: actions.addChannel,
  deleteChannel: actions.deleteChannel,
  switchChannel: actions.switchChannel,
};

class ChannelsMenu extends React.Component {
  handleAddChannel = () => {
    const { addChannel } = this.props;
    const channel = {
      name: 'new channel',
    };
    addChannel(channel);
  }

  render() {
    const { channels, currentChannelId } = this.props;
    const currentChannel = channels.find(({ id }) => id === currentChannelId);
    console.log('ChannelsMenu -> render -> currentChannel', currentChannel);

    return (
      <>
        <Col className="" md={3}>
          <Row className="mx-auto mb-3">
            <h4 className="my-2">Channels</h4>
            <Button onClick={this.handleAddChannel} className="ml-auto"><span><GoPlus /></span></Button>
          </Row>
        </Col>
        <Col className="" md={9}>
          <div className="d-flex flex-row justify-content-end">
            <h4 className="my-2 mr-4">
              #
              {' '}
              {currentChannel.name}
            </h4>
            <Button onClick={this.handleAddChannel} className="ml-2"><span><GoPencil /></span></Button>
            <Button onClick={this.handleAddChannel} className="ml-2"><span><GoTrashcan /></span></Button>
          </div>
        </Col>


      </>
    );
  }
}

export default connect(mapStateToProps, actionCreators)(ChannelsMenu);
