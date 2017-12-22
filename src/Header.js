import React from 'react';
import Login from './Login.js';
import { slide as Menu } from 'react-burger-menu';
import Modal from 'react-modal';
// import UserPanel from './UserPanel.js';
class Header extends React.Component{
  constructor (props) {
    super(props);
    this.state={
      token: null,
      isLoggedIn : false,
      loginPanelVisible:false,
      loginPanelVisible:false,
      hasPassword: null,
      searchParams:{
        phoneNumber: null,
      },
      hidden: false
    };
  }
  getUserHasPassword(){
    this.setToken();
  }
  setToken(){
    this.setState({token:'2df579cfc86d929b9a9228bdcd265345addf8cb4'},()=>{this.setSearchParams()});
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
        headers: new Headers({'Accept': 'application/json','Content-Type': 'application/json',
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
    if (this.state.isLoggedIn===false){
      return(
        <div>
          <button onClick={this.handleLoginButton.bind(this)}>ورود</button>
        </div>
      );
    }
  }
  renderUserButton(){
    if (this.state.isLoggedIn===true){
      return(
        <div>
          <button onClick={this.handleUserButton.bind(this)}>Panel</button>
        </div>
      );
    }
  }
  handleLoginButton(){
    this.setState({loginPanelVisible:true});
  }
  handleUserButton(){
    if (window.location.pathname !== '/dashboard'){
      window.open('/dashboard');
    }
    else {
      window.location.href = '/dashboard';
    }
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
  render()
  {
    return (
      <div>
      <div className='header container hidden-xs visible-xl'>
       <div className='hearder-child-margined'>
          <div className="header-menu-desktop col-md-10">
            <div>
              {this.renderUserButton()}
            </div>
            <div>
              {this.renderLoginButton()}
            </div>
            <div>
              {this.renderLoginPanel()}
            </div>
          </div>
          <div className="logo col-md-2">
              <div className='headerchild'>
                <div className='logodiv'>
                   <a href="www.tryppin.com"><img src="http://svgshare.com/i/4C0.svg" className="LogoImage" alt = ''></img></a>
                </div>
                <div>
                  <a className='logolink' href="www.tryppin.com">  <p className='logofont'>تریپین</p></a>
                </div>
              </div>
          </div>
        </div>
      </div>

      <div className='header hidden-xl visible-xs navbar-fixed-top'>
      <div className="burger-menu">
         <Menu className="burger" width={ '100%' }>
           <a id="home" className="menu-item" href="/">خانه</a>
           {this.renderLoginButton()}
           <a onClick={ this.showSettings } className="menu-item" href="/">ورود</a>
           <a  className="menu-item--small" href="">Settings</a>
         </Menu>
      </div>
        <div className='headermobile'>

          <div className='jafar'>

             <a href="www.tryppin.com"><img src="http://svgshare.com/i/4C0.svg" className="LogoImage-mobile" alt=""></img></a>
             <a className='logolink' href="www.tryppin.com">  <p className='logofont-mobile'>تریپین</p></a>

          </div>
        </div>
      </div>
    </div>
    );
  }
}
export default Header;
