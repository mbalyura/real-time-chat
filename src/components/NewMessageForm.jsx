import React from 'react';
import { connect } from 'react-redux';

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
  updateNewMessageText: actions.updateNewMessageText,
  addMessage: actions.addMessage,
};

class NewMessageForm extends React.Component {
  static contextType = NameContext;

  constructor() {
    super();
    this.state = { text: '' };
    this.textInput = React.createRef();
  }

  componentDidMount() {
    this.textInput.current.focus();
  }

  handleChange = ({ target }) => {
    this.setState({ text: target.value });
  }

  handleAddMessage = (e) => {
    e.preventDefault();
    const { userName } = this.context;
    const { addMessage, channelId } = this.props;
    const { text } = this.state;
    const message = {
      text,
      userName,
      channelId,
    };
    addMessage(message);
    // this.setState({ text: '' });
  };

  render() {
    const { text } = this.state;
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
              onChange={this.handleChange}
              value={text}
              placeholder="type message here"
              type="text"
              ref={this.textInput}
            />
          </InputGroup>
        </Form>
      </div>
    );
  }
}

export default connect(mapStateToProps, actionCreators)(NewMessageForm);
