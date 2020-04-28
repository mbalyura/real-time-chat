// @ts-check

import 'core-js/stable';
import 'regenerator-runtime/runtime';

import path from 'path'; // постороение путей
import Pug from 'pug'; // шаблонизатор
import socket from 'socket.io';
import fastify from 'fastify'; // сервер
import pointOfView from 'point-of-view'; // Templates rendering plugin //add to reply interface view method for manage view engines that can be used to render templates responses
import fastifyStatic from 'fastify-static';
// import _ from 'lodash';
import addRoutes from './routes.js';

const isProduction = process.env.NODE_ENV === 'production';
const appPath = path.join(__dirname, '..');
const isDevelopment = !isProduction;

const setUpViews = (app) => {
  const domain = isDevelopment ? 'http://localhost:8080' : '';
  app.register(pointOfView, {
    engine: {
      pug: Pug,
    },
    defaultContext: {
      assetPath: (filename) => `${domain}/assets/${filename}`,
    },
    templates: path.join(__dirname, 'views'),
  });
};

const setUpStaticAssets = (app) => {
  app.register(fastifyStatic, {
    root: path.join(appPath, 'dist/public'),
    prefix: '/assets',
  });
};

export default (options) => {
  console.log('options', options); // !port 5000
  const app = fastify();

  setUpViews(app);
  setUpStaticAssets(app);

  const io = socket(app.server);

  addRoutes(app, io, options.state || {});

  return app;
};
