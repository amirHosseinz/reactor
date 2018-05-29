import React from 'react';
import {Checkbox} from 'semantic-ui-react';
import Modal from 'react-modal';
import {loginVerifySmsXl , registerNewUser , setPasswordStyle} from '../Styles.js';
import {englishToPersianDigits, persianArabicToEnglishDigits} from '../tools/EnglishToPersianDigits';
import './Login.css';
import {ClipLoader} from 'react-spinners';
import Fade from 'react-reveal';
import {productionURL} from'../Data.js';


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
        referralCode : '' ,
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
        referralCode:null,
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
      forgetPasswordLoading : false,
      setPasswordLoading : false,
      signUpLoading : false,
      verificationLoading : false,

      setPasswordModalPasswordIsWrong : false,
      setPasswordModalConfirmPasswordIsWrong : false,
      setPasswordInputError : 'خطایی وجود ندارد',

      signUpModalpasswordIsWrong : false,
      signUpModalConfirmPasswordIsWrong : false,
      signUpModalFirstNameIsWrong : false,
      signUpModalLastNameIsWrong : false,
      signUpModalInputError : 'خطایی وجود ندارد',

    }
  }

  renderData(request_list){
    this.setState({requestList:request_list});
  }
  componentWillReceiveProps(nextProps){
    var inputVerification = {verificationCode: "" , referralCode:nextProps.referralCode}
    this.setState({hasAccount : nextProps.hasAccount ,hasPassword:nextProps.hasPassword,
                   inputForVerification:inputVerification});
  }
  handleLoginClick(){
    this.setTokenForLogin();
  }
  handleSignupClick(){
    if(this.state.inputForSignUp.firstName===''){
      this.setState({signUpModalFirstNameIsWrong:true,signUpModalInputError : 'پر کردن تمام بخش ها اجباری است'});
    }
    if(this.state.inputForSignUp.lastName===''){
      this.setState({signUpModalLastNameIsWrong:true,signUpModalInputError : 'پر کردن تمام بخش ها اجباری است'});
    }
    if(this.state.inputForSignUp.password===''){
      this.setState({signUpModalpasswordIsWrong:true,signUpModalInputError : 'پر کردن تمام بخش ها اجباری است'});
    }
    if(this.state.inputForSignUp.confirmPassword===''){
      this.setState({signUpModalConfirmPasswordIsWrong:true,signUpModalInputError : 'پر کردن تمام بخش ها اجباری است'});
      return;
    }
    if(this.state.inputForSignUp.confirmPassword !== this.state.inputForSignUp.password){
      this.setState({signUpModalConfirmPasswordIsWrong:true,signUpModalInputError : 'رمز عبور وارد شده و تکرار آن یکسان نیستند'});
      return;
    }
    if(this.state.activeSignUpButton===false){
      this.setState({signUpModalConfirmPasswordIsWrong:true,signUpModalInputError : ' برای ثبت‌نام موافقت با قوانین تریپین ضروری است'});
      return;
    }
    this.setTokenForSignup();
  }
  handleSetPasswordClick(){
    if(this.state.inputForSetPassword.password===''){
      this.setState({setPasswordModalPasswordIsWrong:true , setPasswordInputError:"لطفا رمز عبور خود را وارد کنید" });
      return;
    }
    if(this.state.inputForSetPassword.confirmPassword!==this.state.inputForSetPassword.password){
      this.setState({setPasswordModalConfirmPasswordIsWrong:true , setPasswordInputError:"رمز عبور وارد شده و تکرار آن یکسان نیستند"});
      return;
    }
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
    this.setState({reqParamsForChangePassword:spar,forgetPasswordLoading:true} ,()=>{this.getResponseForChangePassword()});
  }
  setReqParamsForVerification(){
    var spar={verificationCode:persianArabicToEnglishDigits(this.state.inputForVerification.verificationCode),
              referralCode:this.state.inputForVerification.referralCode, phoneNumber :localStorage['phone-number']};
    this.setState({reqParamsForVerification:spar,verificationLoading:true} ,()=>{this.getResponseForVerification()});
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
    this.setState({reqParamsForSignup:spar,signUpLoading:true},()=>{this.getResponseForSignUp()});
  }
  setReqParamsForSetPassword(){
    var spar = {phoneNumber:localStorage['phone-number'],
                password:this.state.inputForSetPassword.password,
                confirmPassword:this.state.inputForSetPassword.confirmPassword,
                verificationCode:persianArabicToEnglishDigits(this.state.inputForVerification.verificationCode)};
    this.setState({reqParamsForSetPassword:spar,setPasswordLoading:true},()=>{this.getResponseForSetPassword()});
  }
  getResponseForSetPassword(){
    var request = new Request(productionURL + 'auth/api/user/login/', {
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
     this.setState({setPasswordLoading:false});
     return response.json();
   })
   .then((setPasswordResponse) => {
     this.handleSetPasswordResponse(setPasswordResponse);
   });
  }
  getResponseForLogin(){
    var request = new Request(productionURL + 'auth/api/user/login/', {
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
    else {
      if(setPasswordResponse.errors.indexOf("This password is too short. It must contain at least 6 characters.")!==-1) {
        this.setState({setPasswordModalPasswordIsWrong:true , setPasswordInputError:'رمز عبور شما باید حداقل دارای شش کاراکتر باشد'});
        return;
      }
      if(setPasswordResponse.errors.indexOf("This password is entirely numeric.")!==-1) {
        this.setState({setPasswordModalPasswordIsWrong:true , setPasswordInputError:'کلمه عبور شما باید حداقل شامل یک حرف باشد'});
        return;
      }
      if(setPasswordResponse.errors.indexOf("The password is too similar to the username.")!==-1) {
        this.setState({setPasswordModalPasswordIsWrong:true , setPasswordInputError:'کلمه عبور شما مشابه دیگر اطلاعات کاربری شماست'});
        return;
      }
      if(setPasswordResponse.errors.indexOf("This password is too common.")!==-1) {
        this.setState({setPasswordModalPasswordIsWrong:true , setPasswordInputError:'رمز عبور انتخاب شده معتبر نیست'});
        return;
      }
    }
  }
  handleLoginResponse(loginResponse){
    if(loginResponse.is_successful){
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
    var request = new Request(productionURL + 'auth/api/user/get_info/',{ //
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
     localStorage['user-username']=data.user.username;
     localStorage['user-profile-picture']=data.user.profile_picture;
     if(this.props.triggerLoginOrigin==="book-request"){
       this.props.setTriggerLoginOrigin('');
       this.props.closeLoginPanel();
     }
     else{
       window.location.reload();
     }
   });
  }
  getResponseForSignUp(){
    var request = new Request(productionURL + 'auth/api/signup/set_account/', {
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
     this.setState({signUpLoading : false});
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
    else{
      if(signUpresponse.errors.indexOf("This password is too short. It must contain at least 6 characters.")!==-1) {
        this.setState({signUpModalpasswordIsWrong:true , signUpModalInputError:'رمز عبور شما باید حداقل دارای شش کاراکتر باشد'});
        return;
      }
      if(signUpresponse.errors.indexOf("This password is entirely numeric.")!==-1) {
        this.setState({signUpModalpasswordIsWrong:true , signUpModalInputError:'کلمه عبور شما باید حداقل شامل یک حرف باشد'});
        return;
      }
      if(signUpresponse.errors.indexOf("The password is too similar to the username.")!==-1) {
        this.setState({signUpModalpasswordIsWrong:true , signUpModalInputError:'کلمه عبور شما مشابه دیگر اطلاعات کاربری شماست'});
        return;
      }
      if(signUpresponse.errors.indexOf("This password is too common.")!==-1) {
        this.setState({signUpModalpasswordIsWrong:true , signUpModalInputError:'رمز عبور انتخاب شده معتبر نیست'});
        return;
      }
    }
  }
  getResponseForVerification(){
    var request = new Request(productionURL + 'auth/api/user/verification/', {
      method: 'POST',
      body: JSON.stringify({
        cell_phone : this.state.reqParamsForVerification.phoneNumber,
        verification_code:this.state.reqParamsForVerification.verificationCode,
        referral_code  : this.state.reqParamsForVerification.referralCode,
    }),
      headers: new Headers({'Accept': 'application/json','Content-Type': 'application/json',
      'Authorization': 'Token '+this.state.token,})
    });
   fetch(request)
   .then((response) => {
     this.setState({verificationLoading:false});
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
                      <p  className="enter-phone-number-inmodal">
                      کاربر گرامی شما در اپلیکیشن تریپین ثبت نام کرده‌اید. لطفاً برای حساب کاربری خود یک رمز عبور اختصاص دهید
                      </p>
                      <div>
                     <div dir="rtl" className="header-login-modal-verify-button-input-container" onKeyDown={(event)=>{this.handleSetPasswordClickByenter(event)}}>
                       <div className="modal-signup-items">
                         <p className="header-login-modal-input-label-right-align">رمز عبور </p>
                           <input id='password'
                           className={this.state.setPasswordModalPasswordIsWrong ? "set-pass-password-wrong" : "set-pass-password-right"}
                           type="password"
                           autoFocus={true}
                           value={this.state.inputForSetPassword.password}
                           onChange={this.changePasswordForSetPassword.bind(this)}/>
                       </div>
                       <div className="modal-signup-items">
                         <p className="header-login-modal-input-label-right-align">تکرار رمز عبور</p>
                          <input id='confirm-password'
                              className={this.state.setPasswordModalConfirmPasswordIsWrong ? "set-pass-password-wrong" : "set-pass-password-right"}
                              type="password"
                              value={this.state.inputForSetPassword.confirmPassword}
                              onChange={this.changeConfirmPasswordForSetPassword.bind(this)}/>
                       </div>
                       <Fade bottom={true} collapse={false} when={this.state.setPasswordModalPasswordIsWrong || this.state.setPasswordModalConfirmPasswordIsWrong}>
                         <p className="set-pass-error-visible">
                            {this.state.setPasswordInputError}
                          </p>
                       </Fade>
                       <button onClick={this.handleSetPasswordClick.bind(this)} className="header-login-modal-button-new-user">
                           {this.state.setPasswordLoading ? <ClipLoader color="white" /> : "ذخیره "}
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
                 <div className="header-login-modal-content-container" onKeyDown={(event)=>{this.handleSignupClickByEnter(event)}}>
                   <div className="modal-signup-items" >
                     <p className="header-login-modal-input-label-right-align">نام </p>
                     <input value={this.state.inputForSignUp.firstName}
                       onChange={this.changeFirstNameForSignUp.bind(this)}
                       className={this.state.signUpModalFirstNameIsWrong ? "sign-up-password-wrong":"sign-up-password-right" }
                       autoFocus={true}/>
                   </div>
                   <div className="modal-signup-items">
                     <p className="header-login-modal-input-label-right-align"> نام خانوادگی</p>
                     <input value={this.state.inputForSignUp.lastName}
                     onChange={this.changeLastNameForSignUp.bind(this)}
                     className={this.state.signUpModalLastNameIsWrong ? "sign-up-password-wrong":"sign-up-password-right"}
                     />
                   </div>
                   <div className="modal-signup-items">
                    <p className="header-login-modal-input-label-right-align">رمز عبور </p>
                    <input id='password'
                     className = {this.state.signUpModalpasswordIsWrong ? "sign-up-password-wrong":"sign-up-password-right"}
                     type="password"
                     value={this.state.inputForSignUp.password}
                     onChange={this.changePasswordForSignUp.bind(this)}/>
                   </div>
                   <div className="modal-signup-items">
                    <p className="header-login-modal-input-label-right-align"> تکرار رمز عبور </p>
                    <input id='confirm-password'
                       className={this.state.signUpModalConfirmPasswordIsWrong ? "sign-up-password-wrong":"sign-up-password-right"}
                       type="password"
                       value={this.state.inputForSignUp.confirmPassword}
                       onChange={this.changeConfirmPasswordForSignUp.bind(this)}/>
                   </div>
                   <div className="sign-up-modal-rule-aggreement">
                       <Checkbox checked={this.state.activeSignUpButton}
                         onChange={(event)=>{this.activateSignUpButton(event)}}/>
                       <div className='sign-up-modal-aggreement-sentence'>
                         <span>با </span ><span onClick={()=>{window.open('/terms&conditions')}} className='sign-up-modal-link-to-rules'> قوانین و مقررات</span> <span> تریپین موافقم </span>
                       </div>
                   </div>
                   <Fade bottom={true} collapse={false} when={this.state.signUpModalLastNameIsWrong || this.state.signUpModalFirstNameIsWrong || this.state.signUpModalpasswordIsWrong || this.state.signUpModalConfirmPasswordIsWrong}>
                     <div className= "sign-up-error-visible">
                      {this.state.signUpModalInputError}
                     </div>
                   </Fade>
                   <button className="header-login-modal-button-new-user" onClick={this.handleSignupClick.bind(this)}>
                      {this.state.signUpLoading ? <ClipLoader color="white"/> : "ثبت‌نام و ورود"}
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
            <div className="header-login-modal-verify-button-input-container" >
              <p className="enter-verify-number-inmodal">
               کد تایید پیامک شده به تلفن همراه
              </p>
              <input
              onKeyDown= {(event)=>{this.handleVerificationClickByEnter(event)}}
                  value={this.state.inputForVerification.verificationCode}
                  onChange={(event)=>{this.changeVerificationCode(event)}}
                  className="header-login-modal-input-verify"
                  id='verify-code'
                  maxLength="4"
                  autoFocus={true}
                  type="numeric"/>
              <p className="enter-verify-number-inmodal">
               کد معرف (اختیاری)
              </p>
              <input
                onKeyDown= {(event)=>{this.handleVerificationClickByEnter(event)}}
                 value={this.state.inputForVerification.referralCode}
                 onChange={(event)=>{this.changeReferralCode(event)}}
                 className="header-login-modal-input-verify"
                 id='referral-code'
                 maxLength="6"
                 autoFocus={false}/>
                 <button className="header-login-modal-button-verify" onClick={this.handleVerificationClick.bind(this)}>
                   {this.state.verificationLoading ? <ClipLoader color="white" size={30}/> : "تأیید کد" }
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
    this.setState({setPasswordModalPasswordIsWrong:false , inputForSetPassword:inputSetPassword});
  }
  changeConfirmPasswordForSetPassword(event){
    var inputSetPassword = {password : this.state.inputForSetPassword.password,
      confirmPassword : event.target.value,
      }
    this.setState({setPasswordModalConfirmPasswordIsWrong:false , inputForSetPassword:inputSetPassword});
  }
  changePasswordForSignUp(event){
    var inputSignUp={password : event.target.value ,
                 confirmPassword: this.state.inputForSignUp.confirmPassword,
                 firstName : this.state.inputForSignUp.firstName,
                 lastName : this.state.inputForSignUp.lastName
               }
    this.setState({inputForSignUp : inputSignUp,signUpModalpasswordIsWrong:false});
  }
  changeConfirmPasswordForSignUp(event){
    var inputSignUp={password : this.state.inputForSignUp.password ,
                 confirmPassword: event.target.value,
                 firstName : this.state.inputForSignUp.firstName,
                 lastName : this.state.inputForSignUp.lastName
               }
    this.setState({inputForSignUp : inputSignUp,signUpModalConfirmPasswordIsWrong:false,});
  }
  changeFirstNameForSignUp(event){
    var inputSignUp={password : this.state.inputForSignUp.password ,
                 confirmPassword: this.state.inputForSignUp.confirmPassword,
                 firstName : event.target.value,
                 lastName : this.state.inputForSignUp.lastName
               }
    this.setState({inputForSignUp : inputSignUp,signUpModalFirstNameIsWrong:false});
  }
  changeLastNameForSignUp(event){
    var inputSignUp={password :this.state.inputForSignUp.password ,
                 confirmPassword: this.state.inputForSignUp.confirmPassword,
                 firstName : this.state.inputForSignUp.firstName,
                 lastName : event.target.value,
               }
    this.setState({inputForSignUp : inputSignUp,signUpModalLastNameIsWrong: false,});
  }

  changeVerificationCode(event){
    var inputVerification={verificationCode : englishToPersianDigits(event.target.value),
    referralCode : this.state.inputForVerification.referralCode
  };
    this.setState({inputForVerification : inputVerification});
  }

  changeReferralCode (event) {
    var inputVerification = {
      verificationCode: this.state.inputForVerification.verificationCode,
      referralCode : event.target.value.toUpperCase()
    }
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
                             verificationCode:englishToPersianDigits(event.target.value),}
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
            <p className="enter-phone-number-inmodal">رمز عبور خود را وارد کنید </p>
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
                <Fade bottom={true} collapse={false} when={this.state.passIsNotCorrect}>
                  <p className="log-in-false-pass-visible">
                    رمز عبور وارد شده اشتباه است
                  </p>
                </Fade>
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

  checkInputIsNumber(event){
    if (['0','1','2','3','4','5','6','7','8','9'].indexOf(event.key)===-1){
      if(event.key!=="Backspace" && event.key!=="Tab"){
        event.preventDefault();
      }
    }
  }
  handleForgetPassword(){
    var request = new Request(productionURL + 'auth/api/user/edit/forgot_password/', {
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
            <input maxLength={4} onKeyDown={(event)=>{this.checkInputIsNumber(event)}} onChange={(event)=>{this.changeVerificationCodeForChangePassword(event)}} value={this.state.inputForChangePassword.verificationCode} type="numeric" className="forget-password-modal-input"/>
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
          <Fade bottom={true} collapse={false} when={this.state.forgetPasswordInputHasError}>
            <div className="error-message-in-forget-password-modal">
              {this.state.forgetPasswordInputError}
            </div>
          </Fade>
          <div onClick={()=>{this.handleChangePasswordRequest()}} className="forge-password-change-password-button">
            {this.state.forgetPasswordLoading ? <ClipLoader color="white" /> : "تغییر رمز عبور"}
          </div>
        </div>
      </Modal>
    );
  }


  getResponseForChangePassword(){
    var request = new Request(productionURL + 'auth/api/user/edit/verify_forgot_password/', {
      method: 'POST',
      body: JSON.stringify({
        cell_phone : this.state.reqParamsForChangePassword.cellPhone,
        password : this.state.reqParamsForChangePassword.password,
        confirm_password : this.state.reqParamsForChangePassword.confirmPassword,
        verification_code :persianArabicToEnglishDigits(this.state.reqParamsForChangePassword.verificationCode)}),
      headers: new Headers({'Accept': 'application/json','Content-Type': 'application/json',
      'Authorization': 'Token '+this.state.token,})
    });
   fetch(request)
   .then((response) => {
     this.setState({forgetPasswordLoading:false});
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
  else{
    if(changePasswordResponse.errors.indexOf("verification_code is required.")!==-1) {
      this.setState({forgetPasswordInputHasError:true , forgetPasswordInputError:'کد تأیید وارد شده نادرست است'});
      return;
    }
    if(changePasswordResponse.errors.indexOf("This password is too short. It must contain at least 6 characters.")!==-1) {
      this.setState({forgetPasswordInputHasError:true , forgetPasswordInputError:'رمز عبور شما باید حداقل دارای شش کاراکتر باشد'});
      return;
    }
    if(changePasswordResponse.errors.indexOf("This password is entirely numeric.")!==-1) {
      this.setState({forgetPasswordInputHasError:true , forgetPasswordInputError:'کلمه عبور شما باید حداقل شامل یک حرف باشد'});
      return;
    }
    if(changePasswordResponse.errors.indexOf("The password is too similar to the username.")!==-1) {
      this.setState({forgetPasswordInputHasError:true , forgetPasswordInputError:'کلمه عبور شما مشابه دیگر اطلاعات کاربری شماست'});
      return;
    }
    if(changePasswordResponse.errors.indexOf("This password is too common.")!==-1) {
      this.setState({forgetPasswordInputHasError:true , forgetPasswordInputError:'رمز عبور انتخاب شده معتبر نیست'});
      return;
    }
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
