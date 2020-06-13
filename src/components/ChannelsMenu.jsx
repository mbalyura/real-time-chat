import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Row, Col, Button } from 'react-bootstrap';
import { GoPlus, GoPencil, GoTrashcan } from 'react-icons/go';

import { addChannelRequest, renameChannelRequest, removeChannelRequest } from '../apiRequests';
import { showSuccesToast, showDangerToast } from '../toasts';
import { setModal } from '../slices';
import getModal from './Modals';
import Spinner from './Spinner';


const ChannelsMenu = () => {
  const channels = useSelector(({ channelsInfo }) => channelsInfo.channels);
  const currentChannelId = useSelector(({ channelsInfo }) => channelsInfo.currentChannelId);
  const activeModalType = useSelector(({ modalsInfo }) => modalsInfo.activeModal);

  const { t } = useTranslation();

  const dispatch = useDispatch();

  const [isLoading, setLoading] = useState(false);

  const hideModal = () => dispatch(setModal({ activeModal: null }));

  const showModal = (type) => () => dispatch(setModal({ activeModal: type }));

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
    await mapModalTypeToApiRequests[activeModalType]();
    setLoading(false);
  };

  const currentChannel = channels.find(({ id }) => id === currentChannelId);

  const renderModal = () => {
    if (!activeModalType) return null;
    const Modal = getModal(activeModalType);
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
