import React from 'react';
import { Divider,Button } from 'semantic-ui-react';
import {englishToPersianDigits} from './tools/EnglishToPersianDigits';

class TripItem extends React.Component{
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
      trip:nextProps.reserveDetail,tripStatus:nextProps.reserveDetail.status
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
    this.setState({token:"460b152177ab02716faa0d7795ff60f12d7cbd9d"},()=>{this.setSearchParamsForCancel(this.getRole())});
  }
  setTokenForDelete(){
    this.setState({token:"460b152177ab02716faa0d7795ff60f12d7cbd9d"},()=>{this.setSearchParamsForDelete(this.getRole())});
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
     // to do
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
     console.log(response);
   });
  }
  handleDeleteTripButton(){
    this.setTokenForDelete();
  }
  getTripCancelButton(){
    return (
      <Button className="request-userpanel-button" onClick={this.handleCancelTripButton.bind(this)}> لغو سفر</Button>
    );
  }
  getTripDeleteButton(){
    return (
      <Button className="request-userpanel-button" onClick={this.handleDeleteTripButton.bind(this)}> حذف سفر</Button>
    );
  }
  renderTripDetail(){
    if (this.state.trip!=null && this.state.tripStatus!=null){
      return (
        <div>
          <div className="request-header">
          <div className='request-status'>
            <p className="reserve-status-h1"> وضعیت سفر   </p>
            <p className="reserve-status-h2"> {this.getTripStatus()} </p>
            <p className="reserve-status-descriptions">{this.getTripStatusDescription()}</p>

          </div>
          <div className="request-detail-userpanel">
            <Divider/>
            <div className='house-preview-linked-to-house-detail' dir="rtl">
              <p> نام اقامتگاه : {this.state.trip.room.title} </p>
              <p>شهر مقصد: {this.state.trip.room.city}  </p>
              <p> به میزبانی  {this.state.trip.room.owner.first_name} {this.state.trip.room.owner.last_name}</p>
              <p> رزرو کننده: {this.state.trip.guest_person.last_name} </p>
              <p>تعداد میهمان: {englishToPersianDigits(this.state.trip.number_of_guests)} </p>


              <p> آدرس اقامت‌گاه: {this.state.trip.room.address} </p>

              <p>تاریخ ورود: {englishToPersianDigits(this.state.trip.start_date)}</p>
              <p>تاریخ خروج:{englishToPersianDigits(this.state.trip.end_date)} </p>
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
        </div>
      );
  }
}
  render(){
    return(
      <div>
      {this.renderTripDetail()}
      </div>
    );
  }
}
export default TripItem;
