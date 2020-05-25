import React, { useContext, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useFormik } from 'formik';

import { Form, InputGroup } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

import { addMessage } from '../slices/asyncActions';
import NameContext from '../context';

const NewMessageForm = () => {
  const channelId = useSelector(({ channelsInfo }) => channelsInfo.currentChannelId);
  const userName = useContext(NameContext);

  const textInput = useRef();
  useEffect(() => textInput.current.focus());

  const dispatch = useDispatch();

  const { t } = useTranslation();

  const formik = useFormik({
    onSubmit: ({ text }, { resetForm }) => {
      const message = {
        text,
        userName,
        channelId,
      };
      dispatch(addMessage(message));
      resetForm({});
    },
    initialValues: { text: '' },
  });

  return (
    <div className="mt-auto w-100">
      <Form className="" onSubmit={formik.handleSubmit}>
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
