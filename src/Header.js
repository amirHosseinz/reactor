import React from 'react';
import Login from './Login.js';
import { slide as Menu} from 'react-burger-menu';
import customBurgerIcon  from 'react-burger-menu';
import {Link} from 'react-router-dom';
// import Modal from 'react-modal';
import {Button,Divider} from 'semantic-ui-react';
import {Dropdown} from 'semantic-ui-react';
import { Image } from 'semantic-ui-react';
import {loginPasswordStyle, loginPhoneNumberStyle, loginPanelmobileStyle} from './Styles.js';
import {Modal} from 'react-bootstrap';


class Header extends React.Component{
  constructor (props){
    super(props);
    this.state={
      token: null,
      reloadPage: false,
      showBurgerMenu:false,
      isLoggedIn : localStorage['isLoggedIn'],
      loginPanelVisible:false,
      loginPanelVisible2:false,
      hasPassword: null,
      hasAccount:null,
      searchParams:{
      phoneNumber: null,
      showMobileLoginPanel:false,
      },
    };
  }
  componentDidMount(){
    this.interval = setInterval(() => this.reloadHeader(), 1000);
  }
  reloadHeader(){
    if (this.state.isLoggedIn!== localStorage['isLoggedIn']){
      this.setState({isLoggedIn:localStorage['isLoggedIn']});
    }
  }
  getUserHasPassword(){
    this.setToken();
  }
  getRelevantToken(){
    if (localStorage['isLoggedIn']==='true'){
      this.setState({token:localStorage['token']},()=>{this.setSearchParams()});
    }
    else{
      this.setState({token:localStorage['token']},()=>{this.setSearchParams()});
    }
  }
  setToken(){
    this.getRelevantToken();
  }
  setSearchParams(){
    var spar = {phoneNumber:document.getElementById("tel-number").value};
    this.setState({searchParams:spar},()=>{this.getDataFromServer()})
  }
    getDataFromServer(){
      var request = new Request('https://www.trypinn.com/auth/api/user/check_account/', {
        method: 'POST',
        body: JSON.stringify({
          cell_phone : this.state.searchParams.phoneNumber,
      }),
        headers: new Headers({'Accept':'application/json','Content-Type': 'application/json',
        })
      });
     fetch(request)
     .then((response) => {
       return response.json();
     })
     .then((loginStatus) => {
       localStorage['phone-number'] = this.state.searchParams.phoneNumber;
       this.setState({hasPassword: loginStatus.has_pass});
       this.setState({hasAccount:loginStatus.has_account});
       this.setState({loginPanelVisible2 : true});
       this.setState({loginPanelVisible: false});
       this.setState({showMobileLoginPanel:false});

     });
  }
  closeLoginPanel(){
    this.setState({loginPanelVisible2:false});
  }
  renderLoginButton(){
    if (this.state.isLoggedIn !== 'true'){
      return(
        <div className="main-menu-header">
          <p className="clickable-p"  onClick={this.handleLoginButton.bind(this)}>ورود / ثبت‌نام</p>
        </div>
      );
    }
  }
  handleLoginButtonXs(){
    this.setState({showBurgerMenu:false, showMobileLoginPanel:true});
  }

  renderLoginButtonXs(){
    if (this.state.isLoggedIn !== 'true'){
      return(
          <p className="clickable-p" onClick={this.handleLoginButtonXs.bind(this)}>ورود / ثبت‌نام</p>
      );
    }
  }
  renderSignOutAndProfileButtonXs(){
    if (localStorage['isLoggedIn']==='true'){
      return(
        <div>
          <p className="menu-item" onClick={this.handleUserProfileClick.bind(this)}> حساب کاربری </p>
          <p className="menu-item" onClick={this.handleSignOutButton.bind(this)}> خروج</p>
        </div>
      );
    }
  }
  handleSignOutButton(){
    localStorage['isLoggedIn']='false';
    localStorage['user-profile-picture']='';
    localStorage['user-first-name']='';
    localStorage['user-last-name']='';
    localStorage['default-panel']='';
    window.location.href = '/';
  }

