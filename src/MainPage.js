import React from 'react';
import HouseDetails from './HouseDetails';
import SearchBar from './SearchBar.js';
import Header from './Header.js';
import Footer from './Footer.js';
import UserProfile from './UserProfile.js';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter, Route} from 'react-router-dom';
import UserPanel from './UserPanel';
import BecomeHost from './BecomeHost.js'
import ContactUs from './ContactUs.js'
import AboutUs from './AboutUs.js'
import Terms from './Terms.js'

class MainPage extends React.Component{
  constructor(props){
    super(props);
    this.state ={
      loginPanelVisible: false,
      houseDetail: null,
    };
  }
  renderSearchBar() {
    return (<SearchBar />);
  }
  renderHeader(){
    return (
      <Header/>
    );
  }
  renderFooter() {
    return(
      <div className="footer">
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
      <UserPanel />
    );
  }

  renderBecomeHost(){
  return(
    <BecomeHost/>
  ) ;
  }
  renderAboutUs(){
  return(
    <AboutUs/>
  ) ;
  }
  renderTerms(){
  return(
    <Terms/>
  ) ;
  }
  renderContactUs(){
  return(
    <ContactUs/>
  ) ;
  }

  getGuestTokenFromServer(){
    if (localStorage['isLoggedIn']!=='true'){
      var request = new Request('https://www.trypinn.com/auth/api/user/login_guest/',{
        method: 'POST',
        headers: new Headers({'Accept': 'application/json','Content-Type': 'application/json',
                              })
      });
     fetch(request)
     .then((response) => {
       return response.json();
     })
     .then((response) => {
       localStorage['token']= response.token;
     });
    }
  }
  renderUserProfile(){
    return(
      <UserProfile />
    );
  }
  render(){
    this.getGuestTokenFromServer();
    document.title = "تریپین | سامانه رزرو ویلا";
    return(
      <BrowserRouter>
        <div className="main">
          <Route path={"/"} render = {()=> {return (this.renderHeader())}}/>
          <Route exact path={'/'} render={()=> {return (this.renderSearchBar())}}/>
          <Route exact path={'/dashboard'} render={()=>{return(this.renderUserPanel())}}/>
          <Route path={'/rooms/' + this.getHouseId()} render ={()=> {return (this.renderHouseDetails())}}/>
          <Route path={"/"} render = {()=> {return(this.renderFooter())}}/>
          <Route path={"/becomehost"} render = {()=> {return(this.renderBecomeHost())}}/>
          <Route path={"/aboutus"} render = {()=> {return(this.renderAboutUs())}}/>
          <Route path={"/terms&conditions"} render = {()=> {return(this.renderTerms())}}/>
          <Route path={"/contactus"} render = {()=> {return(this.renderContactUs())}}/>
          <Route path={"/userprofile"} render={()=> {return(this.renderUserProfile())}}/>
        </div>
      </BrowserRouter>
    );
  }
}
export default MainPage;
