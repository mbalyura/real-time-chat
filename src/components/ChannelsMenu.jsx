import React, { useState } from 'react';
import { connect } from 'react-redux';

import { Row, Col, Button } from 'react-bootstrap';
import { GoPlus, GoPencil, GoTrashcan } from 'react-icons/go';

import * as actions from '../slices/asyncActions.js';
import getModal from './Modals/index.js';

const mapStateToProps = (state) => {
  const props = {
    channels: state.channelsInfo.channels,
    currentChannelId: state.channelsInfo.currentChannelId,
  };
  return props;
};

const actionCreators = {
  addChannel: actions.addChannel,
  renameChannel: actions.renameChannel,
  removeChannel: actions.removeChannel,
};

const ChannelsMenu = (props) => {
  const {
    channels,
    currentChannelId,
    addChannel,
    renameChannel,
    removeChannel,
  } = props;

  const [modal, setModal] = useState({ type: null });

  const hideModal = () => {
    setModal({ type: null });
  };

  const showModal = (type) => () => {
    setModal({ type });
  };

  const updateChannels = (name) => {
    const mapModalTypeToActions = {
      adding: () => addChannel({ name }),
      renaming: () => renameChannel({ name, id: currentChannelId }),
      removing: () => removeChannel({ id: currentChannelId }),
    };

    mapModalTypeToActions[modal.type]();
    hideModal();
  };

  const currentChannel = channels.find(({ id }) => id === currentChannelId);

  const renderModal = () => {
    if (!modal.type) return null;
    const Modal = getModal(modal.type);
    return (
      <Modal
        updateChannels={updateChannels}
        hideModal={hideModal}
        currentChannel={currentChannel}
      />
    );
  };

  const { name, removable } = currentChannel;

  return (
    <>
      <Col className="" md={3}>
        <Row className="mx-auto mb-3">
          <h4 className="my-2">Channels</h4>
          <Button onClick={showModal('adding')} className="ml-auto"><span><GoPlus /></span></Button>
        </Row>
      </Col>
      <Col className="" md={9}>
        <div className="d-flex flex-row justify-content-end">
          <h4 className="my-2 mr-4">
            #&nbsp;
            {name}
          </h4>
          <Button onClick={showModal('renaming')} className="ml-2"><span><GoPencil /></span></Button>
          {removable && (
            <Button onClick={showModal('removing')} className="ml-2"><span><GoTrashcan /></span></Button>
          )}
        </div>
      </Col>
      {renderModal()}
    </>
  );
};

export default connect(mapStateToProps, actionCreators)(ChannelsMenu);
