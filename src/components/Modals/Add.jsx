import React, { useEffect, useRef } from 'react';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import {
  Modal,
  FormGroup,
  FormControl,
  Button,
} from 'react-bootstrap';

const Add = ({ hideModal, updateChannels }) => {
  const inputRef = useRef();
  useEffect(() => inputRef.current.focus());

  const { t } = useTranslation();

  const formik = useFormik({
    onSubmit: (values) => updateChannels(values.channel),
    initialValues: { channel: '' },
  });

  return (
    <Modal show centered animation onHide={hideModal}>
      <Modal.Header closeButton>
        <Modal.Title>{t('dialogs.addChannel')}</Modal.Title>
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
              placeholder={t('dialogs.placeholder')}
            />
          </FormGroup>
          <Button type="submit">{t('buttons.ok')}</Button>
          &nbsp;
          <Button onClick={hideModal}>{t('buttons.cancel')}</Button>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default Add;
