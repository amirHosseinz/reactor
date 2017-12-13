import React from 'react';
import HouseDetails from './HouseDetails';
import SearchBar from './SearchBar.js';
import Header from './Header.js';
import Footer from './Footer.js';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter, Route} from 'react-router-dom';
import UserPanel from './UserPanel';

class MainPage extends React.Component{
  constructor(props){
    super(props);
    this.state ={
      loginPanelVisible: false,
      houseDetail: null,
    };
  }
  renderSearchBar() {
    return (<SearchBar />
    );
  }
  renderHeader(){
    return (
      <Header/>
    );
  }
  renderFooter() {
    return(
      <div className="footer navbar-fixed-bottom">
        <Footer />
      </div>
    );
  }
  renderHouseDetails() {
    return(
      <HouseDetails houseDetail={this.state.houseDetail}/>
    );
  }
  getHouseId(){
    return window.location.href.split("/")[window.location.href.split("/").length-1];
  }
  renderUserPanel(){
    return(
      <UserPanel/>
    );
  }
  render(){
    return(
      <BrowserRouter>
        <div className="main">
          <Route path={"/"} render = {()=> {return (this.renderHeader())}} />
          <Route exact path={'/'} render={()=> {return (this.renderSearchBar())}}/>
          <Route exact path={'/dashboard'} render={()=>{return(this.renderUserPanel())}}/>
          <Route path={'/rooms/' + this.getHouseId()} render ={()=> {return (this.renderHouseDetails())}}/>
          <Route path={"/"} render = {()=> {return(this.renderFooter())}}/>
        </div>
      </BrowserRouter>
    );
  }
}
export default MainPage;
