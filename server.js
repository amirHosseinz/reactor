import path from 'path';
import Express from 'express';
// import React from 'react';
// import { renderToString } from 'react-dom/server';
// import MainPage from './src/MainPage.js';


const app = Express();
const port = 3000;

app.use('/buildim', Express.static('buildim'));

// This is fired every time the server side receives a request
app.use(handleRender);

function handleRender(req, res) {
  // const html = renderToString(<MainPage />);
  // res.send(html);
  res.send(renderFullPage());
}

function renderFullPage () {
  return `
  <!doctype html>
  <html>
    <head>
      <title></title>
    </head>
    <body>
      <div id="root"></div>
      <script src="/buildim/components/bundle.js" type="text/javascript"></script>
    </body>
  </html>
  `;
}

app.listen(port);
