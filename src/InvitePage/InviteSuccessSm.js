import React from 'react';
import {englishToPersianDigits} from '../tools/EnglishToPersianDigits.js';


class InviteSuccessXs extends React.Component{
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

  renderInviteSuccessXs(){
    return(
      <div className="invite-success-main-division-xs">
        <div className="invite-success-top-division-xs">
          <p className="invite-success-top-division-title-xs">
            تبریک!
          </p>
          <p className="invite-success-gift-description-xs">
            هدیه ۵۰ هزار تومانی برای شماره {englishToPersianDigits(this.state.cellPhone)} ثبت شد
          </p>
          <p className="invite-success-description-xs">
            اکنون میتوانید با همین شماره در اپلیکیشن تریپین ثبت‌نام کنید
          </p>
        </div>
        <div className="invite-success-bottom-division-xs">
          <p className="invite-success-bottom-division-title-xs">
            دریافت اپلیکیشن
          </p>
          <p className="invite-success-description-xs">
          تریپین در هر دو سیستم عامل اندروید و iOS قابل استفاده است
          </p>
          <div className="download-app-button-section-xs">
            <a rel="noopener noreferrer" target="_blank" href='http://cafebazaar.ir/app/com.trypinn/' className="invite-success-anchor-xs">
              <img src={require('./bazaar.png')} className="invite-success-button-bazaar-xs"/>
            </a>
            <a rel="noopener noreferrer"target="_blank" href='https://play.google.com/store/apps/details?id=com.trypinn&hl=en' className="invite-success-anchor-xs">
              <img src={require('./googleplay.png')} className="invite-success-button-gplay-xs"/>
            </a>
            <a rel="noopener noreferrer" target="_blank" href='https://myket.ir/app/com.trypinn' className="invite-success-anchor-xs">
              <img src={require('./myket.png')} className="invite-success-button-myket-xs"/>
            </a>
            <a rel="noopener noreferrer"target="_blank" href='http://new.sibapp.com/applications/tripinn' className="invite-success-anchor-xs">
              <img src={require('./sibapp.png')} className="invite-success-button-sibapp-xs"/>
            </a>
          </div>
        </div>
      </div>
    );
  }

  render(){
    return(
      <div>
        {this.renderInviteSuccessXs()}
      </div>
    );
  }
}

export default InviteSuccessXs;
