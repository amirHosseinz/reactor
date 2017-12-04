import React from 'react';
import ReactDOM from 'react-dom';
//import HouseDetails from './HouseDetails.js';
import SearchBar from './SearchBar.js';

//import bootstrap!
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

//import './index.css';
class SearchPage extends React.Component{

  render()
  {
    return (
      <div>
      the program is running ok!
        <SearchBar />
      </div>
    );
  }
}
ReactDOM.render(
  <SearchPage />, document.getElementById('root')
);
