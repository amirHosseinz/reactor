import React from 'react';

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
      <button onClick={this.handleCancelTripButton.bind(this)}> لغو سفر</button>
    );
  }
  getTripDeleteButton(){{
    return (
      <button onClick={this.handleDeleteTripButton.bind(this)}> حذف سفر</button>
    );
  }}
  renderTripDetail(){
    if (this.state.trip!=null && this.state.tripStatus!=null){
      return (
        <div>
          <div className='request-status'>
            <p> وضعیت درخواست رزرو </p>
            <p> {this.getTripStatus()} </p>
          </div>
          <div className='house-preview-linked-to-house-detail'>
            <p>{this.state.trip.room.title} </p>
            <p>{this.state.trip.room.address} </p>
            <p>{this.state.trip.room.owner.first_name} {this.state.trip.room.owner.last_name}</p>
          </div>
          <div className='trip-details'>
            <p>{this.state.trip.start_date} </p>
            <p>{this.state.trip.end_date} </p>
            <p>{this.state.trip.number_of_guests} </p>
          </div>
          <div>
            <p>هزینه پرداخت شده : {this.state.trip.total_price}</p>
          </div>
          <div className='relevant button'>
            {this.getTripStatusDescription()}
          </div>
          {this.getRelevantButton()}
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
