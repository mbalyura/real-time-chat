import React, { useContext, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { Form, InputGroup } from 'react-bootstrap';

import { addMessageRequest } from '../apiRequests';
import { showDangerToast } from '../toasts';
import NameContext from '../context';
import Spinner from './Spinner';

const NewMessageForm = () => {
  const channelId = useSelector(({ channelsInfo }) => channelsInfo.currentChannelId);
  const userName = useContext(NameContext);

  const textInput = useRef();
  useEffect(() => textInput.current.focus());

  const { t } = useTranslation();

  const formik = useFormik({
    onSubmit: async ({ text }, { resetForm }) => {
      const message = {
        text,
        userName,
        channelId,
      };
      try {
        await addMessageRequest(message);
        resetForm({});
      } catch (error) {
        showDangerToast('errors.message');
      }
    },
    initialValues: { text: '' },
  });

  return (
    <>
      <div className="mt-auto w-100">
        <Form onSubmit={formik.handleSubmit}>
          <InputGroup>
            <InputGroup.Prepend>
              <InputGroup.Text id="inputGroupPrepend">
                {userName}
                :
              </InputGroup.Text>
            </InputGroup.Prepend>
            <Form.Control
              onChange={formik.handleChange}
              value={formik.values.text}
              disabled={formik.isSubmitting}
              name="text"
              placeholder={t('placeholder')}
              ref={textInput}
            />
          </InputGroup>
        </Form>
      </div>
      {formik.isSubmitting && <Spinner />}
    </>
  );
};

export default NewMessageForm;
