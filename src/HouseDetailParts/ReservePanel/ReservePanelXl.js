import React from 'react';
import GuestNumber from '../GuestNumber.js';
import {Button} from 'semantic-ui-react';
import {englishToPersianDigits} from '../../tools/EnglishToPersianDigits';
import {findDOMNode} from 'react-dom';
import Modal from 'react-modal';

import '../../tools/calendar/initialize.js';
import '../../tools/calendar/lib/css/_datepicker.css';
import {DateRangePicker} from '../../tools/calendar';

import momentJalaali from 'moment-jalaali';
import {reserveModalStyle} from '../../Styles.js';
import moment from 'moment-jalaali';
import {parsePrice3digits} from '../../tools/ParsePrice3digits.js';
import './ReservePanel.css';

moment.loadPersian({usePersianDigits:false , dialect:'persian-modern'});
class ReservePanelXl extends React.Component{
  constructor(props){
    super(props);
    this.token = '';
    this.state = {
      reserveData : '',
      showguestNumberPickerDropdown:false,
      showPreBill:false,
      token:null,
      numberOfGuests: 1,
      requestParams :{
        fromDate:null,
        toDate:null,
      },
      totalPrice:0,
      discountCode : '',
      startDate:null,
      endDate:null,
    };
  }
  renderOrdinaryPriceForPerPerson(){
    if(this.state.reserveData.ordinary_price!==0){
      return(
        <div className="pre-bill-price-night-content row-reverse" dir="rtl">
          <p className="pre-bill-price-night-sentence">هزینه شب های عادی
            ({englishToPersianDigits(this.state.reserveData.ordinary_duration)} شب - {englishToPersianDigits(this.state.reserveData.number_of_guests)} نفر ) :
          </p>
          <p className="pre-bill-price-night-value">
           {englishToPersianDigits(this.state.reserveData.ordinary_price)}
             تومان
          </p>
        </div>
      );
    }
  }

  renderWeekendPriceForPerPerson(){
    if(this.state.reserveData.weekend_price!==0){
      return(
        <div className="pre-bill-price-night-content row-reverse" dir="rtl">
          <p className="pre-bill-price-night-sentence">هزینه شب های آخر هفته
            ({englishToPersianDigits(this.state.reserveData.weekend_duration)} شب - {englishToPersianDigits(this.state.reserveData.number_of_guests)} نفر ) :
          </p>
          <p className="pre-bill-price-night-value">
             {englishToPersianDigits(this.state.reserveData.weekend_price)}
               تومان
          </p>
        </div>
      );
    }
  }
  renderSpecialPriceForPerPerson(){
    if(this.state.reserveData.special_price!==0){
      return(
        <div className="pre-bill-price-night-content row-reverse" dir="rtl">
          <p className="pre-bill-price-night-sentence">هزینه شب های خاص
            ({englishToPersianDigits(this.state.reserveData.special_duration)}شب - {englishToPersianDigits(this.state.reserveData.number_of_guests)} نفر) :
          </p>
          <p className="pre-bill-price-night-value">
           {englishToPersianDigits(this.state.reserveData.special_price)}
             تومان
          </p>
        </div>
      );
    }
  }

