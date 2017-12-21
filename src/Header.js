import React from 'react';
import Login from './Login.js';
import { slide as Menu } from 'react-burger-menu'

// import UserPanel from './UserPanel.js';
class Header extends React.Component{
  constructor (props) {
    super(props);
    this.state={
      isLoggedIn : false,
      loginPanelVisible:false,
      hidden: false
    };
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
    if(this.state.loginButtonVisible===true){
      return(
        <div>
          <Login />
        </div>
      );
    }
  }
  render()
  {
    return (
      <div>
      <div className='header hidden-xs visible-xl'>
        <div className='headerchild'>
          <div className='logodiv'>
             <a href="www.tryppin.com"><img src="http://svgshare.com/i/4C0.svg" className="LogoImage" alt = ''></img></a>
          </div>
          <div>
            <a className='logolink' href="www.tryppin.com">  <p className='logofont'>تریپین</p></a>
          </div>
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
