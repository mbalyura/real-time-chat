import React from 'react';
import ReactDOM from 'react-dom';

import Chanel from './Chanel';

export default (data) => {
  ReactDOM.render(
    <Chanel data={data} />,
    document.getElementById('chat'),
  );
};
