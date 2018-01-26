import React from 'react';
import GuestNumber from './GuestNumber.js';
import {Button} from 'semantic-ui-react';
import { englishToPersianDigits } from '../tools/EnglishToPersianDigits';
import {findDOMNode} from 'react-dom';
import {Modal} from 'react-bootstrap';
import $ from 'jquery';
import '../tools/DatePicker/bootstrap-datepicker.fa.js';
import '../tools/DatePicker/bootstrap-datepicker.js';
import '../tools/DatePicker/bootstrap-datepicker.css';
import {reserveModalStyle} from '../Styles.js';
import moment from 'moment-jalaali';

moment.loadPersian({usePersianDigits:false , dialect:'persian-modern'});

class ReservePanel extends React.Component{
  constructor(props){
    super(props);
    this.token = '';
    this.state = {
      reserveData : '',
      token:null,
      showPreBill:false,
      requestParams :{
        numberOfGuests : 1,
        fromDate:null,
        toDate:null,
        discountCode : null,
      },
    };
  }

  componentWillMount () {
    this.renderFromDatePicker();
    this.renderToDatePicker();
  }

  componentDidMount(){
    this.interval = setInterval(() => this.setToken(), 1000);
  }

  setToken() {
    this.setState({
      token : localStorage['token'],
    },
      ()=>this.setSearchParams(this.getDataFromUser()));
  }
  getDataFromUser(){
      return({fromDate :document.getElementById('fromdatepicker').value,
              toDate: document.getElementById('todatepicker').value,
              numberOfGuests : 1,
              discountCode : ''});
  }
  setSearchParams(reqpar){
    if(reqpar.fromDate=== null || reqpar.fromDate==='' ){
      // alert('.لطفا تاریخ ورود و خروج خود را دقیق وارد نمایید');
      return;
    }
    if(reqpar.toDate===null || reqpar.toDate===''){
      // alert('.لطفا تاریخ ورود و خروج خود را دقیق وارد نمایید');
      return ;
    }
    if (reqpar.numberOfGuests === ''){
      // alert('.لطفا تعداد مهمان‌های خود را وارد نمایید');
      return;
    }
    reqpar.fromDate= moment(reqpar.fromDate, 'jYYYY/jM/jD').format('YYYY/M/D');
    reqpar.toDate= moment(reqpar.toDate, 'jYYYY/jM/jD').format('YYYY/M/D');
    this.setState({requestParams:reqpar},() => {this.getDataFromServer()});
  }
  getDataFromServer(){
    var request = new Request('https://www.trypinn.com/api/room/get_price/', {
      method: 'POST',
      body: JSON.stringify({
        room_id : this.props.homeData.id,
        platform:'web',
        start_date : this.state.requestParams.fromDate,
        end_date : this.state.requestParams.toDate,
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
        هزینه کل : {englishToPersianDigits(this.state.reserveData.total_price)}
        </p>
);
    }
  }
  showTrypinnPrice(){
    if (this.state.reserveData !=='' && this.state.reserveData.is_available && this.state.reserveData.trypinn_service_price!==null){
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
    if (this.state.reserveData !==''&& this.state.reserveData.is_available && this.state.reserveData.trypinn_service_discount!==null){
      return(
        <p>
         تخفیف تریپین:{englishToPersianDigits(this.state.reserveData.trypinn_service_discount)}
        </p>);
    }
  }
  showTotalDiscount(){
    if (this.state.reserveData !==''&& this.state.reserveData.is_available && this.state.reserveData.total_discount!==null){
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
    this.setState({showPreBill:true});
  }
  sendBookRequest(){
    var request = new Request('https://www.trypinn.com/api/room/request/book/', {
      method: 'POST',
      body: JSON.stringify({
        room_id : this.props.homeData.id,
        start_date : this.state.requestParams.fromDate,
        end_date : this.state.requestParams.toDate,
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
     if(bookData.successful===true){
       window.location.href = '/dashboard/request';
     }
   });
  }
  showBookButton(){
    if(this.state.reserveData !=='' && this.state.reserveData.is_available){
      return <Button color="twitter" onClick={this.sendBookRequest.bind(this)}> بله </Button>
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
  renderPriceDetails(){
        return(
          <div dir="rtl" className="reserve-modal">

              <div>
                {this.showTotalPrice()}
              </div>

          </div>
        );
      }
  renderReserveButton(){
    if(this.state.reserveData !==''){
      return(
        <div className='reserve-button-div'>
          <Button color='orange' className='reserve-button active' onClick ={this.handleClick.bind(this)}>
            رزرو کنید
          </Button>
        </div>
      );
    }
      else{
        return(
          <div className='reserve-button-div'>
            <Button color='orange' className='reserve-button disabled' onClick ={this.handleClick.bind(this)}>
              رزرو کنید
            </Button>
          </div>
        );
      }

  }
  render(){
  {this.renderToDatePicker()}
  {this.renderFromDatePicker()}
    return(
      <div>
        <div className="guestnumber-div">
          <GuestNumber />
        </div>
        <div className="divider-card">
        </div>

        <div>
          <input className="date-picker-input  form-control1"
                id='fromdatepicker'
                ref='fromdatepicker'
                placeholder='تاریخ ورود'
                style={{direction:'rtl',textAlign:'center'}}/>
        </div>
        <div>
          <input className="date-picker-input  form-control1"
                 id='todatepicker'
                 ref='todatepicker'
                 placeholder='تاریخ خروج'
                 style={{direction:'rtl',textAlign:'center'}}/>
        </div>
          {this.renderPriceDetails()}
          {this.renderReserveButton()}
          <Modal show={this.state.showPreBill}
            onHide={()=>{this.setState({showPreBill:false})}}>
            <div>
              <div>
                آیا مایل به رزرو خانه هستید؟
              </div>
            {this.showBookButton()}
            </div>
          </Modal>
      </div>
    );
  }
}
export default ReservePanel;
