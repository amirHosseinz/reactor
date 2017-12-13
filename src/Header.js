import React from 'react';
import Login from './Login.js';
import UserPanel from './UserPanel.js'
class Header extends React.Component{
  constructor (props) {
    super(props);
    this.state={
      isLoggedIn : true,
      loginPanelVisible:false,
      userPanelVisible:false,
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
    this.setState({userPanelVisible:true});
  }
  renderUserPanel(){
      if(this.state.userPanelVisible===true){
        return(<UserPanel />)
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
            {this.renderUserPanel()}
          </div>
          <div>
            {this.renderLoginPanel()}
          </div>
        </div>
      <div className='header hidden-xl visible-xs'>
        <div className='headermobile'>
          <div className='jafar'>
             <a href="www.tryppin.com"><img src="http://svgshare.com/i/4C0.svg" className="LogoImage-mobile"></img></a>
             <a className='logolink' href="www.tryppin.com">  <p className='logofont-mobile'>تریپین</p></a>
          </div>
        </div>
      </div>
    </div>
    );
  }
}


export default Header;
