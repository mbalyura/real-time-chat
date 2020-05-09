import React from 'react';
import { connect } from 'react-redux';

import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

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
      channelId,
    };
    addMessage(message);
  };

  handleUpdateNewMessageText = (e) => {
    const { updateNewMessageText } = this.props; // ? this.setState ? local state maybe?
    updateNewMessageText(e.target.value);
  };

  render() {
    const { text } = this.props;

    const { userName } = this.context;
    return (
      <div className="form-container mt-auto mb-5 w-100">
        <Form className="" onSubmit={this.handleAddMessage}>
          <InputGroup>
            <InputGroup.Prepend>
              <InputGroup.Text id="inputGroupPrepend">
                {userName}
                :
              </InputGroup.Text>
            </InputGroup.Prepend>
            <Form.Control
              onChange={this.handleUpdateNewMessageText}
              value={text}
              placeholder="type message here"
              type="text"
            />
          </InputGroup>
        </Form>
      </div>
    );
  }
}

export default connect(mapStateToProps, actionCreators)(NewMessageForm);
