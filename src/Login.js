import React from 'react';
import LoginXl from './Login/LoginXl.js';
import LoginXs from './Login/LoginXs.js';
import LoginMd from './Login/LoginMd.js';
import LoginSm from './Login/LoginSm.js';


class Login extends React.Component{
  constructor(props){
    super(props);
    this.state={
      hasAccount:null,
      hasPassword:null,
    }
  }
  componentWillReceiveProps(nextProps){
    this.setState({hasAccount : nextProps.hasAccount ,hasPassword:nextProps.hasPassword})
  }

renderLoginXl(props){
  return(
    <div className="hidden-xs hidden-md hidden-sm visible-xl">
      <LoginXl hasAccount={this.state.hasAccount} hasPassword={this.state.hasPassword} closeLoginPanel={props.closeLoginPanel.bind(this)}/>
    </div>
  );
}

renderLoginMd(props){
  return(
    <div className="hidden-xs hidden-xl hidden-sm visible-md">
      <LoginMd hasAccount={this.state.hasAccount} hasPassword={this.state.hasPassword} closeLoginPanel={props.closeLoginPanel.bind(this)}/>
    </div>
  );
}

renderLoginSm(props){
  return(
    <div className="hidden-xs hidden-md hidden-xl visible-sm">
      <LoginSm closeLoginPanel={props.closeLoginPanel.bind(this)}/>
    </div>
  );
}

renderLoginXs(props){
  return(
    <div className="hidden-xl hidden-md hidden-sm visible-xs">
      <LoginXs closeLoginPanel={props.closeLoginPanel.bind(this)}/>
    </div>
  );
}

render(){
    return(
      <div>
        {this.renderLoginXl(this.props)}
        {this.renderLoginXs(this.props)}
        {this.renderLoginMd(this.props)}
        {this.renderLoginSm(this.props)}
      </div>

    );
  }
}
export default Login;
