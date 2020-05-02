/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';

export default class Chanel extends React.Component {
  render() {
    const { data: { channels, currentChannelId } } = this.props;

    return (
      <div className="chanels w-100 mr-3">
        <ListGroup>
          {channels.map((item) => (
            <ListGroup.Item
              active={item.id === currentChannelId}
              key={item.id}
              className="w-100"
            >
              {item.name}
            </ListGroup.Item>
          ))}
        </ListGroup>
      </div>
    );
  }
}
