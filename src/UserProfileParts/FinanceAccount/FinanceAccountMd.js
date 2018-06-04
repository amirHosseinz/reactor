import React from 'react';
import {parsePrice3digits} from '../../tools/ParsePrice3digits.js';
import {englishToPersianDigits} from '../../tools/EnglishToPersianDigits.js';
import {productionURL} from '../../Data.js';
import ScrollArea from 'react-scrollbar';
import moment from 'moment-jalaali';


class FinanceAccountMd extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      selectedTab : "wallet",
      credit : 0,
      giftCredit : 0,
      transactionList : [],
    }
  }

  componentWillMount(){
    this.getFinanceAccountDataFromServer();
  }

  getFinanceAccountDataFromServer() {
    var request = new Request(productionURL + 'finance/api/get_finance_account/',{ //
      method: 'POST',
      headers: new Headers({'Accept': 'application/json','Content-Type': 'application/json',
      'Authorization': 'Token '+localStorage['token'],})
    });
   fetch(request)
   .then((response) => {
     return response.json();
   })
   .then((response) => {
     this.setState({credit:response.credit, giftCredit:response.gift_credit});
   })
   .catch((error)=> {
      });
  }

  getTransactionsFromServer(){
    var request = new Request(productionURL + 'finance/api/get_transactions_list/',{ //
      method: 'POST',
      headers: new Headers({'Accept': 'application/json','Content-Type': 'application/json',
      'Authorization': 'Token '+localStorage['token'],})
    });
   fetch(request)
   .then((response) => {
     return response.json();
   })
   .then((response) => {
     console.log(response);
     this.setState({transactionList:response.transaction_list});
   })
   .catch((error)=> {
      });
  }
  renderTabList(){
    return (
      <div className="finance-account-tab-list">
        <div onClick={()=>{this.setState({selectedTab:"wallet"},()=>{this.getFinanceAccountDataFromServer()})}} className="finance-account-tab-list-item">
          <p className={this.state.selectedTab=="wallet"? "finance-account-tab-list-text-selected":"finance-account-tab-list-text"}>
            وضعیت کیف پول
          </p>
        </div>
        <div onClick={()=>{this.setState({selectedTab:"transaction"},()=>{this.getTransactionsFromServer()})}} className="finance-account-tab-list-item">
          <p className={this.state.selectedTab=="transaction"? "finance-account-tab-list-text-selected":"finance-account-tab-list-text"}>
            تراکنش‌ها
          </p>
        </div>
      </div>
    );
  }

  renderSelectedTab(){
    switch (this.state.selectedTab){
      case "wallet":{
        return(
          this.renderWallet()
        );
      }
      case "transaction":{
        return (
          this.renderTransactions()
        );
      }
    }
  }

  renderWallet(){
    return(
      <div className="finance-account-wallet">
        <div className="finance-account-wallet-header-section">
          <p className="finance-account-wallet-header-description"> مجموع اعتبار قابل استفاده در تریپین</p>
          <p className="finance-account-wallet-header-value">
            {this.state.credit + this.state.giftCredit===0 ?
              "صفر تومان"
               :
              englishToPersianDigits(parsePrice3digits(this.state.credit + this.state.giftCredit))+ " تومان "
            }
          </p>
          <hr className="finance-account-walltet-divider"/>
        </div>
        <div className="finance-account-wallet-details">
          <div className="finance-account-credit">
            <img src={require('./coin_icon.svg')} className="finance-account-wallet-icon"/>
            <p className="finance-account-credit-description">
              {this.state.credit===0?
                 "صفر تومان"
                :
                englishToPersianDigits(parsePrice3digits(this.state.credit)) + " تومان "
              }
            </p>
            <p className="finance-account-credit-description">
              موجودی حساب
            </p>



          </div>
          <img src={require('./PlusSign.svg')} className="finance-account-plus-sign"/>
          <div className="finance-account-credit">
            <img src={require('./gift_icon.svg')} className="finance-account-wallet-icon"/>
            <p className="finance-account-credit-description">
              {this.state.giftCredit===0?
                 "صفر تومان"
                :
                englishToPersianDigits(parsePrice3digits(this.state.giftCredit)) + " تومان "
              }
            </p>
            <p className="finance-account-credit-description">
                اعتبار هدیه
            </p>



          </div>
        </div>
      </div>
    );
  }



  // <p className="finance-account-details-description">
  //   با افزایش موجودی در حساب تریپینی با سرعت بیشتری رزرو کنید
  // </p>


  // <p className="finance-account-details-description">
  //   با معرفی تریپین به دوستانتان اعتبار هدیه دریافت کنید و با آن به سفر بروید
  // </p>
  // <a target="_blank" href={"/user/invitefriend"}>
  //   <button className="finance-account-get-gift-credit-button">
  //     <p className="finance-account-credit-button-content"> دریافت هدیه</p>
  //   </button>
  // </a>

  // <button className="finance-account-charge-credit-button">
  //   <p className="finance-account-credit-button-content">افزایش اعتبار</p>
  // </button>

  renderTransactions(){
    return (
      <div className="finance-account-transactions">
        <div className="finance-account-transactions-title-menu">
          <div className="finance-account-transaction-value-description">
            <p className="finance-account-transactions-title">
            مبلغ (تومان)
            </p>
            <p className="finance-account-transactions-title">
              توضیحات
            </p>
          </div>
          <div className="finance-account-transaction-date-time">
            <p className="finance-account-transactions-title">
            تاریخ
            </p>
            <p className="finance-account-transactions-title">
            ساعت
            </p>
          </div>
        </div>
        <hr className="finance-account-transactions-divider"/>
        {this.renderTransactionList()}
      </div>
    );
  }

  chooseSign(){
    return (
      'erfan'
    );
  }

  renderDescription(transaction){
    if(transaction.transaction_type==="DEPOSIT"){
      return <span dir="rtl"> برداشت از حساب </span>
    }
    if(transaction.transaction_type==="REFUND"){
      return <span dir="rtl">بازگشت وجه </span>
    }
    if(transaction.transaction_type==="CHARGE"){
      return <span dir="rtl">افزایش اعتبار از طریق درگاه بانکی  </span>
    }
    if(transaction.transaction_type==="EARNEST"){
      if (transaction.earnest_description.room!==null) {
        var reserve = transaction.earnest_description.room.title
      }
      else if (transaction.earnest_description.ecotourism!==null) {
        var reserve = transaction.earnest_description.ecotourism.title
      }
      return (
        <span dir="rtl"> پیش‌پرداخت برای رزرو {reserve}</span>
      );
    }
    if(transaction.transaction_type==="EARNING"){
      if (transaction.earning_description.room!==null) {
        var reserve = transaction.earning_description.room.title
      }
      else if (transaction.earning_description.ecotourism!==null) {
        var reserve = transaction.earning_description.ecotourism.title
      }
      return (
        <span dir="rtl"> پیش‌پرداخت برای رزرو {reserve}</span>
      );
    }
    if(transaction.transaction_type==="TRAVEL"){
      if (transaction.travel_description.reserved_room!==null) {
        var reserve = transaction.travel_description.reserved_room.title
      }
      else if (transaction.travel_description.reserved_ecotourism!==null) {
        var reserve = transaction.travel_description.reserved_ecotourism.title
      }
      return (
        <span dir="rtl"> رزرو {reserve}</span>
      );
    }
    if(transaction.transaction_type==="GIFT"){
      if(transaction.gift_description.reason==="FIRST_TRIP"){
        var referred_person = transaction.gift_description.referred_person.first_name + " " +
                              transaction.gift_description.referred_person.last_name
        return  <span dir="rtl">   اولین سفر {referred_person} </span>
      }
      if(transaction.gift_description.reason==="SIGN_UP_WITH_REFERRAL") {
          return  <span dir="rtl">  اعتبار هدیه اولیه تریپین </span>
      }
    }

  }
  renderTransactionList(){
    var transactionList = this.state.transactionList.map((transaction) => {
      return (
        <div>
          <div className="transaction-item">
            <div className="transaction-description-value">
              <img src={require('./PlusSign.svg')} className="transaction-sign"/>
              <p className="transaction-value">
                {englishToPersianDigits(transaction.value + transaction.gift_value)}
              </p>
              <p className="transaction-description">
                {this.renderDescription(transaction)}
              </p>
            </div>
            <div className="transaction-date-time">
              <p className="transaction-date">
                {englishToPersianDigits(moment(transaction.date_time).format('jYYYY/jM/jD'))}
              </p>
              <p className="transaction-time">
                {englishToPersianDigits(moment(transaction.date_time).format('HH:MM'))}
              </p>
            </div>
          </div>
          <hr className="transaction-divider"/>
        </div>
      );
    });
    return(
      <ScrollArea className="transaction-scroll-list" smoothScrolling={false} stopScrollPropagation={true} speed={1} horizontal={false}>
        {transactionList}
      </ScrollArea>
    );
  }
  render(){
    return(
      <div className="finance-account-main-division">
        {this.renderTabList()}
        <hr className="finance-account-divider"/>
        {this.renderSelectedTab()}
      </div>
    );
  }
}

export default FinanceAccountMd;
