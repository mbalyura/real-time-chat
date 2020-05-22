import React from 'react';
import { useTranslation } from 'react-i18next';
import { Modal, Button } from 'react-bootstrap';

export default function Remove(props) {
  const { hideModal, updateChannels, currentChannel } = props;
  const { t } = useTranslation();

  return (
    <Modal show centered animation onHide={hideModal}>
      <Modal.Header closeButton>
        <Modal.Title>
          {t('dialogs.removeChannel', { channel: currentChannel.name })}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={updateChannels}>
          <Button variant="danger" type="submit">{t('buttons.remove')}</Button>
          &nbsp;
          <Button onClick={hideModal}>{t('buttons.cancel')}</Button>
        </form>
      </Modal.Body>
    </Modal>
  );
}
