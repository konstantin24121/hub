/* eslint-disable */
const webpack = require('webpack');
const path = require('path');
const http = require('http');
const express = require('express');

const server = express();

const host = (process.env.HOST || 'localhost');
const port = (+process.env.PORT) || 3000;

server.use(express.static(path.join(__dirname, '..', 'public')));

http.createServer(server).listen(port, host, function (err) {
  if (err) {
    return console.error(err);
  }

  console.info('==> 💻  Open http://%s:%s in a browser to view the app.', host, port);
});
