import React from 'react';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
  const props = {
    messages: state.messages,
    currentChannelId: state.currentChannelId,
  };
  return props;
};

class Messages extends React.Component {
  render() {
    const { messages, currentChannelId } = this.props;
    const currentMessages = messages.filter(({ channelId }) => channelId === currentChannelId);
    return (
      <div className="messages-container overflow-auto bg-light text-dark p-3 mb-3 h-100">
        {currentMessages
          && currentMessages.map(({ text, id, userName }) => (
            <div key={id}>
              <b>{userName}</b>
              :&nbsp;
              {text}
            </div>
          ))}
      </div>
    );
  }
}

export default connect(mapStateToProps, null)(Messages);
