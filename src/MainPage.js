import React from 'react';
import HouseDetails from './HouseDetails';
import SearchBar from './SearchBar.js';
import Header from './Header.js';
import Footer from './Footer.js';
import UserProfile from './UserProfile.js';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter,Route,Redirect} from 'react-router-dom';
import UserPanel from './UserPanel';
import BecomeHost from './BecomeHost.js';
import ContactUs from './ContactUs.js';
import AboutUs from './AboutUs.js';
import Terms from './Terms.js';
import Partners from './Partners.js';
import SearchResult from './SearchResult.js';
import Suggestions from './Suggestions.js';
import {StickyContainer} from 'react-sticky';
// import {generateSiteMap} from './sitemap.js';

class MainPage extends React.Component{
  constructor(props){
    super(props);
    this.state ={
      loginPanelVisible: false,
      houseDetail: null,
    };
  }

  renderSearchBar(props) {
    return (<SearchBar {...props} />);
  }
  renderHeader(props){
    return (
      <Header {...props}/>
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
    else{
      if(localStorage['user-username']===undefined){
        var request = new Request('https://www.trypinn.com/api/validate/user/',{
          method: 'POST',
          body: JSON.stringify({
            username : null,
          }),
          headers: new Headers({'Accept': 'application/json','Content-Type': 'application/json','Authorization': 'Token '+ localStorage['token'],
          })
        });
       fetch(request)
       .then((response) => {
         if(response.status===401 ||response.status===400){
           localStorage['user-first-name']='';
           localStorage['user-last-name']='';
           localStorage['user-username']='';
           localStorage['isLoggedIn']='false';
           localStorage['token']='';
           this.getGuestTokenFromServer();
         }
         if(response.status===200){
           return response.json();
         }
       })
       .then((response) => {
         if(response.validated===false){
           localStorage['user-first-name']='';
           localStorage['user-last-name']='';
           localStorage['user-username']='';
           localStorage['isLoggedIn']='false';
           localStorage['token']='';
           this.getGuestTokenFromServer();
         }
       });
      }
      else{
        var request = new Request('https://www.trypinn.com/api/validate/user/',{
          method: 'POST',
          body: JSON.stringify({
            username : localStorage['user-username'],
          }),
          headers: new Headers({'Accept': 'application/json','Content-Type': 'application/json','Authorization': 'Token '+ localStorage['token'],
          })
        });
       fetch(request)
       .then((response) => {
         if(response.status===401 ||response.status===400){
           localStorage['user-first-name']='';
           localStorage['user-last-name']='';
           localStorage['user-username']='';
           localStorage['isLoggedIn']='false';
           localStorage['token']='';
           this.getGuestTokenFromServer();
         }
         if(response.status===200){
           return response.json();
         }
       })
       .then((response) => {
         if(response.validated===false){
           localStorage['user-first-name']='';
           localStorage['user-last-name']='';
           localStorage['user-username']='';
           localStorage['isLoggedIn']='false';
           localStorage['token']='';
           this.getGuestTokenFromServer();
         }
       });
      }
    }
  }
  renderUserProfile(){
    return(
      <UserProfile/>
    );
  }

  renderSearchResult(props){
    return (
      <SearchResult {...props}/>
    );
  }
  renderSuggestions(){
    return (
      <Suggestions />
    );
  }
  renderPartners(){
    return(
      <Partners />
    );
  }
  // <Route path={"/becomehost"} render = {()=> {return(this.renderBecomeHost())}}/>
  // <Route path={"/"} render = {()=> {return(this.renderFooter())}}/>
  render(){
    this.getGuestTokenFromServer();
    // generateSiteMap();
    document.title = "تریپین | سامانه رزرو ویلا";
    return(
      <StickyContainer>
      <BrowserRouter>
        <div className="main">
          <Route path={"/"} render = {(props)=> {return (this.renderHeader(props))}}/>
          <Route exact path={'/'} render={(props)=> {return (this.renderSearchBar(props))}}/>
          <Route path={'/dashboard'} render={()=>{return(this.renderUserPanel())}}/>
          <Route path={'/rooms/' + this.getHouseId()} render ={()=> {return (this.renderHouseDetails())}}/>
          <Route path={'/ecotourism/' + this.getHouseId()} render ={()=> {return (this.renderHouseDetails())}}/>
          <Route path={"/aboutus"} render = {()=> {return(this.renderAboutUs())}}/>
          <Route path={"/suggestions&comments"} render = {()=> {return(this.renderSuggestions())}}/>
          <Route path={"/terms&conditions"} render={()=> {return(this.renderTerms())}}/>
          <Route path={"/contactus"} render = {()=> {return(this.renderContactUs())}}/>
          <Route exact path="/search/" render={() => {return(<Redirect to="/search/هر جا"/>)}}/>
          <Route path={"/userprofile"} render={()=> {return(this.renderUserProfile())}}/>
          <Route exact path={"/search/:city"} render = {(props)=> {return(this.renderSearchResult(props))}}/>
          <Route path={"/partners/"} render={()=> {return(this.renderPartners())}}/>
        </div>
      </BrowserRouter>
      </StickyContainer>
    );
  }
}
export default MainPage;
