import React from 'react';
import {englishToPersianDigits} from '../tools/EnglishToPersianDigits.js';
import {parsePrice3digits} from '../tools/ParsePrice3digits.js';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import {productionURL} from '../Data.js';


class InviteFriendXl extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      referralCode : "",
      numberOfInstalls : "",
      numberOfTrips : "",
      GiftCredit : "",
      copyMessage:"کپی لینک",
      shared : false,
    }
  }

  componentWillMount(){
    this.getFinanceAccountFromServer()
  }

  getFinanceAccountFromServer(){
    var request = new Request(productionURL + 'finance/api/get_finance_account/',{
      method: 'POST',
      headers: new Headers({'Accept': 'application/json','Content-Type': 'application/json',
      'Authorization': 'Token '+localStorage['token'],})
    });
   fetch(request)
   .then((response) => {
     return response.json();
   })
   .then((response) => {
     this.setState({numberOfTrips:response.number_of_referring_reserved,
                    numberOfInstalls:response.number_of_referring_installed,
                    GiftCredit:response.gift_credit,referralCode:response.referral_code})
   });
  }

  incrementNumberOfSharing(){
    if (this.state.shared===false){
      var request = new Request(productionURL + 'finance/api/share_referral_link/',{
        method: 'POST',
        headers: new Headers({'Accept': 'application/json','Content-Type': 'application/json',
        'Authorization': 'Token '+localStorage['token'],})
      });
     fetch(request)
     .then((response) => {
       return response.json();
     })
     .then((response) => {
       this.setState({shared:true});
     });
    }
  }

  render(){
    return (
      <div className="invite-friend-main-division">
        <div className="invite-friend-content">
          <p className="invite-friend-title">
            اعتبار رایگان تریپین
          </p>
          <p className="invite-friend-description">
            با معرفی تریپین به دوستان خود، به ازای هر سفر آنها، ۵۰ هزار تومان اعتبار هدیه به شما و ۵۰ هزار تومان تخفیف به دوستانتان تعلق خواهد گرفت
          </p>
          <div className="invite-friend-main-link-box">
            <p className="referral-title">
              لینک اختصاصی شما
            </p>
            <div className="referral-link-share">
              <div className="referral-link-box">
                <div className="referral-link">
                  <p className="referral-link-description">
                    {"www.tripinn.ir/users/" + this.state.referralCode}
                  </p>
                </div>
                <div className="referral-box-vertical-line">
                </div>
                <CopyToClipboard text={"http://www.tripinn.ir/users/" + this.state.referralCode}>
                  <div onClick={()=>{this.setState({copyMessage:"کپی شد"},()=>{this.incrementNumberOfSharing()})}} className="copy-button">
                    {this.state.copyMessage}
                  </div>
                </CopyToClipboard>
              </div>
              <a href={"https://telegram.me/share/url?url=http://www.tripinn.ir/users/" + this.state.referralCode}>
                <button onClick={()=>{this.setState({shared:false},()=>{this.incrementNumberOfSharing()})}} className="referral-share-button-telegram">
                  <img src={require('./telegram.svg')} className="referral-box-image"/>
                  <div className="referral-share-button-vertical-line">
                  </div>
                  <p className="referral-share-button-text">
                   تلگرام
                  </p>
                </button>
              </a>
              <a href={"https://twitter.com/intent/tweet?url=http://www.tripinn.ir/users/" + this.state.referralCode}>
                <button onClick={()=>{this.setState({shared:false},()=>{this.incrementNumberOfSharing()})}} className="referral-share-button-twitter">
                  <img src={require('./twitter.svg')} className="referral-box-image"/>
                  <div className="referral-share-button-vertical-line">
                  </div>
                  <p className="referral-share-button-text">
                  توییتر
                  </p>
                </button>
              </a>
            </div>
            <p className="referral-code">
             کد معرف :‌ {this.state.referralCode.toUpperCase()}
            </p>
            <p className="referral-code-explanation">
             در صورت عدم امکان استفاده دوستانتان از لینک دعوت، میتوانند کد بالا را هنگام ثبت‌نام در تریپین وارد کنند
            </p>
            <p className="referral-code-description">
            </p>
          </div>
          <div className="share-info-section">
            <div className="number-of-installs">
              <p className="share-info-description"> تعداد دوستان ثبت‌نام کرده</p>
              <p className="share-info-value"> {englishToPersianDigits(this.state.numberOfInstalls)} </p>
            </div>
            <div className="number-of-trips">
              <p className="share-info-description">تعداد دوستان سفر رفته</p>
              <p className="share-info-value"> {englishToPersianDigits(this.state.numberOfTrips)} </p>
            </div>
            <div className="total-gift">
              <p className="share-info-description">مجموع هدایای دریافتی شما</p>
              <p className="share-info-value"> {englishToPersianDigits(parsePrice3digits(this.state.GiftCredit))} تومان</p>
            </div>
          </div>
          <div className="invite-friend-background">
            <img src={require('./invite_to_tripinn.png')} className="invite-friend-image"/>
          </div>
        </div>

      </div>
    );
  }
}

export default InviteFriendXl;
