import React from 'react';
import {Button,Divider,Checkbox} from 'semantic-ui-react';
// import {Modal} from 'react-bootstrap';
import Modal from 'react-modal';
import {loginVerifySmsXl , registerNewUser , setPasswordStyle} from '../Styles.js';
import {englishToPersianDigits, persianArabicToEnglishDigits} from '../tools/EnglishToPersianDigits';
import './Login.css';
import {ClipLoader} from 'react-spinners';


class LoginXl extends React.Component{
  constructor(props){
  super(props);
    this.state={
      passIsNotCorrect:false,
      showSignUpOrSetPasswordModal:false,
      showVerificationModal:true,
      showForgetPasswordModal:false,
      hasPassword : null,
      hasAccount : null,
      activeSignUpButton:false,
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
        firstName:null,
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
      inputForChangePassword:{
        cellPhone : '',
        verificationCode:'',
        password:'',
        confirmPassword:'',
      },
      reqParamsForChangePassword:{
        cellPhone : null,
        verificationCode:null,
        password:null,
        confirmPassword:null,
      },
      forgetPasswordInputHasError:false,
      forgetPasswordInputError:'خطایی وجود ندارد',
      loginLoading : false,
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

  setTokenForChangePassword(){
    this.setState({token:localStorage['token']},()=>{this.setReqParamsForChangePassword()});
  }

  setReqParamsForChangePassword(){
    var spar={verificationCode:persianArabicToEnglishDigits(this.state.inputForChangePassword.verificationCode),
              password:this.state.inputForChangePassword.password,
              confirmPassword:this.state.inputForChangePassword.confirmPassword,
              cellPhone:persianArabicToEnglishDigits(this.props.cellPhone)};
    this.setState({reqParamsForChangePassword:spar} ,()=>{this.getResponseForChangePassword()});
  }
  setReqParamsForVerification(){
    var spar={verificationCode:persianArabicToEnglishDigits(this.state.inputForVerification.verificationCode),
               phoneNumber :localStorage['phone-number']};
    this.setState({reqParamsForVerification:spar} ,()=>{this.getResponseForVerification()});
  }
  setReqParamsForLogin(){
    var spar = {phoneNumber:localStorage['phone-number'],
                password : this.state.inputForLogin.password,};
   this.setState({reqParamsForLogin:spar,loginLoading:true},()=>{this.getResponseForLogin()});
  }
  setReqParamsForSignup(){
    var spar = {phoneNumber:localStorage['phone-number'],
                password:this.state.inputForSignUp.password,
                confirmPassword:this.state.inputForSignUp.confirmPassword,
                verificationCode:persianArabicToEnglishDigits(this.state.inputForVerification.verificationCode),
                firstName : this.state.inputForSignUp.firstName,
                lastName : this.state.inputForSignUp.lastName};
    this.setState({reqParamsForSignup:spar},()=>{this.getResponseForSignUp()});
  }
  setReqParamsForSetPassword(){
    var spar = {phoneNumber:localStorage['phone-number'],
                password:this.state.inputForSetPassword.password,
                confirmPassword:this.state.inputForSetPassword.confirmPassword,
                verificationCode:persianArabicToEnglishDigits(this.state.inputForVerification.verificationCode)};
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
     this.setState({loginLoading:false});
     return response.json();
   })
   .then((loginResponse) => {
     this.handleLoginResponse(loginResponse);
   });
  }
  handleSetPasswordResponse(setPasswordResponse){
    if(setPasswordResponse.is_successful){
      localStorage['isLoggedIn']= 'true';
      localStorage['token'] = setPasswordResponse.token;
      this.setUserNameInHeader();
    }
  }
  handleLoginResponse(loginResponse){
    if(loginResponse.is_successful){
      console.log(loginResponse);
      localStorage['isLoggedIn']= 'true';
      localStorage['token'] = loginResponse.token;
      this.setUserNameInHeader();
    }
    else{
      this.setState({passIsNotCorrect:true});
    }
  }
  setUserNameInHeader(){
    this.setState({token:localStorage['token']},()=>{this.getUserInfo();});
  }
  getRole(){
    return 'guest';
  }

