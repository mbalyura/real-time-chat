import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Row, Col, Button } from 'react-bootstrap';
import { GoPlus, GoPencil, GoTrashcan } from 'react-icons/go';
import { useTranslation } from 'react-i18next';

import { addChannel, renameChannel, removeChannel } from '../slices/asyncActions';
import getModal from './Modals';

const ChannelsMenu = () => {
  const channels = useSelector(({ channelsInfo }) => channelsInfo.channels);
  const currentChannelId = useSelector(({ channelsInfo }) => channelsInfo.currentChannelId);

  const dispatch = useDispatch();

  const { t } = useTranslation();

  const [modal, setModal] = useState({ type: null });

  const hideModal = () => setModal({ type: null });

  const showModal = (type) => () => setModal({ type });

  const updateChannels = (name) => {
    const mapModalTypeToActions = {
      adding: () => dispatch(addChannel({ name })),
      renaming: () => dispatch(renameChannel({ name, id: currentChannelId })),
      removing: () => dispatch(removeChannel({ id: currentChannelId })),
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
      <Col md={3}>
        <Row className="mx-auto mb-3">
          <h4 className="my-2">{t('channels')}</h4>
          <Button onClick={showModal('adding')} className="ml-auto"><span><GoPlus /></span></Button>
        </Row>
      </Col>
      <Col md={9}>
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

export default ChannelsMenu;
