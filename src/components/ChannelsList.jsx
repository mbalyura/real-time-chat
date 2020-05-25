import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ListGroup } from 'react-bootstrap';

import { switchChannel } from '../slices';

const ChannelsList = () => {
  const channels = useSelector(({ channelsInfo }) => channelsInfo.channels);
  const currentChannelId = useSelector(({ channelsInfo }) => channelsInfo.currentChannelId);

  const dispatch = useDispatch();

  const handleSwitchChannel = (id) => () => dispatch(switchChannel({ id }));

  return (
    <div className="w-100">
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

export default ChannelsList;
