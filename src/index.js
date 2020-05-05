/* eslint-disable import/no-extraneous-dependencies */
import 'core-js/stable';
import 'regenerator-runtime/runtime';

import '../assets/application.scss';

import faker from 'faker';
// import gon from 'gon'; //? not need ???
import cookies from 'js-cookie';
import io from 'socket.io-client';
import render from './index.jsx';


if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

console.log('it works!');
console.log('gon', window.gon);

// * begin
// const randomUserName = localStorage.getItem('userName') || faker.internet.userName();
// localStorage.setItem('userName', randomUserName);
const randomUserName = cookies.get('userName') || faker.internet.userName();
cookies.set('userName', randomUserName);

render(io, window.gon, randomUserName);
