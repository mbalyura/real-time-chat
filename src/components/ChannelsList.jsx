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
  switchChannel: actions.switchChannel,
};

const ChannelsList = (props) => {
  const { channels, currentChannelId, switchChannel } = props;

  const handleSwitchChannel = (id) => () => {
    switchChannel(id);
  };

  return (
    <div className="chanels-list w-100">
      <ListGroup>
        {channels.map(({ name, id }) => (
          <ListGroup.Item
            onClick={handleSwitchChannel(id)}
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
};

export default connect(mapStateToProps, actionCreators)(ChannelsList);