  handleLoginButton(){
    this.setState({loginPanelVisible:true});
  }
  getUserHasPasswordByEnter(event){
    if(event.key === 'Enter'){
      this.getUserHasPassword();
    }
    if(document.getElementById('tel-number').value.length===11){
      if(event.key!=="Backspace"){
        event.preventDefault()
      }
    }
    if (event.keyCode<48 || event.keyCode>57){
      if(event.key!=="Backspace"){
        event.preventDefault();
      }
    }
 }
  renderLoginPanel(){
    return(
      <div className="login-modal-main">
        <Modal show={this.state.loginPanelVisible}
          style={loginPhoneNumberStyle}
          onHide={()=>{this.setState({loginPanelVisible:false})}}>
          <Modal.Body>
          <div className="login1-modal">
            <p className="login-title-in-modal"> ورود/ عضویت </p>
            <Divider/>
            <p className="enter-phone-number-inmodal"> :برای ورود یا ثبت‌نام شماره تلفن همراه خود را وارد کنید </p>
              <div dir="rtl" className="enter-number-main" >
                <input
                  maxLength="11"
                  id="tel-number"
                  autoComplete="off"
                  autoFocus={true}
                  className="login-input hidden-xs visible-xl"
                  placeholder="مثال: ۰۹۱۲۰۰۰۰۰۰۰"
                  type="text"
                  onKeyDown ={(event)=> {this.getUserHasPasswordByEnter(event)}}
                  />
                  <div className="divider-x"></div>
                  <br/>
                  <br/>
                  <Button color="blue" onClick={this.getUserHasPassword.bind(this)} className="login-modal-button">
                  ورود / ثبت‌نام
                  </Button>
              </div>
            </div>
          </Modal.Body>

        </Modal>
        <Modal show={this.state.loginPanelVisible2}
          style={loginPasswordStyle}
          onHide={()=>{this.setState({loginPanelVisible2:false})}}>
          <Login closeLoginPanel={this.closeLoginPanel.bind(this)} hasAccount={this.state.hasAccount} hasPassword={this.state.hasPassword}/>
        </Modal>
      </div>
    );
  }
  renderUserPhoto(){
     if(localStorage['user-profile-picture']==='null'||localStorage['user-profile-picture']===undefined){
       return(
         <Image className='avatar-header' src={require('./HouseDetailParts/facilities/prof_avatar_tripinn.svg')} avatar={true}/>
       );
     }
       else{
         return(
           <div style={{float:'left'}}>
             <Image className="avatar-header" src={'https://www.trypinn.com/' + localStorage['user-profile-picture']} avatar={true} />
           </div>
         );
       }
    }
    // {this.renderUserPhoto()}


  signOutAndProfile(){
    return (
        <div>
          <div>
            <Dropdown className="header-drop-down-texts" icon='dropdown' dir="rtl" floating={true} text={ ' سلام ' + ' ' +  localStorage['user-first-name'] } >
             <Dropdown.Menu>
                <div className="row-reverse">
                  {this.renderUserPhoto()}
                  <div>
                  <p className="main-menu-user1" onClick={this.handleUserProfileClick.bind(this)}>{localStorage['user-first-name'] + localStorage['user-last-name']}</p>
                  <p className="main-menu-user1" onClick={this.handleUserProfileClick.bind(this)}>حساب کاربری</p>
                  </div>
                </div>
                <Dropdown.Divider/>
                <div>
                  {this.renderTripButton()}
                  {this.renderRequestButton()}
                </div>
                <Dropdown.Divider/>
                <p className="main-menu-user2" onClick={this.handleSignOutButton.bind(this)}>خروج</p>
             </Dropdown.Menu>
            </Dropdown>
          </div>

        </div>
    );
  }
  renderMainMenu(){
    if(this.state.isLoggedIn==='true'){
      return (
        <div className='main-menu-header'>
          {this.signOutAndProfile()}
        </div>
      );
    }
  }
  handleMessageClick(){
    window.location.href = '/dashboard';
    if (localStorage['default-panel']!=='message'){
       localStorage['default-panel']='message';
    }
  }
  handleTripClick(){
    window.location.href = '/dashboard';
    if (localStorage['default-panel']!=='trip'){
      localStorage['default-panel']='trip';

    }
  }
  handleRequestClick(){
    window.location.href = '/dashboard';
    if (localStorage['default-panel']!=='request'){
      localStorage['default-panel']='request';
    }
  }
  handleUserProfileClick(){
      window.location.href = '/userprofile';
  }

