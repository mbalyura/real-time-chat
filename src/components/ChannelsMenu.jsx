import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Row, Col, Button } from 'react-bootstrap';
import { GoPlus, GoPencil, GoTrashcan } from 'react-icons/go';

import { addChannelRequest, renameChannelRequest, removeChannelRequest } from '../apiRequests';
import { showSuccesToast, showDangerToast } from '../toasts';
import getModal from './Modals';
import Spinner from './Spinner';


const ChannelsMenu = () => {
  const channels = useSelector(({ channelsInfo }) => channelsInfo.channels);
  const currentChannelId = useSelector(({ channelsInfo }) => channelsInfo.currentChannelId);

  const { t } = useTranslation();

  const [modal, setModal] = useState({ type: null });
  const [isLoading, setLoading] = useState(false);

  const hideModal = () => setModal({ type: null });

  const showModal = (type) => () => setModal({ type });

  const updateChannels = async (name) => {
    const mapModalTypeToApiRequests = {
      adding: async () => {
        try {
          await addChannelRequest({ name });
          showSuccesToast('alerts.channelAdded');
        } catch (error) {
          showDangerToast('errors.channelAdding');
        }
      },

      renaming: async () => {
        try {
          await renameChannelRequest({ name, id: currentChannelId });
          showSuccesToast('alerts.channelRenamed');
        } catch (error) {
          showDangerToast('errors.channelRenaming');
        }
      },

      removing: async () => {
        try {
          await removeChannelRequest({ id: currentChannelId });
          showDangerToast('alerts.channelRemoved');
        } catch (error) {
          showDangerToast('errors.channelRemoving');
        }
      },
    };
    setLoading(true);
    hideModal();
    await mapModalTypeToApiRequests[modal.type]();
    setLoading(false);
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
      {isLoading && <Spinner />}
    </>
  );
};

export default ChannelsMenu;
