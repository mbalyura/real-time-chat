import React from 'react';
import { connect } from 'react-redux';

import { Row, Col, Button } from 'react-bootstrap';
import { GoPlus, GoPencil, GoTrashcan } from 'react-icons/go';

import * as actions from '../actions/index.js';
import getModal from './Modals/index.js';

const mapStateToProps = (state) => {
  const props = {
    channels: state.channels,
    currentChannelId: state.currentChannelId,
  };
  return props;
};

const actionCreators = {
  addChannel: actions.addChannel,
  renameChannel: actions.renameChannel,
  removeChannel: actions.removeChannel,
};

class ChannelsMenu extends React.Component {
  constructor() {
    super();
    this.state = { modalType: null };
  }

  hideModal = () => {
    this.setState({ modalType: null });
  };

  showModal = (modalType) => () => {
    this.setState({ modalType });
  };

  updateChannels = (name) => {
    const { modalType } = this.state;
    const {
      addChannel,
      renameChannel,
      removeChannel,
      currentChannelId,
    } = this.props;

    const mapModalTypeToActions = {
      adding: () => addChannel({ name }),
      renaming: () => renameChannel({ name, id: currentChannelId }),
      removing: () => removeChannel({ id: currentChannelId }),
    };

    mapModalTypeToActions[modalType]();
    this.hideModal();
  };

  renderModal = () => {
    const { modalType } = this.state;
    const { channels, currentChannelId } = this.props;
    const currentChannel = channels.find(({ id }) => id === currentChannelId);
    if (!modalType) return null;
    const Modal = getModal(modalType);
    return (
      <Modal
        updateChannels={this.updateChannels}
        hideModal={this.hideModal}
        currentChannel={currentChannel}
      />
    );
  };

  render() {
    const { channels, currentChannelId } = this.props;
    const { name, removable } = channels.find(({ id }) => id === currentChannelId);

    return (
      <>
        <Col className="" md={3}>
          <Row className="mx-auto mb-3">
            <h4 className="my-2">Channels</h4>
            <Button onClick={this.showModal('adding')} className="ml-auto"><span><GoPlus /></span></Button>
          </Row>
        </Col>
        <Col className="" md={9}>
          <div className="d-flex flex-row justify-content-end">
            <h4 className="my-2 mr-4">
              #&nbsp;
              {name}
            </h4>
            <Button onClick={this.showModal('renaming')} className="ml-2"><span><GoPencil /></span></Button>
            {removable && (
              <Button onClick={this.showModal('removing')} className="ml-2"><span><GoTrashcan /></span></Button>
            )}
          </div>
        </Col>
        {this.renderModal()}
      </>
    );
  }
}

export default connect(mapStateToProps, actionCreators)(ChannelsMenu);
