import React from 'react';
import ReactDOM from 'react-dom';
//import HouseDetails from './HouseDetails.js';
import SearchBar from './SearchBar.js';
import Header from './Header.js';
import Footer from './Footer.js';
//import bootstrap!
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

//import './index.css';
class SearchPage extends React.Component{

  render()
  {
    return (
      <div class='main'>
        <div>
          <Header/>
        </div>
        <div>
          <SearchBar />
        </div>
        <div class="footer navbar-fixed-bottom">
          <Footer/>
        </div>
      </div>

    );
  }
}
ReactDOM.render(
  <SearchPage />, document.getElementById('root')
);