  toggleBurgerMenu(){
    this.setState({showBurgerMenu:true});
  }

  renderRequestButton(){
    if(localStorage['isLoggedIn']==='true'){
      return (
        <p className="clickable-p xl-menu-item"  onClick={this.handleRequestClick.bind(this)}>درخواست‌‌ها</p>
      );
    }
  }

  renderTripButton(){
    if(localStorage['isLoggedIn']==='true'){
      return(
        <p className="clickable-p xl-menu-item"  onClick={this.handleTripClick.bind(this)}>سفرها</p>
      );
    }
  }

  renderMessageButton(){
    if(localStorage['isLoggedIn']==='true'){
      return(
        <p className="clickable-p xl-menu-item"  onClick={this.handleMessageClick.bind(this)}>پیام‌ها</p>
      );
    }
  }

  // {this.renderRequestButton()}
  // {this.renderTripButton()}

  renderHeaderXl(){
    return(
      <div className='header container hidden-xs visible-xl'>
       <div className='hearder-child-margined'>
          <div className="header-menu-desktop col-md-10 col-sm-8">
            {this.renderMainMenu()}
            {this.renderLoginButton()}

          </div>
          {this.renderLoginPanel()}
          <div className="logo col-md-2 col-sm-4">
              <div className='headerchild'>
                <div className='logodiv'>
                   <Link to="/"><img src={require('./Images/tripinn_logo.svg')} className="LogoImage" alt = 'تریپین'></img></Link>
                </div>
                <div>
                  <Link className='logolink' to="/"><p className='logofont'>تریپین</p></Link>
                </div>
              </div>
          </div>
        </div>
      </div>
    );
  }
  renderHeaderXs(){
    return(
      <div className='header hidden-xl visible-xs navbar-fixed-top'>
        <div className='headermobile'>
             <img src={require('./Images/tripinn_logo.svg')}  className="LogoImage-mobile" alt="تریپین"></img>
        </div>
        <div className="burger-menu" >
           <Menu isOpen={this.state.showBurgerMenu} customBurgerIcon={<img onClick={this.toggleBurgerMenu.bind(this)} src={require('./Images/tripinn_burger.svg')}/>} className="burger" width={ '70%' }>
            <div className="burger-in-div" dir="rtl">
              <div className="burger-item">
               <a id="home" className="menu-item" href="http://tripinn.ir">خانه</a>
               {this.renderSignOutAndProfileButtonXs()}
              </div>
              <div className="burger-item">
               {this.renderLoginButtonXs()}
              </div>
            </div>
           </Menu>
           <Modal show={this.state.showMobileLoginPanel}
           className='phone-number-modal-xs'
           onHide={()=>{this.setState({showMobileLoginPanel:false})}}>
            <div>
            <div className="login1-modal">
              <p className="login-title-in-modal"> ورود/ عضویت </p>
              <p className="enter-phone-number-inmodal"> برای ورود یا ثبت‌نام شماره تلفن همراه خود را وارد کنید :</p>
                <div dir="rtl" className="enter-number-main">
                  <input
                    id="tel-number"
                    autoComplete="off"
                    autoFocus={true}
                    className="login-input"
                    placeholder="مثال: ۰۹۱۲۰۰۰۰۰۰۰"
                    onKeyDown={(event)=>{this.getUserHasPasswordByEnter(event)}}
                    type="number"
                    />
                    <div className="divider-x"></div>
                    <br/>
                    <br/>
                    <Button color="blue" onClick = {this.getUserHasPassword.bind(this)} className="login-modal-button">
                    ورود / ثبت‌نام
                    </Button>
                </div>
              </div>
            </div>
           </Modal>
        </div>
      </div>
    );
  }
  render()
  {
    return (
      <div>
      {this.renderHeaderXl()}
      {this.renderHeaderXs()}
      </div>
    );
  }
}
export default Header;
