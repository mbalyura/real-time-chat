import React from 'react';
import { useSelector } from 'react-redux';

const Messages = () => {
  const messages = useSelector(({ messagesInfo }) => messagesInfo.messages);
  const currentChannelId = useSelector(({ channelsInfo }) => channelsInfo.currentChannelId);

  const currentMessages = messages.filter(({ channelId }) => channelId === currentChannelId);

  return (
    <div className="overflow-auto bg-light text-dark p-3 mb-3 h-100">
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
};

export default Messages;
