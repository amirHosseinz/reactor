import React from 'react';
import ReactDOM from 'react-dom';
import MainPage from './MainPage.js';
import 'semantic-ui-css/semantic.min.css';

class Main extends React.Component{
  render()

  {
    return (
      <MainPage />
    );
  }
}
ReactDOM.render(
  <Main />, document.getElementById('root')
);
