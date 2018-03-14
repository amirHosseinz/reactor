import React from 'react';
import {hydrate,render} from 'react-dom';
import MainPage from './MainPage.js';
import 'semantic-ui-css/semantic.min.css';
import 'react-aspect-ratio/aspect-ratio.css';


class Main extends React.Component{
  render() {
    return (
      <MainPage />
    );
  }
}

const rootElement = document.getElementById('root');
if (rootElement.hasChildNodes()) {
  hydrate(<Main />, rootElement);
} else {
  render(<Main />, rootElement);
}
