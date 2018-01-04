import React from 'react';
import {Button,Divider} from 'semantic-ui-react';
import Modal from 'react-modal';

class Login extends React.Component{
    constructor(props){
      super(props);
      this.state={
        showSignUpOrSetPasswordModal:false,
        showVerificationModal:true,
        hasPassword : null,
        hasAccount : null,
        inputForLogin:{
          password:'',
        },
        inputForSetPassword:{
          password:'',
          confirmPassword:'',
        },
        inputForSignUp:{
          firstName:'',
          lastName:'',
          password:'',
          confirmPassword:'',
        },
        inputForVerification:{
          verificationCode:'',
        },
        role : null,
        reqParamsForLogin:{
          phoneNumber:null,
          password:null,
          confirmPassword:null,
        },
        reqParamsForSignup:{
          phoneNumber:null,
          password:null,
          confirmPassword:null,
          verificationCode:null,
          firstName : null,
          lastName: null,
        },
        reqParamsForSetPassword:{
          password:null,
          confirmPassword:null,
          verificationCode : null,
          phoneNumber : null,
        },
        reqParamsForVerification:{
          verificationCode:null,
          phoneNumber:null,
        },
      }
    }
    renderData(request_list){
      this.setState({requestList:request_list});
    }
    componentWillReceiveProps(nextProps){
      this.setState({hasAccount : nextProps.hasAccount ,hasPassword:nextProps.hasPassword})
    }
    handleLoginClick(){
      this.setTokenForLogin();
    }
    handleSignupClick(){
      this.setTokenForSignup();
    }
    handleSetPasswordClick(){
      this.setTokenForSetPassword();
    }
    setTokenForSetPassword(){
      this.setState({token:localStorage['token']},()=>{this.setReqParamsForSetPassword()});
    }
    setTokenForLogin(){
      this.setState({token:localStorage['token']},()=>{this.setReqParamsForLogin()});
    }

    setTokenForSignup(){
      this.setState({token:localStorage['token']},()=>{this.setReqParamsForSignup()});
    }

    setTokenForVerification(){
      this.setState({token:localStorage['token']},()=>{this.setReqParamsForVerification()});
    }

