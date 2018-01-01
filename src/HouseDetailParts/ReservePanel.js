import React from 'react';
import GuestNumber from './GuestNumber.js';
import {Button} from 'semantic-ui-react';
import Modal from 'react-modal';
import { englishToPersianDigits } from '../tools/EnglishToPersianDigits';
import {findDOMNode} from 'react-dom';
import $ from 'jquery';
import '../tools/DatePicker/bootstrap-datepicker.fa.js';
import '../tools/DatePicker/bootstrap-datepicker.js';
import '../tools/DatePicker/bootstrap-datepicker.css';

class ReservePanel extends React.Component{
  constructor(props){
    super(props);
    this.token = '';
    this.state = {
      reserveData : '',
      token:null,
      isOpen:false,
      requestParams :{
        numberOfGuests : 1,
        startDate:null,
        endDate:null,
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
      return({startDate : document.getElementById('fromdatepicker').value,
              endDate : document.getElementById('todatepicker').value,
              numberOfGuests : 1,
              discountCode : 'salam_tripinn'});
  }

  setSearchParams(reqpar){
    console.log(reqpar);
    if(reqpar.startDate=== null || reqpar.startDate==='' ){
      alert('.لطفا تاریخ ورود و خروج خود را دقیق وارد نمایید');
      return;
    }
    if(reqpar.endDate===null || reqpar.endDate===''){
      alert('.لطفا تاریخ ورود و خروج خود را دقیق وارد نمایید');
      return ;
    }
    if (reqpar.numberOfGuests === ''){
      alert('.لطفا تعداد مهمان‌های خود را وارد نمایید');
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
     this.setState({isOpen:true} , ()=>{this.renderData(reserveData)});
   });
 }
  renderData(reserve_data){
    this.setState({reserveData : reserve_data});
  }
  showTotalPrice() {
    if (this.state.reserveData !=='' && this.state.reserveData.is_available){
      return(
        <p>
        هزینه کل : {englishToPersianDigits(this.state.reserveData.total_price)}
        </p>
);
    }
  }
  showTrypinnPrice(){
    if (this.state.reserveData !=='' && this.state.reserveData.is_available){
      return(
        <p>
        هزینه تریپین:{englishToPersianDigits(this.state.reserveData.trypinn_service_price)}
        </p>);
    }
  }
  showHostPrice(){
    if (this.state.reserveData !=='' && this.state.reserveData.is_available){
      return(
        <p>
        هزینه میزبان : {englishToPersianDigits(this.state.reserveData.host_price)}
        </p>);
    }
  }
  showTrypinnDiscount(){
    if (this.state.reserveData !==''&& this.state.reserveData.is_available){
      return(
        <p>
         تخفیف تریپین:{englishToPersianDigits(this.state.reserveData.trypinn_service_discount)}
        </p>);
    }
  }
  showTotalDiscount(){
    if (this.state.reserveData !==''&& this.state.reserveData.is_available){
      return(
        <p>
        تخفیف کل : {englishToPersianDigits(this.state.reserveData.total_discount)}
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
    this.setToken();
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
  renderFromDatePicker(){
    const fromDatePicker = findDOMNode(this.refs.fromdatepicker);
    $(document).ready(function(){
      $(fromDatePicker).datepicker({
        changeMonth: true,
        changeYear: true,
        isRTL: true,
        numberOfMonths:1,
        showOtherMonths:false,
        showButtonPanel:true,
        dateFormat: "yy/m/d",
       });
    });
  }
  renderToDatePicker(){
    const toDatePicker = findDOMNode(this.refs.todatepicker);
    $(document).ready(function(){
      $(toDatePicker).datepicker({
        changeMonth: true,
        changeYear: true,
        isRTL: true,
        numberOfMonths:1,
        showButtonPanel:true,
        dateFormat: "yy/m/d",
       });
    });
  }
  render(){
    console.clear();
    {this.renderToDatePicker()}
    {this.renderFromDatePicker()}
    return(
      <div>
        <div className="guestnumber-div">
          <GuestNumber />
        </div>
        <div className="divider-card"></div>

        <div>
          <input className="date-picker-input input-sm form-control" id='fromdatepicker' ref='fromdatepicker' placeholder='تاریخ ورود'style={{direction:'rtl',textAlign:'center'}}/>
        </div>
        <div>
          <input className="date-picker-input input-sm form-control" id='todatepicker' ref='todatepicker' placeholder='تاریخ خروج'style={{direction:'rtl',textAlign:'center'}}/>
        </div>

          <div className='reserve-button-div'>
            <Button color='blue' className='reserve-button' onClick ={this.handleClick.bind(this)}>
              مشاهده قیمت
            </Button>
          </div>
        <Modal
          isOpen={this.state.isOpen}
          onRequestClose={()=>{this.setState({isOpen:false})}}
          >
          <div dir="rtl" className="reserve-modal">
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
          </div>
        </Modal>

      </div>
    );
  }
}
export default ReservePanel;
