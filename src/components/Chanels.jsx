import React from 'react';
import { connect } from 'react-redux';

import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
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

class Chanels extends React.Component {
  handleSwitchChannel = (id) => () => {
    const { switchChannel } = this.props;
    switchChannel(id);
  }

  handleAddChannel = () => {
    const { addChannel } = this.props;
    addChannel({ });
  }

  render() {
    const { channels, currentChannelId } = this.props;

    return (
      <>
        <Row className="chanels-menu mx-auto mb-3">
          <h4 className="my-2">Chanels</h4>
          <Button onClick={this.handleAddChannel} className="ml-auto"><span>+</span></Button>
        </Row>
        <Row className="chanels">
          <div className="chanels w-100 mr-3">
            <ListGroup>
              {channels.map(({ name, id }) => (
                <ListGroup.Item
                  onClick={this.handleSwitchChannel(id)}
                  active={id === currentChannelId}
                  key={id}
                  className="w-100"
                >
                  {name}
                  <span>x</span>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </div>
        </Row>
      </>
    );
  }
}

export default connect(mapStateToProps, actionCreators)(Chanels);
