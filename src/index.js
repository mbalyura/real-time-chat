import 'core-js/stable';
import 'regenerator-runtime/runtime';
import '../assets/application.scss';
import { internet } from 'faker/locale/en';
// import gon from 'gon'; //? not need ???
import cookies from 'js-cookie';
import run from './index.jsx';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

console.log('it works!');
console.log('server state: ', window.gon);

// const randomUserName = localStorage.getItem('userName') || internet.userName();
// localStorage.setItem('userName', randomUserName);
const randomUserName = cookies.get('userName') || internet.userName();
cookies.set('userName', randomUserName);

run(randomUserName);
