import React from 'react';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
  const props = {
    messages: state.messages,
  };
  return props;
};

const actionCreators = {};

class Messages extends React.Component {
  render() {
    const { messages } = this.props;
    return (
      <div className="messages-container overflow-auto">
        {messages
        && messages.map(({ text, id, userName }) => (
          <div key={id}>
            <b>{userName}</b>
            {': '}
            {text}
          </div>
        ))}
      </div>
    );
  }
}

export default connect(mapStateToProps, actionCreators)(Messages);
