import React from 'react';
import { Divider } from 'semantic-ui-react';
import {englishToPersianDigits} from '../tools/EnglishToPersianDigits';
import moment from 'moment-jalaali';
import './TripItem.css';
import {Link} from 'react-router-dom';
import {CancelButtonModalStyle} from '../Styles.js';
import Modal from 'react-modal';
import Fade from 'react-reveal/Fade';


moment.loadPersian({usePersianDigits:true , dialect:'persian-modern'});
class TripItemXl extends React.Component{
  constructor(props){
    super(props);
    this.state={
      trip : null,
      tripStatus : null,
      cancelModalIsOpen:false,
      role : null,
      token : null,
    };
  }
  componentWillReceiveProps(nextProps){
    this.setState({
      trip:nextProps.reserveDetail,tripStatus:nextProps.reserveDetail.status,
    });
  }
  getTripStatus(){
        switch (this.state.tripStatus){
          case "CANCELED_BY_GUEST":
            return 'لغو شده توسط مهمان';
          case "CANCELED_BY_HOST":
            return 'لغو شده توسط میزبان';
          case "ISSUED":
            return 'صادر شده';
          case "IN_PROGRESS":
            return 'در حال انجام';
          case  "RESOLUTION":
            return 'در حال بررسی مشکل';
          case "DONE" :
            return 'انجام شده';
          default :
            return null;
        }
  }
  getTripStatusDescription(){
    switch (this.state.tripStatus){
      case "CANCELED_BY_GUEST":
        return (
          <span>
          شما این سفر را لغو کرده اید
          </span>
        );
      case "CANCELED_BY_HOST":
        return (
          <span>
          متاسفانه اقامت‌گاه موردنظر شما
امکان میزبانی شما را نخواهد داشت،
مبلغ پرداختی شما در اسرع وقت بازپرداخت
می‌شود.
          </span>
        );
      case "ISSUED":
        return (
          <span>
          این رزرو نهایی شده است،
          تریپین سفر خوبی را
          برای شما آرزو می‌کند.
          برای داشتن بهترین
          تجربه‌ی سفر
          <Link to="/terms&conditions"> مقررات تحویل خانه </Link>
        را مطالعه کنید
          </span>
        );
      case "IN_PROGRESS":
        return (
          <span>
          این سفر در حال انجام است،
در صورت بروز هرگونه مشکل
با پشتیبانی
<Link to="/contactUs"> تماس </Link>
بگیرید

          </span>
        );
      case  "RESOLUTION":
        return (
          <span>
          در حال پیگیری موضوع
مسئله مطرح شده از سمت
شما هستیم،
به محض حل مسئله پیش آمده
شما را در جریان
قرار خواهیم داد.
در صورت داشتن هرگونه سوال
پشتیبانی ما در خدمت شما
خواهد بود.
          </span>
        );
      case "DONE" :
        return (
          <span>
          این سفر انجام شده است،
امیدواریم سفر خوبی را تجربه
کرده باشید.</span>
        );
      default :
        return null;
      }
  }
  getRelevantButton(){
    switch (this.state.tripStatus){
      case "CANCELED_BY_GUEST":
      console.log('inj');
        return (
          <div className="clickable-p request-item-cancel-button" onClick={this.renderOpenCancelButtonModal.bind(this)}>
        <p className="request-item-cancel-button-text">   حذف سفر</p>
         </div>);
      case "CANCELED_BY_HOST":
        return (
          <div className="clickable-p request-item-cancel-button" onClick={this.renderOpenCancelButtonModal.bind(this)}>
          <p className="request-item-cancel-button-text">   حذف سفر</p>
           </div>
        );
      case "ISSUED":
        return (<div className="clickable-p request-item-cancel-button" onClick={this.handleCancelTripButton.bind(this)}>
        <p className="request-item-cancel-button-text"> لغو سفر</p>
         </div>);
      case "IN_PROGRESS":
        return (
          <div></div>
        );
      case  "RESOLUTION":
        return (
          <div></div>
        );
      case "DONE" :
        return (<div className="clickable-p request-item-cancel-button" onClick={this.handleDeleteTripButton.bind(this)}> حذف سفر</div>);
      default :
        return null;
    }
  }
  getRole(){
    return 'guest';
  }
  setTokenForCancel(){
    this.setState({token:localStorage['token']},()=>{this.setSearchParamsForCancel(this.getRole())});
  }
  setTokenForDelete(){
    this.setState({token:localStorage['token']},()=>{this.setSearchParamsForDelete(this.getRole())});
  }
  handleCancelTripButton(){
    this.setTokenForCancel();
  }
  setSearchParamsForCancel(person_role){
    this.setState({role:person_role },()=>this.cancelTrip())
  }
  setSearchParamsForDelete(person_role){
    this.setState({role:person_role},()=>this.deleteTrip())
  }
  cancelTrip (){
    var request = new Request('https://www.trypinn.com/api/reservation/cancel/',{
      method: 'POST',
      body: JSON.stringify({
        role:this.state.role,
        reserve_id : this.state.trip.id,
    }),
      headers: new Headers({'Accept': 'application/json','Content-Type': 'application/json',
      'Authorization': 'Token '+ this.state.token,})
    });
   fetch(request)
   .then((response) => {
     return response.json();
   })
   .then((response) => {
     this.props.changeReRenderList();
   });
  }
  deleteTrip(){
    var request = new Request('https://www.trypinn.com/api/reservation/archive/',{
      method: 'POST',
      body: JSON.stringify({
        role:this.state.role,
        reserve_id : this.state.trip.id,
    }),
      headers: new Headers({'Accept': 'application/json','Content-Type': 'application/json',
      'Authorization': 'Token '+ this.state.token,})
    });
   fetch(request)
   .then((response) => {
     return response.json();
   })
   .then((response) => {
     this.props.changeReRenderList();
   });
  }
  handleDeleteTripButton(){
    this.setTokenForDelete();
  }

