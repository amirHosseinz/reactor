import React from 'react';
import { Divider,Button } from 'semantic-ui-react';
import {englishToPersianDigits} from '../tools/EnglishToPersianDigits';
import moment from 'moment-jalaali';
// import {Modal} from 'react-bootstrap';
import Modal from 'react-modal';
import {reserveModalStyleRequests} from '../Styles.js';
import {CancelButtonModalStyle} from '../Styles.js';
import {parsePrice3digits} from '../tools/ParsePrice3digits.js'
import './RequestItem.css';


class RequestItemMd extends React.Component{
  constructor(props){
    super(props);
    this.state= {
      request:null,
      showPreBill:false,
      cancelModalIsOpen:false,
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
            return "رد شده توسط مهمان";
          case "HOST_REJECTED":
            return 'رد شده توسط میزبان';
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
        return(<div className="clickable-p request-item-payment-button" onClick={()=>{this.setState({showPreBill:true})}}><p className='request-item-payment-button-text'>پرداخت</p></div>);
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

  renderNowruzPriceForPerNight(){

    if(this.state.request.nowruz_price!==0){
      return(
        <div className="pre-bill-price-night-content row-reverse" dir="rtl">
          <p className="pre-bill-price-night-sentence">هزینه شب‌های نوروز
          ({englishToPersianDigits(this.state.request.nowruz_duration)} شب ) :
          </p>
          <p className="pre-bill-price-night-value">
           {englishToPersianDigits(parsePrice3digits(this.state.request.nowruz_price))}
             تومان
          </p>
        </div>
      );
    }
  }

  renderNowRuzForPerPerson(){
    if(this.state.request.nowruz_price!==0){
      return(
        <div className="pre-bill-price-night-content row-reverse" dir="rtl">
          <p className="pre-bill-price-night-sentence">هزینه شب‌های نوروز
            ({englishToPersianDigits(this.state.request.nowruz_duration)}شب - {englishToPersianDigits(this.state.request.number_of_guests)} نفر) :
          </p>
          <p className="pre-bill-price-night-value">
           {englishToPersianDigits(parsePrice3digits(this.state.request.nowruz_price))}
             تومان
          </p>
        </div>
      );
    }
  }

  renderDifferentTypesPrices(){
    if (this.state.request.room===null)
      var data = this.state.request.eco_room;
    else
      var data = this.state.request.room;
    if(data.is_price_per_person===false){
      return(
        <div>
          {this.renderOrdinaryPriceForPerNight()}
          {this.renderWeekendPriceForPerNight()}
          {this.renderSpecialPriceForPerNight()}
          {this.renderNowruzPriceForPerNight()}
        </div>
      );
    }
    else{
      return(
        <div>
          {this.renderOrdinaryPriceForPerPerson()}
          {this.renderWeekendPriceForPerPerson()}
          {this.renderSpecialPriceForPerPerson()}
          {this.renderNowRuzForPerPerson()}
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
        if (this.state.request.room===null)
          var data = this.state.request.eco_room;
        else
          var data = this.state.request.room;
        return(
          <Modal isOpen={this.state.showPreBill}
            style={reserveModalStyleRequests}
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
                        <img src={"https://www.trypinn.com"+data.preview} alt=""height="90px"/>
                    </div>
                    <div>
                      <div className="pre-bill-house-title">
                        <p> {data.title}</p>
                      </div>
                      <div className="pre-bill-house-address">
                        <p>{data.location}، {data.district}</p>
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
          شما این درخواست را لغو کرده اید
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
        پرداخت هزینه لغو شد
        </span>;
      case "HOST_ACCEPTED_GUEST_PAYED":
        return <span>
        این رزرو نهایی شده است،
برای مشاهده‌ی جزئیات آن به بخش
سفرها
مراجعه کنید

        </span>;
      case "HOST_ACCEPTED_HOST_CANCELED":
        return <span>
        متاسفانه درخواست شما
توسط میزبان
مورد تایید قرار نگرفت
        </span>;
      default:
        return null;
    }
}

renderCancelModal(){
  return(
      <Modal
        isOpen={this.state.cancelModalIsOpen}
        onRequestClose={()=>{this.setState({cancelModalIsOpen:false})}}
        style={CancelButtonModalStyle}>
        <div onClick={()=>{this.setState({cancelModalIsOpen:false})}} className="close-modal-phone-number">
        </div>
        <div className='cancel-button-modal'>
          <div className='cancel-button-modal-buttons'>
          <p className='cancel-button-modal-question'>
          آیا از لغو درخواست خود مطمئن هستید؟
          </p>
          <div className="clickable-p request-item-yes-button-modal"  onClick={()=>{this.setState({cancelModalIsOpen:false})}}><p className='request-item-payment-button-text'>بازگشت</p></div>
          <div className="clickable-p request-item-no-button-modal"onClick={()=>{this.setTokenForCancel()}}><p className='request-item-cancel-button-text'>لغو درخواست</p> </div>
          </div>
        </div>
      </Modal>

  );
}
renderCancelButton(){
  if(this.state.requestStatus!=="GUEST_CANCELED"){
   return (
     <div className="clickable-p request-item-cancel-button" onClick={()=>{this.setState({cancelModalIsOpen:true})}}><p className='request-item-cancel-button-text'>لغو درخواست</p> </div>
   );
  }
}
renderDeleteButton(){
  if(this.state.requestStatus!=="HOST_ACCEPTED_GUEST_CANCELED"){
   return (<div></div>);
}
}

renderRequestCardVersion2(){
  if (this.state.request.room===null)
    var data = this.state.request.eco_room;
  else
    var data = this.state.request.room;
  return(
  <div className="request-card-container">
    <div className="request-item-details">
      <p className="request-item-details-status">وضعیت درخواست رزرو<span> : </span>  <span className='request-item-details-text'>{this.getRequestStatus()}</span></p>
      <p className='request-status-description-title'> <span>:</span> توضیحات </p>
      <p className="request-item-details-description">{this.getRequestStatusDiscription()} </p>
      <div className='request-item-details-card'>
        <div className='request-item-details-card-description'>
          <p className='request-item-details-card-home-name'> <span className='request-item-details-text'>نام اقامتگاه : </span> <a style={{fontWeight:'500', color:'#12b2ce'}} href={"/rooms/"+ data.id} target="_blank">{data.title}</a></p>
          <p className='request-item-details-card-host-name'> به میزبانی  {data.owner.first_name} {data.owner.last_name}</p>
        </div>
        <img className='request-item-details-card-img' src={"https://www.trypinn.com"+data.preview} alt=""height="90px"/>
      </div>
      <div className='request-item-details-dates'>
      <div className='request-item-details-exit-date'><span>:</span>تاریخ خروج <p className='request-item-details-extra-bold-texts'>{englishToPersianDigits(moment(this.state.request.end_date).format('jYYYY/jM/jD'))}</p></div>
      <div className='request-item-details-entrance-date' ><span>:</span>تاریخ ورود<p className='request-item-details-extra-bold-texts'> {englishToPersianDigits(moment(this.state.request.start_date).format('jYYYY/jM/jD'))} </p></div>
      </div>
      <Divider></Divider>
        <div className='request-item-details-extra'>
          <p >شهر مقصد: <span className='request-item-details-extra-bold-texts'>{data.location}</span>  </p>
          <p> رزرو کننده: <span className='request-item-details-extra-bold-texts'>{this.state.request.guest_person.last_name}</span> </p>
          <p>تعداد میهمان: <span className='request-item-details-extra-bold-texts'>{englishToPersianDigits(this.state.request.number_of_guests)} نفر </span></p>
          <p className='request-item-details-final-cost'>جمع هزینه ها: {englishToPersianDigits(this.state.request.total_price)} تومان</p>
        </div>
        </div>
        <div className='relevant-button'>
          {this.getRelevantButton()}
          {this.renderCancelButton()}
          {this.renderDeleteButton()}
          {this.renderCancelModal()}
        </div>
  </div>
  );
}
  renderRequestDetail(){
    if (this.state.request!==null){
      if(this.state.requestStatus!=='no-house'){
        return (
          <div>
          {this.renderRequestCardVersion2()}
          </div>
        );
      }
      else{
        return(
        <div className='request-item-no-house-main-container-md'>
          <p className="no-request-header">شما درخواست رزروی ندارید</p>
          <p className="no-request-main-paragraph">شما تاکنون درخواست رزروی نداشته اید. میتوانید با جستجو میان شهرها و اقامتگاه های موجود، درخواست رزرو خود را ثبت نمایید. کافی است مراحل زیر را دنبال نمایید</p>
          <div className='no-request-stage1-container'>
            <div className='no-request-stage1-description col-md-6'>
              <div className='no-request-stage1-description-image'>
                <img src={require('../Images/no-req-pic1.png')} height="45" width="220"/>
              </div>
              <p className='no-request-stage1-description-text'>
                در صفحه جستجو شهر یا استان موردنظر خود را وارد کنید تا نتایج جستجو را مشاهده نمایید
              </p>
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
     this.props.changeReRenderList();
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
     this.props.changeReRenderList();
  });
  }
  render(){
    return(
      <div>
        {this.renderPreBill()}
        {}
        {this.renderRequestDetail()}
      </div>
    );
  }
}

export default RequestItemMd;
