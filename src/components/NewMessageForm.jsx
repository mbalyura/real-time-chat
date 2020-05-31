import React, { useContext, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { Form, InputGroup } from 'react-bootstrap';

import { showDangerToast } from '../toasts';
import { asyncActions } from '../slices';
import NameContext from '../context';

const NewMessageForm = () => {
  const channelId = useSelector(({ channelsInfo }) => channelsInfo.currentChannelId);
  const userName = useContext(NameContext);

  const textInput = useRef();
  useEffect(() => textInput.current.focus());

  const dispatch = useDispatch();

  const { t } = useTranslation();

  const { requestAddMessage } = asyncActions;

  const formik = useFormik({
    onSubmit: ({ text }, { resetForm }) => {
      const message = {
        text,
        userName,
        channelId,
      };
      dispatch(requestAddMessage(message))
        .then(unwrapResult)
        .catch(() => showDangerToast('errors.message'))
        .finally(() => resetForm({}));
    },
    initialValues: { text: '' },
  });

  return (
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
  );
};

export default NewMessageForm;
