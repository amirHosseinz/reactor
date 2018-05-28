import React from 'react';
import {englishToPersianDigits} from '../tools/EnglishToPersianDigits.js';

class InviteSuccessXl extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      cellPhone : this.readCellPhoneFromURL(),
    }
  }

  readCellPhoneFromURL(){
    return(
      window.location.pathname.split('/')[window.location.pathname.split('/').length-1]
    );
  }
  
  renderInviteSuccessXl(){
    return(
      <div className="invite-success-main-division">
        <div className="invite-success-main-box">
          <p className="invite-success-title">
            تبریک!
          </p>
          <p className="invite-success-description">
            هدیه {englishToPersianDigits(" 50 ")} هزار تومانی برای شماره
          {englishToPersianDigits(" " +this.state.cellPhone +" ")}
             ثبت شد
          </p>
          <p className="invite-success-description">
            اکنون می‌توانید با همین شماره در اپلیکیشن یا وبسایت تریپین ثبت‌نام نمایید
          </p>
          <p className="invite-page-download-app-title">
            دریافت اپلیکیشن تریپین
          </p>
          <div className="invite-page-download-platform">
            <p className="invite-page-download-platform-title">
              نسخه اندروید
            </p>
            <div className="invite-page-download-app-section">
              <a rel="noopener noreferrer" target="_blank" href='https://myket.ir/app/com.trypinn'>
                <img src={require('./myket.png')} className="download-app-button-myket"/>
              </a>
              <a rel="noopener noreferrer"target="_blank" href='http://cafebazaar.ir/app/com.trypinn/'>
                <img src={require('./bazaar.png')} className="download-app-button-bazaar"/>
              </a>
              <a rel="noopener noreferrer"target="_blank" href='https://play.google.com/store/apps/details?id=com.trypinn&hl=en'>
                <img src={require('./googleplay.png')} className="download-app-button-gplay"/>
              </a>
            </div>
          </div>
          <div className="invite-page-download-platform">
            <p className="invite-page-download-platform-title">
                نسخه iOS
            </p>
            <div className="invite-page-download-app-section">
            <a rel="noopener noreferrer"target="_blank" href='http://new.sibapp.com/applications/tripinn'>
              <img src={require('./sibapp.png')} className="download-app-button-sibapp"/>
            </a>
            </div>
          </div>
          <hr className="invite-success-divider"/>
          <a href="http://www.tripinn.ir">
          <button className="web-enter-button">
            ورود به وبسایت تریپین
          </button>
          </a>
        </div>
        <div className="invite-success-image-container">
          <img src={require('./mobile.png')} className="invite-success-image"/>
        </div>
      </div>
    );
  }

  render(){
    return(
      <div>
        {this.renderInviteSuccessXl()}
      </div>
    );
  }
}

export default InviteSuccessXl;
