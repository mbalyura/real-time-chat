import React from 'react';
import { Modal, Button } from 'react-bootstrap';

export default function Remove(props) {
  const { hideModal, updateChannels, currentChannel } = props;

  return (
    <Modal show centered animation onHide={hideModal}>
      <Modal.Header closeButton>
        <Modal.Title>
          {`Remove channel "${currentChannel.name}"?`}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={updateChannels}>
          <Button variant="danger" type="submit">Remove</Button>
          &nbsp;
          <Button onClick={hideModal}>Cancel</Button>
        </form>
      </Modal.Body>
    </Modal>
  );
}
