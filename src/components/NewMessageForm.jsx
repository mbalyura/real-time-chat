import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import Form from 'react-bootstrap/Form';

import * as actions from '../actions/index.js';
import NameContext from '../context';

const mapStateToProps = (state) => {
  const props = {
    text: state.text,
    channelId: state.currentChannelId,
  };
  return props;
};

const actionCreators = {
  updateNewMessageText: actions.updateNewMessageText,
  addMessage: actions.addMessage,
};

class NewMessageForm extends React.Component {
  static contextType = NameContext;


  handleAddMessage = (e) => {
    e.preventDefault();
    const { userName } = this.context;
    const { addMessage, text, channelId } = this.props;
    const message = {
      text,
      userName,
      id: _.uniqueId(),
      channelId,
    };
    addMessage(message);
  };

  handleUpdateNewMessageText = (e) => {
    const { updateNewMessageText } = this.props;
    updateNewMessageText(e.target.value);
  };

  render() {
    const { text } = this.props;

    const { userName } = this.context;
    return (
      <div className="form-container mt-auto mb-4 w-100">
        {userName}
        :
        <Form className="" onSubmit={this.handleAddMessage}>
          <Form.Control type="text" value={text} onChange={this.handleUpdateNewMessageText} />
        </Form>
      </div>
    );
  }
}

export default connect(mapStateToProps, actionCreators)(NewMessageForm);
