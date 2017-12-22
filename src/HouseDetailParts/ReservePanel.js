import React from 'react';
// import DatePicker from 'react-datepicker';
import moment from 'moment';
import GuestNumber from './GuestNumber.js';
import {Button} from 'semantic-ui-react';
import Modal from 'react-modal';


class ReservePanel extends React.Component{
  constructor(props){
    super(props);
    this.token = '';
    this.state = {
      reserveData : '',
      token:null,
      isOpen:false,
      requestParams :{
        startDate : moment(new Date()),
        endDate : moment(new Date()).add(1,'days'),
        numberOfGuests : '',
        discountCode : null,
      },
    };
  }
  setToken() {
    this.setState({
      token : localStorage['token'],
    },
      ()=>this.setSearchParams(this.getDataFromUser()));
  }
  getDataFromUser(){
    return({startDate : moment(new Date()),
            endDate : moment(new Date()).add(5,'days'),
            numberOfGuests : document.getElementById('guest-number').value,
            discountCode : 'salam_trypinn',});
    }
  setSearchParams(reqpar){
    if (reqpar.numberOfGuests === ''){
      alert('please enter number of guests');
      return;
    }
    this.setState({requestParams:reqpar},() => {this.getDataFromServer()});
  }
  getDataFromServer(){
    var request = new Request('https://www.trypinn.com/api/room/get_price/', {
      method: 'POST',
      body: JSON.stringify({
        room_id : this.props.homeData.id,
        start_date : this.state.requestParams.startDate,
        end_date : this.state.requestParams.endDate,
        number_of_guests : this.state.requestParams.numberOfGuests,
        discount_code: this.state.requestParams.discountCode,
    }),
      headers: new Headers({'Accept': 'application/json','Content-Type':'application/json',
      'Authorization': 'Token '+this.state.token,})
    });
   fetch(request)
   .then((response) => {
     return response.json();
   })
   .then((reserveData) => {
     this.renderData(reserveData);
   });
 }
  renderData(reserve_data){
    this.setState({reserveData : reserve_data});
  }
  showTotalPrice() {
    if (this.state.reserveData !=='' && this.state.reserveData.is_available){
      return(
        <p>
        هزینه کل : {this.state.reserveData.total_price}
        </p>
);
    }
  }
  showTrypinnPrice(){
    if (this.state.reserveData !=='' && this.state.reserveData.is_available){
      return(
        <p>
        هزینه تریپین:{this.state.reserveData.trypinn_service_price}
        </p>);
    }
  }
  showHostPrice(){
    if (this.state.reserveData !=='' && this.state.reserveData.is_available){
      return(
        <p>
        هزینه میزبان : {this.state.reserveData.host_price}
        </p>);
    }
  }
  showTrypinnDiscount(){
    if (this.state.reserveData !==''&& this.state.reserveData.is_available){
      return(
        <p>
         تخفیف تریپین:{this.state.reserveData.trypinn_service_discount}
        </p>);
    }
  }
  showTotalDiscount(){
    if (this.state.reserveData !==''&& this.state.reserveData.is_available){
      return(
        <p>
        تخفیف کل : {this.state.reserveData.total_discount}
        </p>);
    }
  }
  showIsAvailable()
  {
    if (this.state.reserveData !==''){
      if (this.state.reserveData.is_available === false){
        return <div>خانه موجود نمی باشد!!!</div>
      }
    }
  }
  handleClick(){
    this.setState({isOpen : true},()=>{this.setToken()});
  }
  sendBookRequest(){
    var request = new Request('https://www.trypinn.com/api/room/request/book/', {
      method: 'POST',
      body: JSON.stringify({
        room_id : this.props.homeData.id,
        start_date : this.state.requestParams.startDate,
        end_date : this.state.requestParams.endDate,
        number_of_guests : this.state.requestParams.numberOfGuests,
        discount_code: this.state.requestParams.discountCode,
    }),
      headers: new Headers({'Accept': 'application/json','Content-Type':'application/json',
      'Authorization': 'Token '+this.state.token,})
    });
   fetch(request)
   .then((response) => {
     return response.json();
   })
   .then((bookData) => {
     console.log(bookData);
   });
  }
  showBookButton(){
    if(this.state.reserveData !=='' && this.state.reserveData.is_available){
      return <button onClick={this.sendBookRequest.bind(this)}> Book Request</button>
    }
  }
  render(){
    return(
      <div>
        <div>
          <GuestNumber/>
        </div>
          <div className='reserve-button-div'>
            <Button color='twitter' className='reserve-button' onClick ={this.handleClick.bind(this)}>
              !رزرو کنید
            </Button>
          </div>
        <Modal
          isOpen={this.state.isOpen}
          onRequestClose={()=>{this.setState({isOpen:false})}}
          >
          <div>
            {this.showHostPrice()}
          </div>
          <div>
            {this.showTrypinnPrice()}
          </div>
          <div>
            {this.showIsAvailable()}
          </div>
          <div>
            {this.showTrypinnDiscount()}
          </div>
          <div>
            {this.showTotalDiscount()}
          </div>
          <div>
            {this.showTotalPrice()}
          </div>
          <div>
            <p> در حال حاضر امکان رزرو اقامتگاه از طریق وبسایت وجود ندارد. برای رزرو اقامتگاه ها لطفا اپلیکیشن را دانلود کنید.</p>
          </div>
          <div>
            {this.showBookButton()}
          </div>
        </Modal>

      </div>
    );
  }
}
export default ReservePanel;
