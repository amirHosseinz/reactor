import React from 'react';
import { Divider } from 'semantic-ui-react';
import {englishToPersianDigits} from '../tools/EnglishToPersianDigits';
import moment from 'moment-jalaali';
import './TripItem.css';


moment.loadPersian({usePersianDigits:true , dialect:'persian-modern'});
class TripItemMd extends React.Component{
  constructor(props){
    super(props);
    this.state={
      trip : null,
      tripStatus : null,
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
          <span>           این رزرو نهایی شده است،
          تریپین سفر خوبی را
          برای شما آرزو می‌کند.
          برای داشتن بهترین
          تجربه‌ی سفر مقررات
          تحویل خانه را مطالعه کنید.
          </span>
        );
      case "IN_PROGRESS":
        return (
          <span>
          این سفر در حال انجام است،
در صورت بروز هرگونه مشکل
با پشتیبانی
تماس بگیرید.

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
        return this.getTripDeleteButton()
      case "CANCELED_BY_HOST":
        return this.getTripDeleteButton()
      case "ISSUED":
        return this.getTripCancelButton()
      case "IN_PROGRESS":
        return (
          <div></div>
        );
      case  "RESOLUTION":
        return (
          <div></div>
        );
      case "DONE" :
        return this.getTripDeleteButton();
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
  getTripCancelButton(){
    return (
      <div className="clickable-p request-item-cancel-button" onClick={this.handleCancelTripButton.bind(this)}> لغو سفر</div>
    );
  }
  getTripDeleteButton(){
    return (
      <div className="clickable-p request-item-cancel-button" onClick={this.handleDeleteTripButton.bind(this)}> حذف سفر</div>
    );
  }
  renderTripDetail(){
    if (this.state.trip!=null && this.state.tripStatus!=null){
      if(this.state.tripStatus!=='no-house')
      {
        return (
            <div className="trip-item-no-house-main-container-md">
            <div className='request-status'>
              <p className="reserve-status-h1"> وضعیت سفر   </p>
              <p className="reserve-status-h2"> {this.getTripStatus()} </p>
              <p className="reserve-status-descriptions">{this.getTripStatusDescription()}</p>

            </div>
            <div className="request-detail-userpanel">
              <Divider/>
              <div className='house-preview-linked-to-house-detail' dir="rtl">
                <p> نام اقامتگاه :<a style={{color:'#12b2ce'}} href={"/rooms/"+this.state.trip.room.id} target="_blank">{this.state.trip.room.title}</a>  </p>
                <p>شهر مقصد: {this.state.trip.room.city}  </p>
                <p> به میزبانی  {this.state.trip.room.owner.first_name} {this.state.trip.room.owner.last_name}</p>
                <p> رزرو کننده: {this.state.trip.guest_person.last_name} </p>
                <p>تعداد میهمان: {englishToPersianDigits(this.state.trip.number_of_guests)} </p>


                <p> آدرس اقامت‌گاه: {this.state.trip.room.address} </p>

                <p>تاریخ ورود: {moment(this.state.trip.start_date).format('jYYYY/jM/jD')}</p>
                <p>تاریخ خروج:{moment(this.state.trip.end_date).format('jYYYY/jM/jD')} </p>
              </div>
              <div className='request-details'>
              </div>
              <Divider/>
              <div className='final-details'>
                <p> هزینه پرداخت شده: {englishToPersianDigits(this.state.trip.total_price)} </p>
              </div>
            </div>

            <div className='relevant-button'>
              {this.getRelevantButton()}
            </div>
          </div>
        );
      }
      else{
        return(
          <div className='no-trip-container profile_dynamic_edit'>
          <p className="no-request-header">شما سفر تایید شده ای ندارید</p>
          <p className="no-trip-main-paragraph">تاکنون سفری برای شما به ثبت نرسیده است. شما میتوانید با ارسال درخواست رزرو به هریک از خانه های موجود ، مقدمات سفر خود را فراهم نمایید</p>
            <div className='no-trip-stages-container'>
              <div className='no-trip-stage1-text col-md-7'>
               <p>پس از تایید درخواست سفر شما در بخش <a className='tripinn-blue' href="/dashboard/request">درخواست ها </a>توسط میزبان و پرداخت هزینه سفر توسط شما، سفر شما در این بخش ایجاد میشود </p>
                </div>
             <div  className='no-trip-stage1-img col-md-5'>

                <img src={require('../Images/no-trip-pic1.png')} height="200" width="220"/>
               </div>
              </div>
            <div className='no-trip-stages-container'>
              <div  className='no-trip-stage2-img col-md-5'>
                <img src={require('../Images/no-trip-pic2.png')} height="150" width="180"/>
                </div>
                <div  className='no-trip-stage2-text col-md-7'>
                <p>شما میتوانید در بخش <a className='tripinn-blue' href="/dashboard/trip"> سفرها</a> آدرس دقیق مقصد خود وشماره تماس میزبان خودرا مشاهده نمایید</p>
                  </div>
                </div>
                <div className='no-trip-stages-container'>
                  <div  className='no-trip-stage3-text col-md-7'>
                  <p>همچنین هنوز هم میتوانید سفر خودرا لغو نمایید. به خاطر داشته باشید با لغو سفر خود، <span className="mizban-color"> هزینه یک شب از اقامت شما کم خواهد شد </span> و مابقی مبلغ به شما عودت خواهد شد</p>
                    </div>
            <div  className='no-trip-stage3-img col-md-5'>
              <img src={require('../Images/no-trip-pic3.png')} height="190" width="160"/>
              </div>
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

export default TripItemMd;
