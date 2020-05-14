import React from 'react';
import { connect } from 'react-redux';

import ListGroup from 'react-bootstrap/ListGroup';

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

class ChannelsList extends React.Component {
  handleSwitchChannel = (id) => () => {
    const { switchChannel } = this.props;
    switchChannel(id);
  }

  handleAddChannel = () => {
    const { addChannel } = this.props;
    const channel = {
      name: 'new channel',
    };
    addChannel(channel);
  }

  render() {
    const { channels, currentChannelId } = this.props;

    return (
      <div className="chanels-list w-100">
        <ListGroup>
          {channels.map(({ name, id }) => (
            <ListGroup.Item
              onClick={this.handleSwitchChannel(id)}
              active={id === currentChannelId}
              key={id}
              className="w-100"
            >
              {name}
            </ListGroup.Item>
          ))}
        </ListGroup>
      </div>
    );
  }
}

export default connect(mapStateToProps, actionCreators)(ChannelsList);
