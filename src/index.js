import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route} from 'react-router-dom';

import HouseDetails from './HouseDetails';


import 'semantic-ui-css/semantic.min.css';
//import HouseDetails from './HouseDetails.js';
import SearchBar from './SearchBar.js';
import Header from './Header.js';
import Footer from './Footer.js';
//import bootstrap!
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
//import './index.css';
class SearchPage extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      houseDetail : null,
    };
  }
  setHouseDetail(detail){
    this.setState({houseDetail : detail});
  }
  render()
  {
    return (
      <BrowserRouter>
        <div className="main">
          <Route path={"/"} component={Header} />
          <Route path = {"/"} component={SearchBar} />
          <Route path = {'/56'} component = {HouseDetails}/>
          <div className="footer">
          <Route path={"/"} component={Footer} />
          </div>
        </div>
      </BrowserRouter>
    );

  }
}
ReactDOM.render(
  <SearchPage />, document.getElementById('root')
);
