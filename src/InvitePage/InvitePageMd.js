import React from 'react';
import {englishToPersianDigits,persianArabicToEnglishDigits} from '../tools/EnglishToPersianDigits.js';
import ReCAPTCHA from 'react-google-recaptcha';
import {productionURL} from '../Data.js';
import Fade from 'react-reveal';


// window.recaptchaOptions = {
//   lang: 'fr'
// }

class InvitePageMd extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      referrer : "عرفان کٌرکی",
      referralCode : "",
      cellPhone : "",
      recaptchaSolved : true,
      continueActive : false,
      error : "لطفا عبارت من روبات نیستم را تأیید کنید",
    }
  }

  componentWillMount(){
    this.setState({
      referralCode:window.location.pathname.split('/')[window.location.pathname.split('/').length-1]
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
          cell_phone : persianArabicToEnglishDigits(this.state.cellPhone),
          referral_code : this.state.referralCode,
      }),
        headers: new Headers({'Accept': 'application/json','Content-Type': 'application/json',
        'Authorization': 'Token '+this.state.token,})
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
      cellPhone : englishToPersianDigits(event.target.value),
    });
  }
  renderInvitePageMd(){
    return(
      <div className="invite-page-main-division">
        <div className="invite-page-main-box">
          <p className="invite-page-title">
            پنجاه هزار تومان اعتبار هدیه
          </p>
          <p className="invite-page-description">
              دوست شما {" " + this.state.referrer +  " "}
              به تریپین دعوتتان کرده است. شما با تریپین می‌توانید در جاهای مختلف ایران ویلا و اقامتگاه‌های
              محلی زیبا و مقرون به صرفه رزرو کنید.
          </p>
          <div className="referral-section">
            <input maxLength={11} value={this.state.cellPhone}
            onChange={(event)=>{this.changePhoneNumber(event)}}
            dir="rtl"
            placeHolder="شماره تلفن خود را وارد کنید..."
            autoFocus={true}
            className="phone-number-input"/>
            <div className="invite-referral-code">
              کد معرف‌:‌ {this.state.referralCode.toUpperCase()}
            </div>
          </div>
          <ReCAPTCHA
            ref="recaptcha"
            theme="light"
            sitekey="6Ld2gFgUAAAAAFkPQ1K56hAvBvmIdJL0-5Vc8ApT"
            onChange={()=>{this.setState({recaptchaSolved:true,continueActive:true})}}/>
          <div className="referral-important-points">
            <div className="referral-point">
              <div className="empty-circle">
              </div>
              <p className="point-text">
                در هنگام ثبت‌نام در وبسایت یا اپلیکیشن برای فعالسازی حساب کاربری
                همین شماره موبایلی را وارد کنید که اکنون وارد نموده‌اید
              </p>
            </div>
            <div className="referral-point">
              <div className="empty-circle">
              </div>
              <p className="point-text">
                این مبلغ به عنوان اعتبار هدیه در حساب کاربری شما ذخیره خواهدشد وشما
                میتوانید تا یکسال پس از ثبت نام از این هدیه استفاده کنید
              </p>
            </div>
            <div className="referral-point">
              <div className="empty-circle">
              </div>
              <p className="point-text">
                شما در صورتی میتوانید از این هدیه بهره‌مند شوید که تابحال در تریپین
                ثبت‌نام نکرده باشید
              </p>
            </div>
          </div>
          <button onClick={()=> {this.setState({error:""},()=>{this.registerReferralCode()})}} className="referral-register-button">
            ادامه
          </button>
          <Fade bottom={true} collapse={true} when={!this.state.recaptchaSolved}>
            <p className="recaptcha-error"> {this.state.error}</p>
          </Fade>
          <div className="invite-page-image-container">
            <img src={require("./invite-friend.png")}  className="invite-page-image"/>
          </div>
        </div>
      </div>
    );
  }
  render(){
    return (
      <div>
        {this.renderInvitePageMd()}
      </div>
    );
  }
}

export default InvitePageMd;
