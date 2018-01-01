import React from 'react';
import {Button,Divider} from 'semantic-ui-react';


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
       localStorage['default-panel']='userprofile';
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
            <div className="login1-modal">
                <p className="enter-phone-number-inmodal2">:کد تایید ارسال شده را وارد نمایید</p>
                <div  dir="rtl" className="enter-number-main" >
                  <input
                  className="login-input-code"
                   id='verify-code'
                   maxlength="4"
                   type="numeric"
                    />
                  <div className="divider-x2"></div>
                  <br/>
                  <br/>
                  <p className="enter-phone-number-inmodal2" >رمز عبور </p>
                  <input id='password'    className="login-input" type="password"/>
                  <div className="divider-x"></div>
                  <br/>
                  <br/>


                  <p className="enter-phone-number-inmodal2" > تکرار رمز عبور </p>
                  <input id='confirm-password'   className="login-input"  type="password"/>

                  <div className="divider-x"></div>
                  <br/>
                  <br/>
                  <Button color="blue" onClick={this.handleSignupClick.bind(this)} className="login-modal-button-2">
                    ادامه
                  </Button>
                </div>

            </div>
          );
        }
        else{
          return (
            <div className="login1-modal">
              <p className="login-title-in-modal"> ورود </p>
              <Divider/>
              <p className="enter-phone-number-inmodal">:رمز عبور خود را وارد کنید </p>
                <div  dir="rtl" className="enter-number-main" >
                <input
                  className="login-input"
                  id='password'
                  type="password"
                  autocomplete="off"
                  />
                  <div className="divider-x"></div>
                  <br/>
                  <br/>
                    <Button color="blue" onClick={this.handleLoginClick.bind(this)} className="login-modal-button">
                      ورود
                    </Button>
                </div>
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
