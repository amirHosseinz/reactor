import React from 'react';
import Login from './Login.js';
import { slide as Menu} from 'react-burger-menu';
import customBurgerIcon  from 'react-burger-menu';
import Modal from 'react-modal';
import {Button,Divider} from 'semantic-ui-react';
import {Dropdown} from 'semantic-ui-react';
import { Image } from 'semantic-ui-react';
import {loginPasswordStyle, loginPhoneNumberStyle, loginPanelmobileStyle} from './Styles.js';


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
    var spar = {phoneNumber : document.getElementById("tel-number").value};
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

     });
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
  handleSignOutButton(){
    // localStorage['token']='';
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
  renderLoginPanel(){
    return(
      <div className="login-modal-main">
        <Modal isOpen={this.state.loginPanelVisible}
          ariaHideApp={false}
          style={loginPhoneNumberStyle}
          onRequestClose={()=>{this.setState({loginPanelVisible:false})}}>
          <div className="login1-modal">
            <p className="login-title-in-modal"> ورود/ عضویت </p>
            <Divider/>
            <p className="enter-phone-number-inmodal"> :برای ورود یا ثبت‌نام شماره تلفن همراه خود را وارد کنید </p>
              <div  dir="rtl" className="enter-number-main" >
                <input
                  maxLength="11"
                  id="tel-number"
                  autoComplete="off"
                  className="login-input"
                  placeholder="مثال: ۰۹۱۲۰۰۰۰۰۰۰"
                  type="numeric"
                  >
                  </input>
                  <div className="divider-x"></div>
                  <br/>
                  <br/>
                  <Button color="blue" onClick = {this.getUserHasPassword.bind(this)} className="login-modal-button">
                  ورود / ثبت‌نام
                  </Button>
              </div>
            </div>
        </Modal>
        <Modal isOpen={this.state.loginPanelVisible2}
          ariaHideApp={false}
          style={loginPasswordStyle}
          onRequestClose={()=>{this.setState({loginPanelVisible2:false})}}>
          <Login hasAccount={this.state.hasAccount} hasPassword={this.state.hasPassword}/>
        </Modal>
      </div>
    );
  }

  signOutAndProfile(){
    return (
        <div>
          <div style={{float:'left'}}>
            <Dropdown className="header-drop-down-texts" icon='dropdown' floating={true} text={localStorage['user-first-name'] +' '+ localStorage['user-last-name']} >
             <Dropdown.Menu>
             <p className="main-menu-user1" onClick={this.handleUserProfileClick.bind(this)}>حساب کاربری</p>
             <p className="main-menu-user2" onClick={this.handleSignOutButton.bind(this)}>خروج</p>
             </Dropdown.Menu>
            </Dropdown>
          </div>
          <div style={{float:'left'}}>
            <Image className="avatar-header" src={'https://www.trypinn.com/' + localStorage['user-profile-picture']} avatar={true} />
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
    if (localStorage['default-panel']!=='message'){
       localStorage['default-panel']='message';
       window.location.href = '/dashboard';
    }
  }
  handleTripClick(){
    if (localStorage['default-panel']!=='trip'){
      localStorage['default-panel']='trip';
      window.location.href = '/dashboard';
    }
  }
  handleRequestClick(){
    if (localStorage['default-panel']!=='request'){
      localStorage['default-panel']='request';
      window.location.href = '/dashboard';
    }
  }
  handleUserProfileClick(){
      localStorage['default-panel']='userprofile';
      window.location.href = '/dashboard';
  }

  toggleBurgerMenu(){
    this.setState({showBurgerMenu:true});
  }
  render()
  {
    return (
      <div>
      <div className='header container hidden-xs visible-xl'>
       <div className='hearder-child-margined'>
          <div className="header-menu-desktop col-md-10 col-sm-8">
            {this.renderMainMenu()}
            {this.renderLoginPanel()}
            {this.renderLoginButton()}
          </div>
          <div className="logo col-md-2 col-sm-4">
              <div className='headerchild'>
                <div className='logodiv'>
                   <a href="http://www.tripinn.ir"><img src={require('./Images/tripinn_logo.svg')} className="LogoImage" alt = 'تریپین'></img></a>
                </div>
                <div>
                  <a className='logolink' href="http://www.tripinn.ir">  <p className='logofont'>تریپین</p></a>
                </div>
              </div>
          </div>
        </div>
      </div>
      <div className='header hidden-xl visible-xs navbar-fixed-top'>
        <div className='headermobile'>
             <img src={require('./Images/tripinn_logo.svg')}  className="LogoImage-mobile" alt="تریپین"></img>
        </div>
        <div className="burger-menu" >
           <Menu isOpen={this.state.showBurgerMenu} customBurgerIcon={<img onClick={this.toggleBurgerMenu.bind(this)} src={require('./Images/tripinn_burger.svg')}/>} className="burger" width={ '70%' }>
            <div className="burger-in-div" dir="rtl">
              <div className="burger-item">
               <a id="home" className="menu-item" href="http://localhost:3000">خانه</a>
              </div>
              <div className="burger-item">
               {this.renderLoginButtonXs()}
              </div>
            </div>
           </Menu>
           <Modal isOpen={this.state.showMobileLoginPanel}
           className="container fluid"
           style={loginPanelmobileStyle}
           onRequestClose={()=>{this.setState({showMobileLoginPanel:false})}}>
            <div>
            <div className="login1-modal">
              <p className="login-title-in-modal"> ورود/ عضویت </p>
              <p className="enter-phone-number-inmodal"> :برای ورود یا ثبت‌نام شماره تلفن همراه خود را وارد کنید </p>
                <div  dir="rtl" className="enter-number-main" >
                  <input
                    maxLength="11"
                    id="tel-number"
                    autoComplete="off"
                    className="login-input"
                    placeholder="مثال: ۰۹۱۲۰۰۰۰۰۰۰"
                    type="numeric">
                    </input>
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
    </div>
    );
  }
}
export default Header;
