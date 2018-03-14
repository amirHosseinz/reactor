import React from 'react';
import ReactDOM from 'react-dom';
// import ReactDOMServer from 'react-dom/server';
import {render} from 'react-snapshot';
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

render(<Main />, document.getElementById('root'));
