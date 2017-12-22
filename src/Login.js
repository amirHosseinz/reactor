import React from 'react';
class Login extends React.Component{
    constructor(props){
      super(props);
      this.state={
        reqParamsForLogin:{
          phoneNumber:null,
          password:null,
          confirmPassword:null,
        },
        ReqParamsForSignup:{
          phoneNumber:null,
          password:null,
          confirmPassword:null,
          verificationCode:null,
        },
      }
    }
    handleLoginClick(){
      this.setTokenForLogin();
    }
    handleSignupClick(){
      this.setTokenForSignup();
    }
    setTokenForLogin(){
      this.setState({token:'2df579cfc86d929b9a9228bdcd265345addf8cb4'},()=>{this.setReqParamsForLogin()});
    }
    setTokenForSignup(){
      this.setState({token:'2df579cfc86d929b9a9228bdcd265345addf8cb4'},()=>{this.setReqParamsForSignup()});
    }
    setReqParamsForLogin(){
      var spar = {phoneNumber:localStorage['phone-number'],
                  password : document.getElementById('password').value,};
     this.setState({reqParamsForLogin:spar},()=>{this.getResponseForLogin()});
    }
    setReqParamsForSignup(){
      var spar = {phoneNumber:localStorage['phone-number'],
                  password:document.getElementById('password').value,
                  confirmPassword:document.getElementById('confirm-password').value,
                  verificationCode:document.getElementById('verify-code').value,};
      this.setState({reqParamsForSignup:spar},()=>{this.getResponseForSignUp()});
    }
    getResponseForLogin(){
      var request = new Request('https://www.trypinn.com/auth/api/user/login/', {
        method: 'POST',
        body: JSON.stringify({
          cell_phone : this.state.reqParamsForLogin.phoneNumber,
          pass : this.state.reqParamsForLogin.password,
      }),
        headers: new Headers({'Accept': 'application/json','Content-Type': 'application/json',
        'Authorization': 'Token '+this.state.token,})
      });
     fetch(request)
     .then((response) => {
       return response.json();
     })
     .then((loginResponse) => {
       console.log(loginResponse);
     });
    }
    getResponseForSignUp(){
      var request = new Request('https://www.trypinn.com/auth/api/user/login/', {
        method: 'POST',
        body: JSON.stringify({
          cell_phone : this.state.reqParamsForSignup.phoneNumber,
          pass : this.state.reqParamsForSignup.password,
          confirm_pass : this.state.reqParamsForSignup.confirmPassword,
          verification_code :this.state.reqParamsForSignup.verificationCode,
      }),
        headers: new Headers({'Accept': 'application/json','Content-Type': 'application/json',
        'Authorization': 'Token '+this.state.token,})
      });
     fetch(request)
     .then((response) => {
       return response.json();
     })
     .then((signUpresponse) => {
       console.log(signUpresponse);
     });
    }
    renderLoginPanel(){
      if (this.props.loginStatus !== null){
        if (!this.props.loginStatus){
          return (
            <div>
              <p>کد تایید</p>
              <input id='verify-code' />
              <p>رمز عبور </p>
              <input id='password' />
              <p> تکرار رمز عبور </p>
              <input id='confirm-password' />
              <button onClick={this.handleSignupClick.bind(this)}>ثبت رمز عبور </button>
            </div>
          );
        }
        else{
          return (
            <div>
              <p>رمز عبور </p>
              <input id='password'/>
              <button onClick={this.handleLoginClick.bind(this)}> ورود</button>
            </div>
          );
        }
      }

    }
render(){
    return(
      <div>
        {this.renderLoginPanel()}
      </div>
    );
  }
}

export default Login;
