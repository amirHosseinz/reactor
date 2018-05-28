import React from 'react';
import {englishToPersianDigits,persianArabicToEnglishDigits} from '../tools/EnglishToPersianDigits.js';
import ReCAPTCHA from 'react-google-recaptcha';
import {productionURL} from '../Data.js';
import Fade from 'react-reveal';


class InvitePageXs extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      referrer : "",
      referralCode : "",
      cellPhone : "",
      recaptchaSolved : true,
      continueActive : false,
      error : "لطفا عبارت من روبات نیستم را تأیید کنید",
    }
  }

  componentWillMount() {
    this.setState({
      referralCode:window.location.pathname.split('/')[window.location.pathname.split('/').length-1]
    },()=>{this.getReferrerFromServer()});
  }

  getReferrerFromServer(){ 
    var request = new Request(productionURL + 'finance/api/get_referrer/',{
      method: 'POST',
      body: JSON.stringify({
        referral_code : this.state.referralCode,
    }),
      headers: new Headers({'Accept': 'application/json','Content-Type': 'application/json',
      'Authorization': 'Token '+localStorage['token']})
    });
   fetch(request)
   .then((response) => {
     return response.json();
   })
   .then((response) => {
     // console.log(response);
     if(response.successful===true){
       this.setState({referrer : response.first_name + " " + response.last_name});
     }
     else{
       window.location = "/";
     }
   });
  }

  registerReferralCode(){
    if(this.state.continueActive ===true){
      if(this.state.cellPhone===""){
        this.setState({error:'لطفا شماره تلفن خود را وارد کنید',recaptchaSolved:false});
        return;
      }
      var request = new Request(productionURL + 'finance/api/use_referral_link/',{
        method: 'POST',
        body: JSON.stringify({
          cell_phone : this.state.cellPhone,
          referral_code : this.state.referralCode,
      }),
        headers: new Headers({'Accept': 'application/json','Content-Type': 'application/json',
        'Authorization': 'Token '+localStorage['token']})
      });
     fetch(request)
     .then((response) => {
       return response.json();
     })
     .then((response) => {
       if(response.successful===true){
         window.location = "/register/success/" + persianArabicToEnglishDigits(this.state.cellPhone);
       }
       else {
         if(response.errors[0]==="invalid cell phone"){
           this.setState({recaptchaSolved:false,error:"شماره تلفن وارد شده اشتباه است"})
         }
         if(response.errors[0]==="you have already signed up"){
           this.setState({recaptchaSolved:false,error:"شما قبلا در تریپین ثبت‌نام کرده‌اید"})
         }
         if(response.errors[0]==="your referral code is not valid"){
           this.setState({recaptchaSolved:false,error:"کد معرف استفاده شده اشتباه است"})
         }
       }
     });
    }
    else {
      this.setState({recaptchaSolved:false,error:"لطفا عبارت من ربات نیستم را تأیید کنید"});
    }
  }

  changePhoneNumber(event){
    this.setState({
      cellPhone : event.target.value,
    });
  }

  renderInvitePageXs(){
    return(
      <div className="invite-page-main-division-xs">
        <div className="invite-page-image-container-xs">
          <img src={require("./invite-xs.png")} className="invite-page-image-xs"/>
        </div>
        <p className="invite-page-title-xs">
          پنجاه هزار تومان اعتبار هدیه
        </p>
        <p className="invite-page-description-xs">
          دوست شما {" " + this.state.referrer +  " "}
          به تریپین دعوتتان کرده است
        </p>
        <p className="invite-page-description-xs">
      شما با تریپین می‌توانید در جاهای مختلف ایران ویلا و اقامتگاه‌های
        محلی زیبا و مقرون به صرفه رزرو کنید.
        </p>
        <div className="enter-phone-number-section">
          <p className="phone-number-input-title-xs">
            ورود شماره تلفن
          </p>
        </div>
        <input type="number" autoFocus={true} maxLength={11} className="phone-number-input-xs" value={this.state.cellPhone} onChange={(event)=>{this.changePhoneNumber(event)}}/>
        <ReCAPTCHA
          className="Recaptcha-xs"
          ref="recaptcha"
          theme="light"
          sitekey="6Ld2gFgUAAAAAFkPQ1K56hAvBvmIdJL0-5Vc8ApT"
          onChange={()=>{this.setState({recaptchaSolved:true,continueActive:true})}}/>
        <button onClick={()=> {this.setState({error:""},()=>{this.registerReferralCode()})}}
          className="invite-page-button-xs">
          دریافت هدیه
        </button>
        <Fade bottom={true} collapse={true} when={!this.state.recaptchaSolved}>
          <p className="recaptcha-error"> {this.state.error}</p>
        </Fade>
        <div className="invite-page-point-section-xs">
          <div className="invite-page-point-xs">
            <p className="invite-page-point-text-xs">
            در هنگام ثبت‌نام در وبسایت یا اپلیکیشن برای فعالسازی حساب کاربری
            همین شماره موبایلی را وارد کنید که اکنون وارد نموده‌اید
            </p>
          </div>
          <div className="invite-page-point-xs">
            <p className="invite-page-point-text-xs">
            این مبلغ به عنوان اعتبار هدیه در حساب کاربری شما ذخیره خواهدشد وشما
            میتوانید تا یکسال پس از ثبت نام از این هدیه استفاده کنید
            </p>
          </div>
          <div className="invite-page-point-xs">
            <p className="invite-page-point-text-xs">
            شما در صورتی میتوانید از این هدیه بهره‌مند شوید که تابحال در تریپین
            ثبت‌نام نکرده باشید
            </p>
          </div>
        </div>
      </div>
    );
  }
  render(){
    return (
      <div>
        {this.renderInvitePageXs()}
      </div>
    );
  }
}

export default InvitePageXs;
