import React, { useEffect, useRef } from 'react';
import { useFormik } from 'formik';
import {
  Modal,
  FormGroup,
  FormControl,
  Button,
} from 'react-bootstrap';

export default function Rename(props) {
  const { hideModal, updateChannels, currentChannel } = props;
  const inputRef = useRef();

  const formik = useFormik({
    onSubmit: (values) => updateChannels(values.channel),
    initialValues: { channel: currentChannel.name },
  });

  useEffect(() => {
    inputRef.current.focus();
  });

  return (
    <Modal show centered animation onHide={hideModal}>
      <Modal.Header closeButton>
        <Modal.Title>Rename channel?</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={formik.handleSubmit}>
          <FormGroup>
            <FormControl
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name="channel"
              required
              value={formik.values.channel}
              ref={inputRef}
            />
          </FormGroup>
          <Button type="submit">OK</Button>
          {' '}
          <Button onClick={hideModal}>Cancel</Button>
        </form>
      </Modal.Body>
    </Modal>
  );
}
