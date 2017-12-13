import React from 'react';
import Login from './Login.js';
// import UserPanel from './UserPanel.js';
class Header extends React.Component{
  constructor (props) {
    super(props);
    this.state={
      isLoggedIn : true,
      loginPanelVisible:false,
    };
  }
  renderLoginButton(){
    if (this.state.isLoggedIn===false){
      return(
        <div>
          <button onClick={this.handleLoginButton.bind(this)}>Login</button>
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
      <div className='header'>
        <div className='headerchild' >
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
    );
  }
}
export default Header;
