import React from 'react';
import { Divider,Button } from 'semantic-ui-react';
import {englishToPersianDigits} from '../tools/EnglishToPersianDigits';
import moment from 'moment-jalaali';
// import {Modal} from 'react-bootstrap';
import Modal from 'react-modal';
import {setPasswordStyle} from '../Styles.js';
import {parsePrice3digits} from '../tools/ParsePrice3digits.js'

class RequestItemXl extends React.Component{
  constructor(props){
    super(props);
    this.state= {
      request:null,
      showPreBill:false,
      requestStatus:null,
      token:null,
      totalPrice:null,
    };
  }
  componentWillReceiveProps(nextProps){
    this.setState({
      request:nextProps.requestDetail,requestStatus:nextProps.requestDetail.status,
      totalPrice:nextProps.requestDetail.total_price,
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
            <Button className="request-userpanel-button" onClick={()=>{this.setState({showPreBill:true})}}>پرداخت</Button>
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
  renderOrdinaryPriceForPerPerson(){
    if(this.state.request.ordinary_price!==0){
      return(
        <div className="pre-bill-price-night-content row-reverse" dir="rtl">
          <p className="pre-bill-price-night-sentence">هزینه شب های عادی
            ({englishToPersianDigits(this.state.request.ordinary_duration)} شب - {englishToPersianDigits(this.state.request.number_of_guests)} نفر ) :
          </p>
          <p className="pre-bill-price-night-value">
           {englishToPersianDigits(parsePrice3digits(this.state.request.ordinary_price))}
             تومان
          </p>
        </div>
      );
    }
  }

  renderWeekendPriceForPerPerson(){
    if(this.state.request.weekend_price!==0){
      return(
        <div className="pre-bill-price-night-content row-reverse" dir="rtl">
          <p className="pre-bill-price-night-sentence">هزینه شب های آخر هفته
            ({englishToPersianDigits(this.state.request.weekend_duration)} شب - {englishToPersianDigits(this.state.request.number_of_guests)} نفر ) :
          </p>
          <p className="pre-bill-price-night-value">
             {englishToPersianDigits(parsePrice3digits(this.state.request.weekend_price))}
               تومان
          </p>
        </div>
      );
    }
  }
  renderSpecialPriceForPerPerson(){
    if(this.state.request.special_price!==0){
      return(
        <div className="pre-bill-price-night-content row-reverse" dir="rtl">
          <p className="pre-bill-price-night-sentence">هزینه شب های خاص
            ({englishToPersianDigits(this.state.request.special_duration)}شب - {englishToPersianDigits(this.state.request.number_of_guests)} نفر) :
          </p>
          <p className="pre-bill-price-night-value">
           {englishToPersianDigits(parsePrice3digits(this.state.request.special_price))}
             تومان
          </p>
        </div>
      );
    }
  }

  renderOrdinaryPriceForPerNight(){
    if(this.state.request.ordinary_price!==0){
      return(
        <div className="pre-bill-price-night-content row-reverse" dir="rtl">
          <p className="pre-bill-price-night-sentence">هزینه شب های عادی
             ( {englishToPersianDigits(this.state.request.ordinary_duration)} شب ) :
          </p>
          <p className="pre-bill-price-night-value">
             {englishToPersianDigits(this.state.request.ordinary_price)}
               تومان
          </p>
        </div>
      );
    }

  }
  renderWeekendPriceForPerNight(){
    if(this.state.request.weekend_price!==0){
      return(
        <div className="pre-bill-price-night-content row-reverse" dir="rtl">
          <p className="pre-bill-price-night-sentence">هزینه شب های آخر هفته
            (  {englishToPersianDigits(this.state.request.weekend_duration)} شب ) :
          </p>
          <p className="pre-bill-price-night-value">
           {englishToPersianDigits(parsePrice3digits(this.state.request.weekend_price))}
             تومان
          </p>
        </div>
      );
    }
  }
  renderSpecialPriceForPerNight(){
    if(this.state.request.special_price!==0){
      return(
        <div className="pre-bill-price-night-content row-reverse" dir="rtl">
          <p className="pre-bill-price-night-sentence">هزینه شب های خاص
          (  {englishToPersianDigits(this.state.request.special_duration)} شب ) :
          </p>
          <p className="pre-bill-price-night-value">
           {englishToPersianDigits(parsePrice3digits(this.state.request.special_price))}
             تومان
          </p>
        </div>
      );
    }
  }
  renderDifferentTypesPrices(){
    if(this.state.request.room.is_price_per_person===false){
      return(
        <div>
          {this.renderOrdinaryPriceForPerNight()}
          {this.renderWeekendPriceForPerNight()}
          {this.renderSpecialPriceForPerNight()}
        </div>
      );
    }
    else{
      return(
        <div>
          {this.renderOrdinaryPriceForPerPerson()}
          {this.renderWeekendPriceForPerPerson()}
          {this.renderSpecialPriceForPerPerson()}
        </div>
      );
    }
  }
  renderTotalPrice(){
    return(
      <div className="pre-bill-price-night-content row-reverse" dir="rtl">
      <p className="pre-bill-price-night-sentence"> جمع هزینه ها :
      </p>
      <p className="pre-bill-price-night-value"> {englishToPersianDigits(parsePrice3digits(this.state.totalPrice))}  تومان
      </p>
      </div>
    );
  }
  renderPreBill(){
    if(this.state.request!==null){
      if(this.state.requestStatus!=='no-house'){
        return(
          <Modal isOpen={this.state.showPreBill}
            onRequestClose={()=>{this.setState({showPreBill:false})}}>
            <div className="pre-bill-main-division">
              <div className="pre-bill-header-section">
                <p>
                  جزئیات رزرو اقامتگاه
                </p>
              </div>
              <div className="divider-modal"></div>
                <div className="pre-bill-margin-content">
                  <div className="pre-bill-house-details">
                    <div className="pre-bill-house-picture">
                        <img src={"https://www.trypinn.com"+this.state.request.room.preview} alt=""height="90px"/>
                    </div>
                    <div>
                      <div className="pre-bill-house-title">
                        <p> {this.state.request.room.title}</p>
                      </div>
                      <div className="pre-bill-house-address">
                        <p>{this.state.request.room.city}، {this.state.request.room.district}</p>
                      </div>
                    </div>
                  </div>
                  <div className="divider-modal-margined"></div>
                  <div className="pre-bill-number-of-guests">
                    <div className="pre-bill-number-of-guests-sentence">
                    <p>:تعداد مسافر</p>
                    </div>
                    <div className="pre-bill-number-of-guests-content" dir="rtl">
                      <span> {englishToPersianDigits(this.state.request.number_of_guests)}  </span>
                      <span> نفر </span>
                    </div>
                  </div>
                  <hr/>
                  <div className="pre-bill-dates">
                    <div className="pre-bill-dates-sentence">
                      <p>:تاریخ ورود و خروج</p>
                    </div>
                    <div className="pre-bill-dates-content">
                      <p className="pre-bill-date-item"> از {moment(this.state.request.start_date).format('jYYYY/jM/jD')}</p>
                      <p className="pre-bill-date-item" >تا {moment(this.state.request.end_date).format('jYYYY/jM/jD')}</p>
                      <div className="row-reverse">
                        <span className="pre-bill-date-item">  روز اقامت </span>
                        <span>  {englishToPersianDigits(this.state.request.duration)}  </span>
                      </div>

                    </div>
                  </div>
                  <hr/>
                  <div className="pre-bill-price-section">
                    {this.renderDifferentTypesPrices()}
                    {this.renderTotalPrice()}
                  </div>
              </div>
              <hr/>
              <div className="pre-bill-adding-up-section row-reverse" dir="rtl">
                  <p className="pre-bill-adding-up-sentence">
                    مبلغ قابل پرداخت :
                  </p>
                  <p className="pre-bill-adding-up-value">
                    {(englishToPersianDigits(parsePrice3digits(this.state.totalPrice)))} تومان
                  </p>
                  <div className="pre-bill-margin-optimizer-for-button">
                    <button type="button"className="btn pre-bill-payment-button" onClick={this.setTokenForPayment.bind(this)}> پرداخت نهایی
                    </button>
                  </div>

              </div>
            </div>
          </Modal>
        );
      }
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
    if (this.state.request!==null){
      if(this.state.requestStatus!=='no-house'){
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
              <p>تاریخ ورود: {englishToPersianDigits(moment(this.state.request.start_date).format('jYYYY/jM/jD'))}</p>
              <p>تاریخ خروج:{englishToPersianDigits(moment(this.state.request.end_date).format('jYYYY/jM/jD'))} </p>
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
      else{
        return(
        <div className='no-request-container'>
          <p className="no-request-header">شما درخواست رزروی ندارید</p>
          <p className="no-request-main-paragraph">شما تاکنون درخواست رزروی نداشته اید. میتوانید با جستجو میان شهرها و اقامتگاه های موجود، درخواست رزرو خود را ثبت نمایید. کافی است مراحل زیر را دنبال نمایید</p>
          <div className='no-request-stage1-container'>
            <div className='no-request-stage1-description col-md-6'>
              <div className='no-request-stage1-description-image'>
                <img src={require('../Images/no-req-pic1.png')} height="45" width="220"/>
                </div>
              <p className='no-request-stage1-description-text'>در صفحه جستجو شهر یا استان موردنظر خود را وارد کنید تا نتایج جستجو را مشاهده نمایید</p>
              </div>
            <div className='no-request-stage1-image col-md-5'>
              <img src={require('../Images/no-req-pic2.png')} height="180" width="220"/>
              </div>
            <div className='no-request-stage1-number col-md-1'>
              ۱
              </div>
            </div>
            <div className='no-request-stage2-container'>
              <div className='no-request-stage2-description col-md-10'>
                <div className='no-request-stage2-description-image'>
                  <img src={require('../Images/no-req-pic3.png')} height="150" width="500"/>
                 </div>
                <p className='no-request-stage2-description-text'>
                 با مقایسه نتایج و انتخاب هر نتیجه وارد صفحه جزئیات خانه خواهید شد و تمام امکانات و مشخصات آن را مشاهده خواهید کرد
                 </p>
                </div>
              <div className='no-request-stage2-number col-md-1'>
              ۲
               </div>
              </div>
          <div className='no-request-stage3-container'>
            <div className='no-request-stage3-image col-md-3'>
                  <img src={require('../Images/no-req-pic4.png')} height="180" width="160"/>
              </div>
            <div className='no-request-stage3-text col-md-8'>
             با انتخاب تعداد مهمان ها و تاریخ ورود و خروج هزینه نهایی رزرو خانه به شما نمایش داده خواهد شد. کافی است روی دکمه رزرو کلیک کنید تا درخواست شما ثبت شود
             </div>
            <div className='no-request-stage3-number col-md-1'>
            ۳
             </div>
            </div>
          <div className='no-request-stage4-container'>
            <div className='no-request-stage4-text col-md-7'>
             به محض ثبت درخواست، میزبان از درخواست شما مطلع خواهد شد. شما نیز بوسیله این صفحه از وضعیت درخواست خود مطلع خواهید شد
             </div>
             <div className='no-request-stage4-image col-md-4'>
                   <img src={require('../Images/no-req-pic5.png')} height="180" width="200"/>
               </div>
               <div className='no-request-stage4-number col-md-1'>
               ۴
                </div>
           </div>
          </div>
        );
      }
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

export default RequestItemXl;
