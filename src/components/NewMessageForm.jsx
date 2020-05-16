import React, { useContext, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { useFormik } from 'formik';

import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

import * as actions from '../actions/index.js';
import NameContext from '../context';

const mapStateToProps = (state) => {
  const props = {
    channelId: state.currentChannelId,
  };
  return props;
};

const actionCreators = {
  addMessage: actions.addMessage,
};

const NewMessageForm = (props) => {
  const userName = useContext(NameContext);

  const textInput = useRef();

  useEffect(() => {
    textInput.current.focus();
  });

  const formik = useFormik({
    onSubmit: ({ text }) => {
      const { addMessage, channelId } = props;
      const message = {
        text,
        userName,
        channelId,
      };
      addMessage(message);
    },
    initialValues: { text: '' },
  });

  return (
    <div className="form-container mt-auto w-100">
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
            placeholder="type message here"
            ref={textInput}
          />
        </InputGroup>
      </Form>
    </div>
  );
};

export default connect(mapStateToProps, actionCreators)(NewMessageForm);
