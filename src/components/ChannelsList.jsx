import React from 'react';
import { connect, useDispatch } from 'react-redux';

import ListGroup from 'react-bootstrap/ListGroup';

import { switchChannel } from '../slices';

const mapStateToProps = (state) => {
  const props = {
    channels: state.channelsInfo.channels,
    currentChannelId: state.channelsInfo.currentChannelId,
  };
  return props;
};

const ChannelsList = (props) => {
  const { channels, currentChannelId } = props;

  const dispatch = useDispatch();

  const handleSwitchChannel = (id) => () => {
    dispatch(switchChannel({ id }));
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

export default connect(mapStateToProps, null)(ChannelsList);
