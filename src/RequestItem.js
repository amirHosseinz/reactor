import React from 'react';
import { Divider,Button } from 'semantic-ui-react';
import {englishToPersianDigits} from './tools/EnglishToPersianDigits';
import moment from 'moment-jalaali';
import {Modal} from 'react-bootstrap';


moment.loadPersian({usePersianDigits:true , dialect:'persian-modern'});
class RequestItem extends React.Component{
  constructor(props){
    super(props);
    this.state= {
      request:null,
      showPreBill:false,
      requestStatus:null,
      token:null
    };
  }
  componentWillReceiveProps(nextProps){
    this.setState({
      request:nextProps.requestDetail,requestStatus:nextProps.requestDetail.status,
    });
  }
  getRelevantToken(){
    return localStorage['token'];
  }
  getRequestStatus(){
        switch (this.state.requestStatus){
          case "WAIT_FOR_HOST":
            return 'در انتظار تایید میزبان';
          case "GUEST_CANCELED":
            return null;
          case "HOST_REJECTED":
            return 'رد شده توسط مهمان';
          case "WAIT_FOR_GUEST_PAY":
            return 'در انتظار پرداخت مهمان';
          case "HOST_ACCEPTED_GUEST_CANCELED":
            return 'لغو شده توسط مهمان';
          case "HOST_ACCEPTED_GUEST_PAYED":
            return 'پرداخت شده توسط مهمان';
          case "HOST_ACCEPTED_HOST_CANCELED":
            return 'لغو شده توسط میزبان';
          default:
            return null;
        }
  }
  getRelevantButton(){
    switch (this.state.requestStatus){
      case "WAIT_FOR_HOST":
        return null
      case "HOST_REJECTED":
        return (<div></div>);
      case "WAIT_FOR_GUEST_PAY":
        return(
          <div>
            <Button className="request-userpanel-button" onClick={()=>{console.log('open modal');this.setState({showPreBill:true})}}>پرداخت</Button>
          </div>
        );
      case "HOST_ACCEPTED_GUEST_PAYED":
        return (<div></div>);
      case "HOST_ACCEPTED_HOST_CANCELED":
        return (<div></div>);
      default:
        return null;
    }
  }
  renderDifferentTypesPrices(){
    if(true){
      return(
        <div>
          <p></p>
          <p></p>
          <p></p>
        </div>
      );
    }
    else{
      <div>

      </div>
    }
  }
  renderPreBill(){
    console.log(this.state.request);
    if(this.state.request!==null){
      return(
        <Modal show={this.state.showPreBill}
          onHide={()=>{this.setState({showPreBill:false})}}>
          <div className="pre-bill-main-division">
            <div className="pre-bill-header-section">
              <p>
                جزئیات رزرو اقامتگاه
              </p>
            </div>
            <hr />
            <div className="pre-bill-house-details">
              <div className="pre-bill-house-title">
                <p> {this.state.request.room.title}</p>
              </div>
              <div className="pre-bill-house-address">
                <p>{this.state.request.room.city}/{this.state.request.room.district}</p>
              </div>
              <div className="pre-bill-house-picture">
                  <img src={"https://www.trypinn.com"+this.state.request.room.preview} alt=""height="80px"/>
              </div>
            </div>
            <hr/>
            <div className="pre-bill-number-of-guests">
              <div className="pre-bill-number-of-guests-sentence">
              <p> تعداد مسافر:</p>
              </div>
              <div className="pre-bill-number-of-guests-content">
                <p>{this.state.request.number_of_guests} نفر</p>
              </div>
            </div>
            <hr/>
            <div className="pre-bill-dates">
              <div className="pre-bill-dates-sentence">
                <p>تاریخ ورود و خروج:</p>
              </div>
              <div className="pre-bill-dates-content">
                <p>از{englishToPersianDigits(moment(this.state.request.start_date,'jYYYY/jM/jD').format('jYYYY/jM/jD'))}</p>
                <p>تا{englishToPersianDigits(moment(this.state.request.end_date,'jYYYY/jM/jD').format('jYYYY/jM/jD'))}</p>
                <p> روز اقامت{this.state.request.duration}</p>
              </div>
            </div>
            <hr/>
            <div className="pre-bill-price-section">
              {this.renderDifferentTypesPrices()}
            </div>
            <div className="pre-bill-discount-section">
              <input />
              <div className="pre-bill-discount-sentence">
              </div>
            </div>
            <hr/>
            <div className="pre-bill-adding-up">
              <div className="pre-bill-price">

              </div>
              <div className="pre-bill-payment-button">
                <Button onClick={this.setTokenForPayment.bind(this)}> پرداخت نهایی</Button>
              </div>
            </div>
          </div>
        </Modal>
      );
    }
  }
  setTokenForPayment(){
    this.setState({token:this.getRelevantToken()},()=>{this.sendPaymentRequestToServer()});
  }
  sendPaymentRequestToServer(){
    var request = new Request('https://www.trypinn.com/api/payment/web_payment_request/',{
      method: 'POST',
      body: JSON.stringify({
        request_id: this.state.request.id,
        mobile: null,
        email: null,
    }),
      headers: new Headers({'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Token '+this.state.token,})
    });
   fetch(request)
   .then((response) => {
     return response.json();
   })
   .then((paymentResponse) => {
     if (paymentResponse.is_successful===true){
       localStorage['default-panel']='trip';
       window.location.href = paymentResponse.payment_url;
     }
   });
  }
  getRequestStatusDiscription(){
    switch (this.state.requestStatus){
      case "WAIT_FOR_HOST":
        return <span>
        درخواست شما در انتظار تأیید میزبان است و پس از تأیید میزبان،
        می توانید هزینه را پرداخت کنید و رزرو خود را نهایی کنید
        </span>
      case "GUEST_CANCELED":
        return <span>
        </span>;
      case "HOST_REJECTED":
        return <span>
          متاسفانه درخواست شما توسط میزبان مورد تأیید قرار نگرفت
        </span>;
      case "WAIT_FOR_GUEST_PAY":
        return <span>
        درخواست شما تایید شده است، با پرداخت هزینه رزرو خود را
        نهایی کنید. در صورت لغو توسط شما و یا میزبان بعد از پرداخت
        هزینه، قوانین لغو اعمال می شود.
        </span>;
      case "HOST_ACCEPTED_GUEST_CANCELED":
        return <span>
        این درخواست توسط مهمان قبل از
        پرداخت هزینه لغو شد.
        </span>;
      case "HOST_ACCEPTED_GUEST_PAYED":
        return <span>
        این رزرو نهایی شده است،
برای مشاهده‌ی جزئیات آن به بخش
سفرها
مراجعه کنید.

        </span>;
      case "HOST_ACCEPTED_HOST_CANCELED":
        return <span>
        متاسفانه درخواست شما
توسط میزبان
مورد تایید قرار نگرفت.
        </span>;
      default:
        return null;
    }
}
renderCancelButton(){
  if(this.state.requestStatus!=="GUEST_CANCELED"){
   return (<Button className="request-userpanel-button" onClick={this.setTokenForDelete.bind(this)}> لغو درخواست </Button>);
  }
}
renderDeleteButton(){
  if(this.state.requestStatus!=="HOST_ACCEPTED_GUEST_CANCELED"){
   return (<div></div>);
  }
}
  renderRequestDetail(){
    if (this.state.request!=null && this.state.requestStatus!=null){
      return (
        <div className="request-header">
        <div className='request-status'>
          <p className="reserve-status-h1"> :وضعیت درخواست رزرو </p>
          <p className="reserve-status-h2"> {this.getRequestStatus()} </p>
          <p className="reserve-status-descriptions">{this.getRequestStatusDiscription()} </p>
        </div>
        <div className="request-detail-userpanel">
          <Divider/>
          <div className='house-preview-linked-to-house-detail' dir="rtl">
            <p> نام اقامتگاه : <a style={{color:'#12b2ce'}} href={"/rooms/"+ this.state.request.room.id} target="_blank">{this.state.request.room.title}</a> </p>
            <p>شهر مقصد: {this.state.request.room.city}  </p>
            <p> به میزبانی  {this.state.request.room.owner.first_name} {this.state.request.room.owner.last_name}</p>
            <p> رزرو کننده: {this.state.request.guest_person.last_name} </p>
            <p>تعداد میهمان: {englishToPersianDigits(this.state.request.number_of_guests)} </p>
            <p>تاریخ ورود: {englishToPersianDigits(moment(this.state.request.start_date,'jYYYY/jM/jD').format('jYYYY/jM/jD'))}</p>
            <p>تاریخ خروج:{englishToPersianDigits(moment(this.state.request.end_date,'jYYYY/jM/jD').format('jYYYY/jM/jD'))} </p>
          </div>
          <div className='request-details'>
          </div>
          <Divider/>
          <div className='final-details'>
            <p>جمع هزینه ها: {englishToPersianDigits(this.state.request.total_price)} </p>
          </div>
        </div>

        <div className='relevant-button'>
          {this.renderCancelButton()}
          {this.renderDeleteButton()}
          {this.getRelevantButton()}
        </div>
        </div>
      );
    }
  }
  setTokenForCancel(){
    this.setState({token:this.getRelevantToken()},()=>{this.handleCancelClick()});
  }
  setTokenForDelete(){
    this.setState({token:this.getRelevantToken()},()=>{this.handleDeleteClick()});
  }
  handleCancelClick(){
    if(this.state.request!=null){
    var request = new Request('https://www.trypinn.com/api/request/cancel/',{
      method: 'POST',
      body: JSON.stringify({
      request_id:this.state.request.id,
      role:'guest'
    }),
      headers: new Headers({'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Authorization': 'Token '+this.state.token,})
    });
   fetch(request)
   .then((response) => {
     return response.json();
   })
   .then((request_status) => {
  });
}
  }
  handleDeleteClick(){
    var request = new Request('https://www.trypinn.com/api/request/archive/',{
      method: 'POST',
      body: JSON.stringify({
      request_id:this.state.request.id,
      role:'guest'
    }),
      headers: new Headers({'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Authorization': 'Token ' +this.state.token,})
    });
   fetch(request)
   .then((response) => {
     return response.json();
   })
   .then((request_status) => {
  });
  }

  render(){
    return(
      <div>
        {this.renderPreBill()}
        {this.renderRequestDetail()}
      </div>
    );
  }
}

export default RequestItem;
