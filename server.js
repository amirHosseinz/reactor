import path from 'path';
import Express from 'express';
import React from 'react';
// import { createStore } from 'redux';
// import { Provider } from 'react-redux';
import { renderToString } from 'react-dom/server';
import MainPage from './src/MainPage.js';


const app = Express();
const port = 3000;

// This is fired every time the server side receives a request
app.use(handleRender);

function handleRender(req, res) {
  const html = renderToString(
    <MainPage />
  );
  res.send(html);
}

app.listen(port);
