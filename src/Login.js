import React from 'react';


class Login extends React.Component{
    constructor(props){
      super(props);
      this.state={
        role : null,
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
    renderData(request_list){
      this.setState({requestList:request_list});
    }
    handleLoginClick(){
      this.setTokenForLogin();
    }
    handleSignupClick(){
      this.setTokenForSignup();
    }
    setTokenForLogin(){
      this.setState({token:localStorage['token']},()=>{this.setReqParamsForLogin()});
    }
    setTokenForSignup(){
      this.setState({token:localStorage['token']},()=>{this.setReqParamsForSignup()});
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
       this.handleLoginResponse(loginResponse);
     });
    }
    handleLoginResponse(loginResponse){
      if(loginResponse.is_successful){
        localStorage['isLoggedIn']= 'true';
        localStorage['token'] = loginResponse.token;
        this.setUserNameInHeader();
      }
      else{
        alert('رمز عبور وارد شده نادرست است. لطفا دوباره تلاش کنید');
      }
    }
    setUserNameInHeader(){
      this.getUserInfo();
    }
    getRole(){
      return 'guest';
    }
    getUserInfo(){
      if(localStorage['isLoggedIn']==='true'){
        this.setState({token:localStorage['token']},()=>{this.setSearchParamsForUserInfo(this.getRole())});
      }
    }

    setSearchParamsForUserInfo(person_role){
      this.setState({role :person_role} ,()=>this.getUserInfoFromServer());
    }

    getUserInfoFromServer(){
      var request = new Request('https://www.trypinn.com/auth/api/user/get_info/',{ //
        method: 'POST',
        headers: new Headers({'Accept': 'application/json','Content-Type': 'application/json',
        'Authorization': 'Token '+ this.state.token,})
      });
     fetch(request)
     .then((response) => {
       return response.json();
     })
     .then((data) => {
       localStorage['user-first-name']=data.user.first_name;
       localStorage['user-last-name']=data.user.last_name;
       window.location.href = '/dashboard';
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
              <input id='password' type="password"/>
              <p> تکرار رمز عبور </p>
              <input id='confirm-password' type="password"/>
              <button onClick={this.handleSignupClick.bind(this)}>ثبت رمز عبور </button>
            </div>
          );
        }
        else{
          return (
            <div>
              <p>رمز عبور </p>
              <input id='password' type="password"/>
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
