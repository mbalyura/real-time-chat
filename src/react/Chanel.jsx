/* eslint-disable react/prefer-stateless-function */
import React from 'react';

export default class Chanel extends React.Component {
  render() {
    const { data: { channels } } = this.props;

    return (
      <div className="chanels">
        <ul className="nav flex-column">
          {channels.map((item) => <li className="nav-item" key={item.id}>{item.name}</li>)}
        </ul>
      </div>
    );
  }
}