    setReqParamsForVerification(){
      var spar= {verificationCode : this.state.inputForVerification.verificationCode,
                 phoneNumber :localStorage['phone-number']};
      this.setState({reqParamsForVerification:spar} ,()=>{this.getResponseForVerification()});
    }
    setReqParamsForLogin(){
      var spar = {phoneNumber:localStorage['phone-number'],
                  password : this.state.inputForLogin.password,};
     this.setState({reqParamsForLogin:spar},()=>{this.getResponseForLogin()});
    }
    setReqParamsForSignup(){
      var spar = {phoneNumber:localStorage['phone-number'],
                  password:this.state.inputForSignUp.password,
                  confirmPassword:this.state.inputForSignUp.confirmPassword,
                  verificationCode:this.state.inputForVerification.verificationCode,
                  firstName : this.state.inputForSignUp.firstName,
                  lastName : this.state.inputForSignUp.lastName};
      this.setState({reqParamsForSignup:spar},()=>{this.getResponseForSignUp()});
    }
    setReqParamsForSetPassword(){
      var spar = {phoneNumber:localStorage['phone-number'],
                  password:this.state.inputForSetPassword.password,
                  confirmPassword:this.state.inputForSetPassword.confirmPassword,
                  verificationCode:this.state.inputForVerification.verificationCode,};
      this.setState({reqParamsForSetPassword:spar},()=>{this.getResponseForSetPassword()});
    }
    getResponseForSetPassword(){
      var request = new Request('https://www.trypinn.com/auth/api/user/login/', {
        method: 'POST',
        body: JSON.stringify({
          cell_phone : this.state.reqParamsForSetPassword.phoneNumber,
          password : this.state.reqParamsForSetPassword.password,
          confirm_password : this.state.reqParamsForSetPassword.confirmPassword,
          verification_code :this.state.reqParamsForSetPassword.verificationCode,
      }),
        headers: new Headers({'Accept': 'application/json','Content-Type': 'application/json',
        'Authorization': 'Token '+this.state.token,})
      });
     fetch(request)
     .then((response) => {
       return response.json();
     })
     .then((setPasswordResponse) => {
       console.log(setPasswordResponse);
       this.handleSetPasswordResponse(setPasswordResponse);
     });
    }
    getResponseForLogin(){
      var request = new Request('https://www.trypinn.com/auth/api/user/login/', {
        method: 'POST',
        body: JSON.stringify({
          cell_phone:this.state.reqParamsForLogin.phoneNumber,
          password:this.state.reqParamsForLogin.password,
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
       this.handleLoginResponse(loginResponse);
     });
    }
    handleSetPasswordResponse(setPasswordResponse){
      console.log(setPasswordResponse);
      if(setPasswordResponse.is_successful){
        localStorage['isLoggedIn']= 'true';
        localStorage['token'] = setPasswordResponse.token;
        this.setUserNameInHeader();
      }
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
       localStorage['user-profile-picture']=data.user.profile_picture;
       localStorage['default-panel']='userprofile';
       window.location.href = '/';
     });
    }
    getResponseForSignUp(){
      var request = new Request('https://www.trypinn.com/auth/api/signup/set_account/', {
        method: 'POST',
        body: JSON.stringify({
          cell_phone : this.state.reqParamsForSignup.phoneNumber,
          password : this.state.reqParamsForSignup.password,
          confirm_password : this.state.reqParamsForSignup.confirmPassword,
          verification_code :this.state.reqParamsForSignup.verificationCode,
          first_name : this.state.reqParamsForSignup.firstName,
          last_name : this.state.reqParamsForSignup.lastName,
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
       this.handleSignUpResponse(signUpresponse);
     });
    }
    handleSignUpResponse(signUpresponse){
      if(signUpresponse.successful===true){
        localStorage['isLoggedIn']= 'true';
        localStorage['token'] = signUpresponse.token;
        this.setUserNameInHeader();
      }
    }
    getResponseForVerification(){
      var request = new Request('https://www.trypinn.com/auth/api/user/verification/', {
        method: 'POST',
        body: JSON.stringify({
          cell_phone : this.state.reqParamsForVerification.phoneNumber,
          verification_code:this.state.reqParamsForVerification.verificationCode,
      }),
        headers: new Headers({'Accept': 'application/json','Content-Type': 'application/json',
        'Authorization': 'Token '+this.state.token,})
      });
     fetch(request)
     .then((response) => {
       return response.json();
     })
     .then((verificationResponse) => {
       if(verificationResponse.successful===true){
         this.setState({showSignUpOrSetPasswordModal:true});
       }
       else{
         alert('کد تایید وارد شده نامعتبر است. لطفا دوباره تلاش کنید');
       }
     });
   }
    renderSetPasswordModal(){
      return(
        <Modal isOpen={this.state.showSignUpOrSetPasswordModal}
               ariaHideApp={false}
               onRequestClose={()=>{this.setState({showSignUpOrSetPasswordModal:false})}}>
         <div className="login1-modal">
             <div  dir="rtl" className="enter-number-main" >
               <p className="enter-phone-number-inmodal2" >رمز عبور </p>
               <input id='password'
                      className="login-input"
                      type="password"
                      value={this.state.inputForSetPassword.password}
                      onChange={this.changePasswordForSetPassword.bind(this)}/>
               <div className="divider-x"></div>
               <br/>
               <br/>
               <p className="enter-phone-number-inmodal2" >تکرار رمز عبور </p>
               <input id='confirm-password'
                      className="login-input"
                      type="password"
                      value={this.state.inputForSetPassword.confirmPassword}
                      onChange={this.changeConfirmPasswordForSetPassword.bind(this)}/>
               <div className="divider-x">
               </div>
               <br/>
               <br/>
               <Button color="blue" onClick={this.handleSetPasswordClick.bind(this)} className="login-modal-button-2">
                 ادامه
               </Button>
             </div>
         </div>
        </Modal>
      );
    }
    renderSignUpModal(){
      return(
        <Modal isOpen={true}
               ariaHideApp={false}
               onRequestClose={()=>{this.setState({showSignUpOrSetPasswordModal:false})}}>
               <div className="login1-modal">
                    <p> نام:</p>
                    <input value={this.state.inputForSignUp.firstName}
                           onChange={this.changeFirstNameForSignUp.bind(this)}/>
                    <br/>
                    <br/>
                    <p> نام خانوادگی:</p>
                    <input value={this.state.inputForSignUp.lastName}
                            onChange={this.changeLastNameForSignUp.bind(this)}/>
                    <br/>
                    <br/>
                   <div  dir="rtl" className="enter-number-main" >
                     <p className="enter-phone-number-inmodal2" >رمز عبور </p>
                     <input id='password'
                            className="login-input"
                            type="password"
                            value={this.state.inputForSignUp.password}
                            onChange={this.changePasswordForSignUp.bind(this)}/>
                     <div className="divider-x"></div>
                     <br/>
                     <br/>
                     <p className="enter-phone-number-inmodal2" > تکرار رمز عبور </p>
                     <input id='confirm-password'
                            className="login-input"
                            type="password"
                            value={this.state.inputForSignUp.confirmPassword}
                            onChange={this.changeConfirmPasswordForSignUp.bind(this)}/>
                     <div className="divider-x">
                     </div>
                     <br/>
                     <br/>
                     <Button color="blue" onClick={this.handleSignupClick.bind(this)} className="login-modal-button-2">
                       ادامه
                     </Button>
                   </div>
               </div>
        </Modal>
      );
    }
    renderSignUpOrSetPasswordModal(){
      if(this.state.showSignUpOrSetPasswordModal===true){
        if(this.state.hasAccount){
          return (this.renderSetPasswordModal());
          }
          else {
            return (this.renderSignUpModal());
          }
      }
    }
    handleVerificationClick(){
      this.setTokenForVerification();
    }
    renderVerificationModal(){
      return(<Modal isOpen={this.state.showVerificationModal}
        ariaHideApp={false}
        onRequestClose={()=>{this.setState({showVerificationModal:false})}}>
        <div>
          <p className="enter-phone-number-inmodal2">:کد تایید ارسال شده را وارد نمایید
          </p>
          <div className='enter-number-main'>
            <input className='login-input'
            value={this.state.inputForVerification.verificatinCode}
            onChange={this.changeVerificationCode.bind(this)}
            className="login-input-code"
             id='verify-code'
             maxLength="4"
             type="numeric"/>
            <div className="divider-x2">
            </div>
            <br/>
            <br/>
          </div>

          <Button color="blue" onClick={this.handleVerificationClick.bind(this)} className="login-modal-button-2">
            ادامه
          </Button>
        </div>
      </Modal>);

    }
    renderLoginPanel(){
      if (this.state.hasPassword !== null){
        if (!this.state.hasPassword){
          return (this.renderVerificationModal());
        }
        else{
          return (
            <div className="login1-modal">
              <p className="login-title-in-modal"> ورود </p>
              <Divider/>
              <p className="enter-phone-number-inmodal">:رمز عبور خود را وارد کنید </p>
                <div  dir="rtl" className="enter-number-main">
                <input
                  className="login-input"
                  onChange={this.changePasswordForLogin.bind(this)}
                  value={this.state.inputForLogin.password}
                  id='password'
                  type="password"
                  autoComplete="off"
                  >
                  </input>
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
    changePasswordForLogin(event){
      var inputlogin ={password:event.target.value};
      this.setState({inputForLogin : inputlogin});
    }
    changePasswordForSetPassword(event){
      var inputSetPassword = {password : event.target.value ,
        confirmPassword : this.state.inputForSetPassword.confirmPassword,
        }
      this.setState({inputForSetPassword:inputSetPassword});
    }
    changeConfirmPasswordForSetPassword(event){
      var inputSetPassword = {password : this.state.inputForSetPassword.password,
        confirmPassword : event.target.value,
        }
      this.setState({inputForSetPassword:inputSetPassword});
    }
    changePasswordForSignUp(event){
      var inputSignUp={password : event.target.value ,
                   confirmPassword: this.state.inputForSignUp.confirmPassword,
                   firstName : this.state.inputForSignUp.firstName,
                   lastName : this.state.inputForSignUp.lastName
                 }
      this.setState({inputForSignUp : inputSignUp});
    }
    changeConfirmPasswordForSignUp(event){
      var inputSignUp={password : this.state.inputForSignUp.password ,
                   confirmPassword: event.target.value,
                   firstName : this.state.inputForSignUp.firstName,
                   lastName : this.state.inputForSignUp.lastName
                 }
      this.setState({inputForSignUp : inputSignUp});
    }
    changeFirstNameForSignUp(event){
      var inputSignUp={password : this.state.inputForSignUp.password ,
                   confirmPassword: this.state.inputForSignUp.confirmPassword,
                   firstName : event.target.value,
                   lastName : this.state.inputForSignUp.lastName
                 }
      this.setState({inputForSignUp : inputSignUp});
    }
    changeLastNameForSignUp(event){
      var inputSignUp={password :this.state.inputForSignUp.password ,
                   confirmPassword: this.state.inputForSignUp.confirmPassword,
                   firstName : this.state.inputForSignUp.firstName,
                   lastName : event.target.value,
                 }
      this.setState({inputForSignUp : inputSignUp});

    }
    changeVerificationCode(event){
      var inputVerification={verificationCode : event.target.value};
      this.setState({inputForVerification : inputVerification});
    }
    change
render(){
    return(
      <div>
        {this.renderLoginPanel()}
        {this.renderSignUpOrSetPasswordModal()}
      </div>
    );
  }
}

export default Login;
