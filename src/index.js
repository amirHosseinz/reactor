import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route} from 'react-router-dom';

import SearchBar from './SearchBar.js';
import HouseDetails from './HouseDetails';
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
        <div>
          <Route exact path = {"/"} component={SearchBar} />
          <Route path = {'/56'} component = {HouseDetails}/>
        </div>
      </BrowserRouter>
    );
  }
}
ReactDOM.render(
  <SearchPage />, document.getElementById('root')
);