  renderOrdinaryPriceForPerNight(){
    if(this.state.reserveData.ordinary_price!==0){
      return(
        <div className="pre-bill-price-night-content row-reverse" dir="rtl">
          <p className="pre-bill-price-night-sentence">هزینه شب های عادی
             ( {englishToPersianDigits(this.state.reserveData.ordinary_duration)} شب ) :
          </p>
          <p className="pre-bill-price-night-value">
             {englishToPersianDigits(this.state.reserveData.ordinary_price)}
               تومان
          </p>
        </div>
      );
    }

  }
  renderWeekendPriceForPerNight(){
    if(this.state.reserveData.weekend_price!==0){
      return(
        <div className="pre-bill-price-night-content row-reverse" dir="rtl">
          <p className="pre-bill-price-night-sentence">هزینه شب های آخر هفته
            (  {englishToPersianDigits(this.state.reserveData.weekend_duration)} شب ) :
          </p>
          <p className="pre-bill-price-night-value">
           {englishToPersianDigits(this.state.reserveData.weekend_price)}
             تومان
          </p>
        </div>
      );
    }
  }
  renderSpecialPriceForPerNight(){
    if(this.state.reserveData.special_price!==0){
      return(
        <div className="pre-bill-price-night-content row-reverse" dir="rtl">
          <p className="pre-bill-price-night-sentence">هزینه شب های خاص
          (  {englishToPersianDigits(this.state.reserveData.special_duration)} شب ) :
          </p>
          <p className="pre-bill-price-night-value">
           {englishToPersianDigits(this.state.reserveData.special_price)}
             تومان
          </p>
        </div>
      );
    }
  }
  renderDifferentTypesPrices(){
    if(this.props.homeData.is_price_per_person===false){
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
      <p className="pre-bill-price-night-value"> {englishToPersianDigits(this.state.reserveData.total_price)}
      تومان
      </p>
      </div>
    );
  }
  setTokenForDiscount(){
    this.setState({token:localStorage['token']},()=>{this.UpdatePrice()});
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
              numberOfGuests : this.state.numberOfGuests,
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
        number_of_guests : this.state.numberOfGuests,
        discount_code: this.state.discountCode,
    }),
      headers: new Headers({'Accept': 'application/json','Content-Type':'application/json',
      'Authorization': 'Token '+this.state.token,})
    });
   fetch(request)
   .then((response) => {
     return response.json();
   })
   .then((reserve_data) => {
     this.setState({totalPrice:reserve_data.total_price , reserveData:reserve_data});
   });
 }

 sendBookRequest(){
    var request = new Request('https://www.trypinn.com/api/room/request/book/', {
      method: 'POST',
      body: JSON.stringify({
        room_id : this.props.homeData.id,
        start_date : this.state.requestParams.fromDate,
        end_date : this.state.requestParams.toDate,
        number_of_guests : this.state.numberOfGuests,
        discount_code: this.state.discountCode,
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


  renderReserveButton(){
    if(this.state.reserveData !==''){
      return(
        <div className='reserve-button-div'>
          <Button color='orange' className='reserve-button active' onClick={()=>{this.setState({showPreBill:true})}}>
            رزرو کنید
          </Button>
        </div>
      );
    }
      else{
        return(
          <div className='reserve-button-div'>
            <Button color='orange' className='reserve-button disabled'>
              رزرو کنید
            </Button>
          </div>
        );
      }

  }
  UpdatePrice(){
    var request = new Request('https://www.trypinn.com/api/room/get_price/',{
      method: 'POST',
      body: JSON.stringify({
        room_id:this.props.homeData.id,
        start_date:this.state.requestParams.fromDate,
        end_date:this.state.requestParams.toDate,
        number_of_guests:this.state.numberOfGuests,
        discount_code:this.state.discountCode,
        platform:'web',
    }),
      headers: new Headers({'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Token '+this.state.token,})
    });
   fetch(request)
   .then((response) => {
     return response.json();
   })
   .then((discountResponse) => {
     if(discountResponse.discount_code_error===false){
       this.setState({totalPrice : discountResponse.total_price});
     }
     else{
      alert("کد تخفیف وارد شده اشتباه است")
     }
   });
  }
  renderDiscountStatus(){
      return (
        <p className= "clickable-p pre-bill-discount-sentence" onClick={()=>{this.setTokenForDiscount()}}>
          بررسی کد تخفیف
        </p>
      );
  }
  renderPreBill(){
    if(this.state.reserveData!==''){
      return(
        <Modal isOpen={this.state.showPreBill}
          onRequestClose={()=>{this.setState({showPreBill:false})}}>
          <div className="pre-bill-main-division">
            <div className="pre-bill-header-section">
              <button type="button" class="close" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
              <p>
                جزئیات رزرو اقامتگاه
              </p>
            </div>
            <div className="divider-modal"></div>
            <div className="pre-bill-backgroud">
              <div className="pre-bill-margin-content">
                <div className="pre-bill-house-details">
                  <div className="pre-bill-house-picture">
                      <img src={"https://www.trypinn.com"+this.props.homeData.preview} alt=""height="90px"/>
                  </div>
                  <div>
                    <div className="pre-bill-house-title">
                      <p> {this.props.homeData.title}</p>
                    </div>
                    <div className="pre-bill-house-address">
                      <p>{this.props.homeData.city}، {this.props.homeData.district}</p>
                    </div>
                  </div>
                </div>
                <div className="divider-modal-margined"></div>
                <div className="pre-bill-number-of-guests">
                  <div className="pre-bill-number-of-guests-sentence">
                  <p>:تعداد مسافر</p>
                  </div>
                  <div className="pre-bill-number-of-guests-content" dir="rtl">
                    <span> {englishToPersianDigits(this.state.numberOfGuests)}  </span>
                    <span> نفر </span>
                  </div>
                </div>
                <hr/>
                <div className="pre-bill-dates">
                  <div className="pre-bill-dates-sentence">
                    <p>:تاریخ ورود و خروج</p>
                  </div>
                  <div className="pre-bill-dates-content">
                    <p className="pre-bill-date-item"> از {moment(this.state.requestParams.fromDate).format('jYYYY/jM/jD')}</p>
                    <p className="pre-bill-date-item" >تا {moment(this.state.requestParams.toDate).format('jYYYY/jM/jD')}</p>
                    <p className="row-reverse">
                      <span className="pre-bill-date-item">  روز اقامت</span>
                      <span>
                      {englishToPersianDigits(this.state.reserveData.ordinary_duration + this.state.reserveData.weekend_duration +this.state.reserveData.special_duration)}
                       </span>
                    </p>
                  </div>
                </div>
                <hr/>
                <div className="pre-bill-price-section">
                  {this.renderDifferentTypesPrices()}
                  {this.renderTotalPrice()}
                </div>
                  <div className="pre-bill-discount-section row-reverse" dir="rtl">
                    <input className="pre-bill-discount-value suggestions form-control-tripinn"
                    value={this.state.discountCode}
                          placeholder="ورود کد تخفیف"
                          onChange={(event)=>{this.setState({discountCode:event.target.value})}}/>
                        {this.renderDiscountStatus()}
                  </div>
              </div>
            </div>
            <hr/>
            <div className="pre-bill-adding-up-section row-reverse" dir="rtl">
                <p className="pre-bill-adding-up-sentence">
                  مبلغ قابل پرداخت :
                </p>
                <p className="pre-bill-adding-up-value">
                  {englishToPersianDigits(this.state.totalPrice)}
                  تومان
                </p>
                <div className="pre-bill-margin-optimizer-for-button">
                  <button type="button"className="btn pre-bill-payment-button" onClick={this.sendBookRequest.bind(this)}>ارسال درخواست
                  </button>
                </div>
            </div>
          </div>
        </Modal>
      );
    }
  }

  changeNumberOfGuests(number){
    this.setState({numberOfGuests:number});
  }
  closeNumberOfGuestsDropdown(){
    this.setState({showguestNumberPickerDropdown:false});
  }
  renderGuestNumberPickerDropdown(){
    if(this.state.showguestNumberPickerDropdown===true){
      return(
        <div className="reserve-panel-number-of-guests-dropdown">
          <GuestNumber closeNumberOfGuestsDropdown={this.closeNumberOfGuestsDropdown.bind(this)} changeNumberOfGuests={this.changeNumberOfGuests.bind(this)}/>
        </div>
      );
    }
  }

  renderReservePanelVersion2(){
    return(
      <div className="reserve-panel-contents">
        <div className="reserve-panel-number-of-guests-division">
          <p className="reserve-panel-description">
            تعداد مهمان
          </p>
          <div className="reserve-panel-number-of-guests-input">
            <button className="reserve-panel-enter-number-of-guests-button" onClick={()=>{this.setState({showguestNumberPickerDropdown:true})}}> {englishToPersianDigits(this.state.numberOfGuests)} نفر </button>
              {this.renderGuestNumberPickerDropdown()}
          </div>
        </div>
        <div className="reserve-panel-date-picker-division">
          <p className="reserve-panel-description">
            تاریخ ورود و خروج
          </p>
          <div className="reserve-panel-date-picker-input">
          <DateRangePicker
            startDatePlaceholderText="تاریخ ورود"
            endDatePlaceholderText="تاریخ خروج"
            customArrowIcon={<div></div>}
            startDate={this.state.startDate}
            hideKeyboardShortcutsPanel={true}
            numberOfMonths={2}
            isRTL={true}
            startDateId="your_unique_start_date_id"
            endDate={this.state.endDate}
            endDateId="your_unique_end_date_id"
            onDatesChange={({startDate,endDate})=>{this.setState({startDate:startDate,endDate:endDate})}}
            focusedInput={this.state.focusedInput}
            reopenPickerOnClearDates={true}
            onFocusChange={focusedInput => this.setState({focusedInput})}
            renderMonth={(month) => momentJalaali(month).format('jMMMM jYYYY')}
            renderDayContents={(day) => momentJalaali(day).format('jD')}
            keepOpenOnDateSelect={false}
            />
          </div>
        </div>
        <div className="reserve-panel-reserve-button-division">
          <button className="reserve-panel-reserve-button"> رزرو </button>
        </div>

      </div>
    );

  }

  // <DateRangePicker
  //   startDatePlaceholderText="تاریخ ورود"
  //   endDatePlaceholderText="تاریخ خروج"
  //   startDate={this.state.startDate}
  //   hideKeyboardShortcutsPanel={true}
  //   numberOfMonths={2}
  //   isRTL={true}
  //   startDateId="your_unique_start_date_id"
  //   endDate={this.state.endDate}
  //   endDateId="your_unique_end_date_id"
  //   onDatesChange={({startDate,endDate})=>{this.setState({startDate:startDate,endDate:endDate})}}
  //   focusedInput={this.state.focusedInput}
  //   reopenPickerOnClearDates={true}
  //   onFocusChange={focusedInput => this.setState({focusedInput})}
  //   renderMonth={(month) => momentJalaali(month).format('jMMMM jYYYY')}
  //   renderDayContents={(day) => momentJalaali(day).format('jD')}
  //   keepOpenOnDateSelect={false}
  //   />

  // {this.renderPreBill()}
  // <div className="guestnumber-div">
  //   <GuestNumber changeNumberOfGuests={this.changeNumberOfGuests.bind(this)}/>
  // </div>
  // <div className="divider-card">
  // </div>
  //
  // <div>
  //   <input className="date-picker-input  form-control1"
  //         id='fromdatepicker'
  //         ref='fromdatepicker'
  //         placeholder='تاریخ ورود'
  //         style={{direction:'rtl',textAlign:'center'}}/>
  // </div>
  // <div>
  //   <input className="date-picker-input  form-control1"
  //          id='todatepicker'
    // {this.renderPriceDetails()}
    // {this.renderReserveButton()}


  render(){
    return(
      <div>
        {this.renderReservePanelVersion2()}
      </div>
    );
  }
}

export default ReservePanelXl;
