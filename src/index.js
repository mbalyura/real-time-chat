import 'core-js/stable';
import 'regenerator-runtime/runtime';
import '../assets/application.scss';
import '../assets/favicon.png';
import gon from 'gon';
import run from './init';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
  console.log('it works!');
  console.log('server state: ', gon);
}

run();