  renderOpenCancelButtonModal(){
    this.setState({cancelModalIsOpen:true});
  }
  renderCancelModal(){
    return(

        <Modal
          isOpen={this.state.cancelModalIsOpen}
          onRequestClose={()=>{this.setState({cancelModalIsOpen:false})}}
          style={CancelButtonModalStyle}>
          <div className='cancel-button-modal'>
          <p className='cancel-button-modal-question'>
          آیا از لغو سفر خود مطمئن هستید؟
          </p>
            <div className='cancel-button-modal-buttons'>
            <div className="clickable-p request-item-no-button-modal" onClick={this.handleDeleteTripButton.bind(this)}><p className='request-item-cancel-button-text'>لغو سفر</p> </div>
            <div className="clickable-p request-item-yes-button-modal"  onClick={()=>{this.setState({cancelModalIsOpen:false})}}><p className='request-item-payment-button-text'>بازگشت</p></div>
            </div>
          </div>
        </Modal>

    );
  }
  renderTripCardVersion2(){
    if (this.state.trip.room===null)
      var data = this.state.trip.eco_room;
    else
      var data = this.state.trip.room;
    return(
      <div className="request-card-container">
        <div className="request-item-details">
          <p className="request-item-details-status"> وضعیت سفر<span> : </span>  <span className='request-item-details-text'>{this.getTripStatus()}</span></p>
          <p className='request-status-description-title'> <span>:</span> توضیحات </p>
          <p className="request-item-details-description">{this.getTripStatusDescription()} </p>
          <div className='request-item-details-card'>
            <div className='request-item-details-card-description'>
              <p className='request-item-details-card-home-name'> <span className='request-item-details-text'>نام اقامتگاه : </span> <a style={{fontWeight:'500', color:'#12b2ce'}} href={"/rooms/"+ data.id} target="_blank">{data.title}</a></p>
              <p className='request-item-details-card-host-name'> به میزبانی  {data.owner.first_name} {data.owner.last_name}</p>
            </div>
            <img className='request-item-details-card-img' src={"https://www.trypinn.com"+data.preview} alt=""height="90px"/>
          </div>
          <div className='request-item-details-dates'>
          <div className='request-item-details-exit-date'><span>:</span>تاریخ خروج <p className='request-item-details-extra-bold-texts'>{englishToPersianDigits(moment(this.state.trip.end_date).format('jYYYY/jM/jD'))}</p></div>
          <div className='request-item-details-entrance-date' ><span>:</span>تاریخ ورود<p className='request-item-details-extra-bold-texts'> {englishToPersianDigits(moment(this.state.trip.start_date).format('jYYYY/jM/jD'))} </p></div>
          </div>
          <Divider></Divider>
            <div className='request-item-details-extra'>
              <p >شهر مقصد: <span className='request-item-details-extra-bold-texts'>{data.location}</span>  </p>
              <p> رزرو کننده: <span className='request-item-details-extra-bold-texts'>{this.state.trip.guest_person.last_name}</span> </p>
              <p>تعداد میهمان: <span className='request-item-details-extra-bold-texts'>{englishToPersianDigits(this.state.trip.number_of_guests)} نفر </span></p>
              <p className='request-item-details-final-cost'>جمع هزینه ها: {englishToPersianDigits(this.state.trip.total_price)} تومان</p>
            </div>
            </div>
            <div className='relevant-button'>
              {this.getRelevantButton()}
            </div>
            {this.renderCancelModal()}
      </div>
    );
  }
  renderTripDetail(){
    if (this.state.trip!=null && this.state.tripStatus!=null){
      if(this.state.tripStatus!=='no-house')
      {
        return (
          <div>
            {this.renderTripCardVersion2()}
          </div>
        );
      }
      else{
        return(
          <div className='trip-item-no-house-main-container'>
          <p className="no-request-header">شما سفر تایید شده ای ندارید</p>
          <p className="no-trip-main-paragraph">تاکنون سفری برای شما به ثبت نرسیده است. شما میتوانید با ارسال درخواست رزرو به هریک از خانه های موجود ، مقدمات سفر خود را فراهم نمایید</p>
            <div className='no-trip-stages-container'>
              <div className='no-trip-stage1-text col-md-7'>
               <p>پس از تایید درخواست سفر شما در بخش <Link className='tripinn-blue' to="/dashboard/request">درخواست ها </Link>توسط میزبان و پرداخت هزینه سفر توسط شما، سفر شما در این بخش ایجاد میشود </p>
                </div>
              <Fade right={true}>
               <div className='no-trip-stage1-img col-md-5'>
                 <img src={require('../Images/no-trip-pic1.png')} height="200" width="220"/>
               </div>
              </Fade>
              </div>
            <div className='no-trip-stages-container'>
              <Fade left={true}>
                <div  className='no-trip-stage2-img col-md-5'>
                  <img src={require('../Images/no-trip-pic2.png')} height="150" width="180"/>
                </div>
              </Fade>
                <div className='no-trip-stage2-text col-md-7'>
                <p>شما میتوانید در بخش <Link className='tripinn-blue' to="/dashboard/trip"> سفرها</Link> آدرس دقیق مقصد خود وشماره تماس میزبان خودرا مشاهده نمایید</p>
                  </div>
                </div>
                <div className='no-trip-stages-container'>
                  <div  className='no-trip-stage3-text col-md-7'>
                    <p>همچنین هنوز هم میتوانید سفر خودرا لغو نمایید. به خاطر داشته باشید با لغو سفر خود، <span className="mizban-color"> هزینه یک شب از اقامت شما کم خواهد شد </span> و مابقی مبلغ به شما عودت خواهد شد</p>
                  </div>
                  <Fade right={true}>
                    <div className='no-trip-stage3-img col-md-5'>
                      <img src={require('../Images/no-trip-pic3.png')} height="190" width="160"/>
                    </div>
                  </Fade>
            </div>
          </div>
        );
      }
  }
}
  render(){
    return (
      <div>
      {this.renderTripDetail()}
      </div>
    );
  }
}

export default TripItemXl;