  getUserInfo(){
    if(localStorage['isLoggedIn']==='true'){
      this.setSearchParamsForUserInfo(this.getRole());
      // this.setState({passIsNotCorrect:true},()=>{this.setSearchParamsForUserInfo(this.getRole())});
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
     // console.log(data);
     localStorage['user-first-name']=data.user.first_name;
     localStorage['user-last-name']=data.user.last_name;
     localStorage['user-username']=data.user.username;
     localStorage['user-profile-picture']=data.user.profile_picture;
     window.location.reload();
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
       this.setState({showSignUpOrSetPasswordModal:true,showVerificationModal:false});
     }
     else{
       alert('کد تایید وارد شده نامعتبر است. لطفا دوباره تلاش کنید');
     }
   });
  }
  handleSetPasswordClickByenter(event){
   if(event.key==='Enter'){
     if(this.state.inputForSetPassword.password===''){
       alert('لطفا رمز عبور خود را وارد نمایید');
     }
     else{
       if(this.state.inputForSetPassword.confirmPassword!==this.state.inputForSetPassword.password){
         alert('رمز عبور و تکرار آن یکسان نیستند');
       }
       else{
         this.handleSetPasswordClick();
       }
     }
   }
  }
  renderSetPasswordModal(){
    return(
      <Modal isOpen={this.state.showSignUpOrSetPasswordModal}
             style={setPasswordStyle}
             onRequestClose={()=>{this.props.closeLoginPanel();
               this.setState({showSignUpOrSetPasswordModal:false})}}>
               <div className="login1-modal">
                 <div onClick={()=>{this.props.closeLoginPanel()}} className="close-modal-set-password">
                 </div>
                  <p className="login-title-in-modal">تعیین رمز عبور</p>
                  <div className="header-login-modal-divider">
                  </div>
                    <div className="header-login-modal-content-container">
                      <p  className="enter-phone-number-inmodal">شما کاربر تریپین بوده‌اید. برای استفاده از سایت تریپین کافی است رمز عبور خود را تعیین نمایید</p>
                      <div>
                     <div dir="rtl" className="header-login-modal-verify-button-input-container"   onKeyDown={(event)=>{this.handleSetPasswordClickByenter(event)}}>
                       <div className="modal-signup-items">
                         <p className="header-login-modal-input-label-right-align">رمز عبور </p>
                           <input id='password'
                           className="setpass-password  input-tripinn2"
                           type="password"
                           autoFocus={true}
                           value={this.state.inputForSetPassword.password}
                           onChange={this.changePasswordForSetPassword.bind(this)}/>
                       </div>
                       <div className="modal-signup-items">
                         <p className="header-login-modal-input-label-right-align">تکرار رمز عبور</p>
                          <input id='confirm-password'
                            className="setpass-password  input-tripinn2"
                              type="password"
                              value={this.state.inputForSetPassword.confirmPassword}
                              onChange={this.changeConfirmPasswordForSetPassword.bind(this)}/>
                       </div>
                       <button  onClick={this.handleSetPasswordClick.bind(this)} className="header-login-modal-button-new-user">
                         ذخیره
                       </button>
                       </div>
                     </div>
                   </div>
               </div>
      </Modal>
    );
  }

  handleSignupClickByEnter(event){
    if(event.key==="Enter"){
      this.handleSignupClick();
    }
  }
  activateSignUpButton(event){
    this.setState((prevState,props)=>({activeSignUpButton:!prevState.activeSignUpButton}));
  }
  renderSignUpModal(){
    return(
      <Modal isOpen={this.state.showSignUpOrSetPasswordModal}
             style={registerNewUser}
             onRequestClose={()=>{this.props.closeLoginPanel();
                          this.setState({showSignUpOrSetPasswordModal:false})}}>
             <div className="login1-modal">
                 <div onClick={()=>{this.props.closeLoginPanel();
                              this.setState({showSignUpOrSetPasswordModal:false})}} className="close-modal-sign-up">
                 </div>
                 <p className="login-title-in-modal">ثبت‌نام کاربر جدید</p>
                 <div className="header-login-modal-divider">
                 </div>
                 <div className="header-login-modal-content-container" onKeyDown={(event)=>{this.handleSignupClickByEnter(event)}} >
                   <div className="modal-signup-items" >
                     <p className="header-login-modal-input-label-right-align">نام </p>
                     <input value={this.state.inputForSignUp.firstName}
                       onChange={this.changeFirstNameForSignUp.bind(this)}
                       className="singup-fa-input input-tripinn2"
                       autoFox1cus={true}
                     />
                   </div>
                   <div className="modal-signup-items">
                     <p className="header-login-modal-input-label-right-align"> نام خانوادگی</p>
                     <input value={this.state.inputForSignUp.lastName}
                     onChange={this.changeLastNameForSignUp.bind(this)}
                     className="singup-fa-input input-tripinn2"
                     />
                   </div>
                   <div className="modal-signup-items">
                    <p className="header-login-modal-input-label-right-align">رمز عبور </p>
                    <input id='password'
                     className="login-password  input-tripinn2"
                     type="password"
                     value={this.state.inputForSignUp.password}
                     onChange={this.changePasswordForSignUp.bind(this)}/>
                   </div>
                   <div className="modal-signup-items">
                    <p className="header-login-modal-input-label-right-align"> تکرار رمز عبور </p>
                    <input id='confirm-password'
                       className="login-password  input-tripinn2"
                       type="password"
                       value={this.state.inputForSignUp.confirmPassword}
                       onChange={this.changeConfirmPasswordForSignUp.bind(this)}/>
                   </div>
                   <div className="sign-up-modal-rule-aggreement">
                       <Checkbox checked={this.state.activeSignUpButton}
                         onChange={(event)=>{this.activateSignUpButton(event)}}
                         />
                       <div className='sign-up-modal-aggreement-sentence'>
                         <span>.</span><span>با </span ><span onClick={()=>{window.open('/terms&conditions')}} className='sign-up-modal-link-to-rules'> قوانین و مقررات</span> <span> تریپین موافقم </span>
                       </div>
                   </div>
                   <button className="header-login-modal-button-new-user"  disabled={!this.state.activeSignUpButton} onClick={this.handleSignupClick.bind(this)}>
                        ثبت‌نام و ورود
                   </button>
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
    if(this.state.inputForVerification.verificationCode.length<4){
      alert('لطفا کد تایید را به طور کامل وارد نمایید');
    }
    else{
      this.setTokenForVerification();
    }
  }


  handleVerificationClickByEnter(event){
    if(event.key === 'Enter'){
      this.handleVerificationClick();
    }
    if (['0','1','2','3','4','5','6','7','8','9'].indexOf(event.key)===-1){
      if(event.key!=="Backspace"){
        event.preventDefault();
      }
    }
  }
  renderVerificationModal(){
    return(
      <div className="login1-modal">
        <div onClick={()=>{this.props.closeLoginPanel()}} className="close-modal-verification">
        </div>
        <p className="login-title-in-modal"> ورود / ثبت‌نام  </p>
        <div className="header-login-modal-divider">
        </div>
          <div className="header-login-modal-content-container">
            <p className="enter-verify-number-inmodal">
            :کد تایید پیامک شده را وارد نمایید
           </p>
            <div dir="rtl" className="header-login-modal-verify-button-input-container" >
              <input
              onKeyDown= {(event)=>{this.handleVerificationClickByEnter(event)}}
                  value={this.state.inputForVerification.verificationCode}
                  onChange={(event)=>{this.changeVerificationCode(event)}}
                  className="header-login-modal-input-verify"
                  id='verify-code'
                  maxLength="4"
                  autoFocus={true}
                  type="numeric"/>
                  <button className="header-login-modal-button-verify" onClick={this.handleVerificationClick.bind(this)}>
                    تایید کد
                  </button>
            </div>
          </div>
        </div>
  );
    // </Modal>
  }

  handleLoginClickByEnter(event){
      if(event.key === 'Enter'){
        this.handleLoginClick();
      }
  }


  changePasswordForLogin(event){
    var inputlogin ={password:event.target.value};
    this.setState({inputForLogin : inputlogin, passIsNotCorrect:false});
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
    var inputVerification={verificationCode : englishToPersianDigits(event.target.value)};
    this.setState({inputForVerification : inputVerification});
  }

  changepasswordForChangePassword(event){
    var inputChangePassword={password: event.target.value,
                             confirmPassword:this.state.inputForChangePassword.confirmPassword,
                             verificationCode:this.state.inputForChangePassword.verificationCode,}
    this.setState({inputForChangePassword:inputChangePassword});
  }

  changeConfirmPasswordForChangePassword(event){
    var inputChangePassword={ password:this.state.inputForChangePassword.password,
                             confirmPassword:event.target.value,
                             verificationCode:this.state.inputForChangePassword.verificationCode,}
    this.setState({inputForChangePassword:inputChangePassword});
  }

  changeVerificationCodeForChangePassword(event){
    var inputChangePassword={password: this.state.inputForChangePassword.password,
                             confirmPassword:this.state.inputForChangePassword.confirmPassword,
                             verificationCode:event.target.value,}
    this.setState({inputForChangePassword:inputChangePassword});
  }

  renderLoginPanel() {
    if (this.state.hasPassword !== null){
      if (!this.state.hasPassword){
        return (this.renderVerificationModal());
      }
      else{
        return (
          <div className="login1-modal">
            <div onClick={()=>{this.props.closeLoginPanel()}} className="close-modal-phone-number">
            </div>
            <p className="login-title-in-modal"> ورود </p>
            <div className="header-login-modal-divider">
            </div>
            <div className="header-login-modal-content-container">
            <p className="enter-phone-number-inmodal">:رمز عبور خود را وارد کنید </p>
              <div dir="rtl" className="header-login-modal-verify-button-input-container" >
                <input
                className="header-login-modal-input"
                className={this.state.passIsNotCorrect ? "header-login-modal-input-wrong": "header-login-modal-input"}
                onChange={this.changePasswordForLogin.bind(this)}
                value={this.state.inputForLogin.password}
                id='password'
                autoFocus={true}
                type="password"
                autoComplete="off"
                onKeyDown ={(event)=>{this.handleLoginClickByEnter(event)}}/>
                <p className={this.state.passIsNotCorrect?"log-in-false-pass-visible":"log-in-false-pass-hide"}>رمز عبور وارد شده اشتباه است.</p>
              <button color="blue" onClick={this.handleLoginClick.bind(this)} className="header-login-modal-button">
                {this.state.loginLoading===true ? <ClipLoader color="white"/> : "ورود" }
              </button>
              <p onClick={()=>{this.handleForgetPassword(); this.setState({showForgetPasswordModal:true})}} className="login-modal-forget-password-paragraph">فراموشی رمز عبور</p>
            </div>
            </div>
          </div>
          );
      }
    }
  }

  handleForgetPassword(){
    var request = new Request('https://www.trypinn.com/auth/api/user/edit/forgot_password/', {
      method: 'POST',
      body: JSON.stringify({
        cell_phone : persianArabicToEnglishDigits(this.props.cellPhone),
    }),
      headers: new Headers({'Accept': 'application/json','Content-Type': 'application/json',})
    });
   fetch(request)
   .then((response) => {
     return response.json();
   })
   .then((forgetPasswordResponse) => {
   });
  }

  renderForgetPasswordModal(){
    return(
      <Modal isOpen={this.state.showForgetPasswordModal}
             onRequestClose={()=>{this.props.closeLoginPanel(); this.setState({showForgetPasswordModal:false})}}
             style={setPasswordStyle}>
        <div className="forget-password-modal">
          <div onClick={()=>{this.props.closeLoginPanel(); this.setState({showForgetPasswordModal:false})}} className="close-modal-phone-number">
          </div>
          <div className="forget-password-title">
          بازیابی رمز عبور
          </div>
          <hr className="forget-password-modal-divider"/>
          <div className="forget-password-modal-input-zone">
            <p className="forget-password-modal-input-paragraph">
              کد تأیید ارسال شده به تلفن همراه شما
            </p>
            <input onChange={(event)=>{this.changeVerificationCodeForChangePassword(event)}} value={this.state.inputForChangePassword.verificationCode} type="numeric" className="forget-password-modal-input"/>
          </div>
          <div className="forget-password-modal-input-zone">
            <p className="forget-password-modal-input-paragraph">
            رمز عبور
            </p>
            <input onChange={(event)=>{this.changepasswordForChangePassword(event)}} value={this.state.inputForChangePassword.password} type="password" className="forget-password-modal-input"/>
          </div>
          <div className="forget-password-modal-input-zone">
            <p className="forget-password-modal-input-paragraph">
            تکرار رمز عبور
            </p>
            <input onChange={(event)=>{this.changeConfirmPasswordForChangePassword(event)}} value={this.state.inputForChangePassword.confirmPassword} type="password" className="forget-password-modal-input"/>
          </div>
          <div className={this.state.forgetPasswordInputHasError?"error-message-in-forget-password-modal":"error-message-in-forget-password-modal-hidden"}>
            {this.state.forgetPasswordInputError}
          </div>
          <div onClick={()=>{this.handleChangePasswordRequest()}} className="forge-password-change-password-button"> تغییر رمز عبور</div>
        </div>
      </Modal>
    );
  }


  getResponseForChangePassword(){
    console.log(this.state.reqParamsForChangePassword);
    var request = new Request('https://www.trypinn.com/auth/api/user/edit/verify_forgot_password/', {
      method: 'POST',
      body: JSON.stringify({
        cell_phone : this.state.reqParamsForChangePassword.cellPhone,
        password : this.state.reqParamsForChangePassword.password,
        confirm_password : this.state.reqParamsForChangePassword.confirmPassword,
        verification_code :this.state.reqParamsForChangePassword.verificationCode,
    }),
      headers: new Headers({'Accept': 'application/json','Content-Type': 'application/json',
      'Authorization': 'Token '+this.state.token,})
    });
   fetch(request)
   .then((response) => {
     return response.json();
   })
   .then((changePasswordResponse) => {
     this.handleChangePasswordResponse(changePasswordResponse);
   });
  }
  handleChangePasswordResponse(changePasswordResponse){
    if(changePasswordResponse.successful){
      localStorage['isLoggedIn']= 'true';
      localStorage['token'] = changePasswordResponse.token;
      this.setUserNameInHeader();
  }
}

handleChangePasswordRequest(){
  if(this.state.inputForChangePassword.verificationCode===''){
    this.setState({forgetPasswordInputHasError:true , forgetPasswordInputError:'لطفا کد تأیید فرستاده به گوشی همراه خود را وارد کنید'});
    return;
  }
  if(this.state.inputForChangePassword.password===''){
    this.setState({forgetPasswordInputHasError:true,forgetPasswordInputError:'لطفا رمز عبور خود را وارد کنید'});
    return;
  }
  if(this.state.inputForChangePassword.confirmPassword!==this.state.inputForChangePassword.password){
    this.setState({forgetPasswordInputHasError:true,forgetPasswordInputError:'رمز عبور و تکرار آن یکسان نیستند'})
    return;
  }
  this.setTokenForChangePassword();
}

  render(){
    return(
      <div>
        {this.renderLoginPanel()}
        {this.renderForgetPasswordModal()}
        {this.renderSignUpOrSetPasswordModal()}
      </div>
    );
  }
}

export default LoginXl;
