import React from 'react';
import Login from './Login.js';
import { slide as Menu } from 'react-burger-menu';
import Modal from 'react-modal';
import {Button} from 'semantic-ui-react';
import UserPanel from './UserPanel.js';
import {Dropdown} from 'semantic-ui-react';


class Header extends React.Component{
  constructor (props){
    super(props);
    this.state={
      token: null,
      reloadPage: false,
      isLoggedIn : localStorage['isLoggedIn'],
      loginPanelVisible:false,
      loginPanelVisible2:false,
      hasPassword: null,
      searchParams:{
      phoneNumber: null,
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
        'Authorization': 'Token '+this.state.token,})
      });
     fetch(request)
     .then((response) => {
       return response.json();
     })
     .then((loginStatus) => {
       this.setState({loginPanelVisible2 : true});
       this.setState({loginPanelVisible: false});
       localStorage['phone-number'] = this.state.searchParams.phoneNumber;
       this.setState({hasPassword: loginStatus.has_pass});
     });
  }
  renderLoginButton(){
    if (this.state.isLoggedIn !== 'true'){
      return(
        <div>
          <p className="main-menu-login-button" onClick={this.handleLoginButton.bind(this)}> ورود</p>
        </div>
      );
    }
  }
  handleSignOutButton(){
    localStorage['token']='';
    localStorage['isLoggedIn']='false';
    localStorage['default-panel']='';
    window.location.href = '/';
  }

  handleLoginButton(){
    this.setState({loginPanelVisible:true});
  }

  renderLoginPanel(){
    return(
      <div>
        <Modal isOpen={this.state.loginPanelVisible}
          ariaHideApp={false}
          onRequestClose={()=>{this.setState({loginPanelVisible:false})}}>
          <p> شماره تلفن همراه خود را وارد کنید </p>
          <input
            id="tel-number"
            type="text">
            </input>
            <button onClick = {this.getUserHasPassword.bind(this)}>
              ورود/ثبت نام
            </button>
        </Modal>
        <Modal isOpen={this.state.loginPanelVisible2}
          ariaHideApp={false}
          onRequestClose={()=>{this.setState({loginPanelVisible2:false})}}>
          <Login loginStatus={this.state.hasPassword} />
        </Modal>
      </div>
    );
  }

  signOutAndProfile(){
    return (
        <div>
           <Dropdown text='erfan korki' icon={require('./favicon.ico')}>
            <Dropdown.Menu>
            <p className="main-menu-user" onClick={this.handleUserProfileClick.bind(this)}>حساب کاربری</p>
            <Dropdown.Divider/>
            <p className="main-menu-user" onClick={this.handleSignOutButton.bind(this)}>خروج</p>
            </Dropdown.Menu>
           </Dropdown>
        </div>
    );
  }
  renderMainMenu(){
    if(this.state.isLoggedIn==='true'){
      return (
        <div className='main-menu-header'>
          <button className="messages" onClick={this.handleMessageClick.bind(this)}>
            پیام ها
          </button>
          <button className="requests" onClick={this.handleRequestClick.bind(this)}>
            درخواست ها
          </button>
          <button className="trips" onClick={this.handleTripClick.bind(this)}>
            سفرها
          </button>
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
    console.log('clicked!!!');
    console.log(localStorage['default-panel']);
    if (localStorage['default-panel']!=='userprofile'){
      localStorage['default-panel']='userprofile';
      window.location.href = '/dashboard';
    }
  }
  render()
  {
    return (
      <div>
      <div className='header container hidden-xs visible-xl'>
       <div className='hearder-child-margined'>
          <div className="header-menu-desktop col-md-10">
            {this.renderLoginButton()}
            {this.renderLoginPanel()}
            {this.renderMainMenu()}
          </div>
          <div className="logo col-md-2">
              <div className='headerchild'>
                <div className='logodiv'>
                   <a href="http://localhost:3000"><img src={require('./Images/tripinn_logo.svg')} className="LogoImage" alt = 'تریپین'></img></a>
                </div>
                <div>
                  <a className='logolink' href="http://localhost:3000">  <p className='logofont'>تریپین</p></a>
                </div>
              </div>
          </div>
        </div>
      </div>

      <div className='header hidden-xl visible-xs navbar-fixed-top'>
        <div className='headermobile'>
             <img src={require('./Images/tripinn_logo.svg')}  className="LogoImage-mobile" alt="تریپین"></img>
        </div>
        <div className="burger-menu">
           <Menu className="burger" width={ '100%' }>
             <a id="home" className="menu-item" href="/">خانه</a>
             {this.renderLoginButton()}
             <a onClick={ this.showSettings} className="menu-item" href="/">ورود</a>
             <a  className="menu-item--small" href="">Settings</a>
           </Menu>
        </div>

      </div>
    </div>
    );
  }
}
export default Header;
