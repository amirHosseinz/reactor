import React from 'react';
import GuestNumber from '../GuestNumber.js';
import {englishToPersianDigits} from '../../tools/EnglishToPersianDigits';
import Modal from 'react-modal';

import '../../tools/calendar/initialize.js';
import '../../tools/calendar2/lib/css/_datepicker.css';
import {DateRangePicker} from '../../tools/calendar';
import {reserveModalStyle} from '../../Styles.js';
import momentJalaali from 'moment-jalaali';
import moment from 'moment-jalaali';
import {parsePrice3digits} from '../../tools/ParsePrice3digits.js';
import './ReservePanel.css';
import Fade from 'react-reveal';
import {ClipLoader} from 'react-spinners';
import {productionURL} from'../../Data.js';


moment.loadPersian({usePersianDigits:false , dialect:'persian-modern'});
class ReservePanelMd extends React.Component{
  constructor(props){
    super(props);
    this.token = '';
    this.state = {
      reserveData : '',
      showGuestNumberPickerDropdown:false,
      showPreBill:false,
      token:null,
      numberOfGuests: 1,
      requestParams :{
        fromDate:null,
        toDate:null,
      },
      discountCodeAccepted:false,
      discountCodeApplied:false,
      totalPrice:0,
      discountCode : '',
      focusedInput:null,
      dateNotSelected:false,
      startDate:null,
      endDate:null,
      priceLoading:false,
    };
  }
  renderOrdinaryPriceForPerPerson(){
    if(this.state.reserveData.ordinary_price!==0){
      return(
        <div className="pre-bill-price-night-content row-reverse" dir="rtl">
          <p className="pre-bill-price-night-sentence">هزینه شب‌های عادی
            ({englishToPersianDigits(this.state.reserveData.ordinary_duration)} شب - {englishToPersianDigits(this.state.numberOfGuests)} نفر ) :
          </p>
          <p className="pre-bill-price-night-value">
           {englishToPersianDigits(parsePrice3digits(this.state.reserveData.ordinary_price))}
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
          <p className="pre-bill-price-night-sentence">هزینه شب‌های آخر هفته
            ({englishToPersianDigits(this.state.reserveData.weekend_duration)} شب - {englishToPersianDigits(this.state.numberOfGuests)} نفر ) :
          </p>
          <p className="pre-bill-price-night-value">
             {englishToPersianDigits(parsePrice3digits(this.state.reserveData.weekend_price))}
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
          <p className="pre-bill-price-night-sentence">هزینه شب‌های خاص
            ({englishToPersianDigits(this.state.reserveData.special_duration)}شب - {englishToPersianDigits(this.state.numberOfGuests)} نفر) :
          </p>
          <p className="pre-bill-price-night-value">
           {englishToPersianDigits(parsePrice3digits(this.state.reserveData.special_price))}
             تومان
          </p>
        </div>
      );
    }
  }
  renderNowRuzForPerPerson(){
    if(this.state.reserveData.nowruz_price!==0){
      return(
        <div className="pre-bill-price-night-content row-reverse" dir="rtl">
          <p className="pre-bill-price-night-sentence">هزینه شب‌های نوروز
            ({englishToPersianDigits(this.state.reserveData.nowruz_duration)}شب - {englishToPersianDigits(this.state.numberOfGuests)} نفر) :
          </p>
          <p className="pre-bill-price-night-value">
           {englishToPersianDigits(parsePrice3digits(this.state.reserveData.nowruz_price))}
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
          <p className="pre-bill-price-night-sentence">هزینه شب‌های عادی
             ( {englishToPersianDigits(this.state.reserveData.ordinary_duration)} شب ) :
          </p>
          <p className="pre-bill-price-night-value">
             {englishToPersianDigits(parsePrice3digits(this.state.reserveData.ordinary_price))}
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
          <p className="pre-bill-price-night-sentence">هزینه شب‌های آخر هفته
            (  {englishToPersianDigits(this.state.reserveData.weekend_duration)} شب ) :
          </p>
          <p className="pre-bill-price-night-value">
           {englishToPersianDigits(parsePrice3digits(this.state.reserveData.weekend_price))}
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
          <p className="pre-bill-price-night-sentence">هزینه شب‌های خاص
          (  {englishToPersianDigits(this.state.reserveData.special_duration)} شب ) :
          </p>
          <p className="pre-bill-price-night-value">
           {englishToPersianDigits(parsePrice3digits(this.state.reserveData.special_price))}
             تومان
          </p>
        </div>
      );
    }
  }
  renderNowruzPriceForPerNight(){
    if(this.state.reserveData.nowruz_price!==0){
      return(
        <div className="pre-bill-price-night-content row-reverse" dir="rtl">
          <p className="pre-bill-price-night-sentence">هزینه شب‌های نوروز
          (  {englishToPersianDigits(this.state.reserveData.nowruz_duration)} شب ) :
          </p>
          <p className="pre-bill-price-night-value">
           {englishToPersianDigits(parsePrice3digits(this.state.reserveData.nowruz_price))}
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
      <p className="pre-bill-price-night-sentence"> جمع هزینه‌ها :
      </p>
      <p className="pre-bill-price-night-value"> {englishToPersianDigits(parsePrice3digits(this.state.reserveData.total_price))}
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
      dateNotSelected:false,
      token : localStorage['token'],
    },
      ()=>this.setSearchParams(this.getDataFromUser()));
  }
  getDataFromUser(){
      return({fromDate :this.state.startDate,
              toDate: this.state.endDate,
              numberOfGuests : this.state.numberOfGuests,
              discountCode : ''});
  }
  setSearchParams(reqpar){
    this.setState({requestParams:reqpar,priceLoading:true,},() => {this.getDataFromServer()});
  }

  getDataFromServer(){
    if(this.state.requestParams.fromDate=== null || this.state.requestParams.toDate=== null){
      this.setState({dateNotSelected:true,priceLoading:false,});
      return;
    }
    switch(window.location.href.split("/")[window.location.href.split("/").length-2]){
      case 'rooms':{
        var request = new Request(productionURL + 'api/room/get_price/',{
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
         this.setState({priceLoading:false,});
         return response.json();
       })
       .then((reserve_data) => {
          this.setState({totalPrice:reserve_data.total_price ,reserveData:reserve_data,showPreBill:true});
       })
       .catch((error)=>{
         this.setState({priceLoading:false,});
       });
        return;
      }
      case 'ecotourism':{
        var request = new Request(productionURL + 'api/room/get_price/',{
          method: 'POST',
          body: JSON.stringify({
            eco_room_id:this.props.homeData.id,
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
         this.setState({priceLoading:false});
         return response.json();
       })
       .then((reserve_data) => {
         this.setState({totalPrice:reserve_data.total_price ,reserveData:reserve_data,showPreBill:true});
       })
       .catch((error)=>{
         this.setState({priceLoading:false});
       })
        return;
      }
    }
 }

 sendBookRequest(){
   if(localStorage['isLoggedIn']==="false"){
     this.props.setTriggerLoginOrigin('book-request');
     this.props.enableTriggerLogin();
     return;
   }
   switch(window.location.href.split("/")[window.location.href.split("/").length-2]){
     case 'rooms':{
       var request = new Request(productionURL + 'api/room/request/book/', {
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
       break;
     }

     case 'ecotourism':{
       var request = new Request(productionURL + 'api/ecoroom/request/book/', {
         method: 'POST',
         body: JSON.stringify({
           eco_room_id : this.props.homeData.id,
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
       break;
     }
   }
  }

  renderReserveButton(){
    return(
      <button onClick={()=>{this.setToken()}} className="reserve-panel-reserve-button-active">
        {this.state.priceLoading===true ? <ClipLoader color="white" size={35}/> : "محاسبه هزینه"}
       </button>
    );
  }


  UpdatePrice(){
    switch(window.location.href.split("/")[window.location.href.split("/").length-2]){
      case 'rooms':{
        var request = new Request(productionURL + 'api/room/get_price/',{
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
           this.setState({discountCodeApplied:true,discountCodeAccepted:true, totalPrice : discountResponse.total_price});
         }
         else{
          this.setState({discountCodeApplied:true,discountCodeAccepted:false, totalPrice : discountResponse.total_price});
         }
       });
        break;
      }
      case 'ecotourism':{
        var request = new Request(productionURL + 'api/room/get_price/',{
          method: 'POST',
          body: JSON.stringify({
            eco_room_id:this.props.homeData.id,
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
           this.setState({discountCodeApplied:true,discountCodeAccepted:true, totalPrice : discountResponse.total_price});
         }
         else{
          this.setState({discountCodeApplied:true,discountCodeAccepted:false, totalPrice : discountResponse.total_price});
         }
       });
        break;
      }
    }
  }
  renderDiscountStatus(){
      return (
        <p className= "clickable-p pre-bill-discount-sentence" onClick={()=>{this.setTokenForDiscount()}}>
          بررسی کد تخفیف
        </p>
      );
  }

  getClassNameForDiscountCodeBox(){
    if(this.state.discountCodeAccepted===true){
      return "pre-bill-discount-value-discount-code-accepted";
    }
    if(this.state.discountCodeAccepted===false){
      return "pre-bill-discount-value-discount-code-rejected";
    }
  }


  renderPreBill(){
    if(this.state.reserveData!=='' && this.state.reserveData!==undefined && this.state.reserveData!==null){
      return(
        <Modal isOpen={this.state.showPreBill}
          style={reserveModalStyle}
          onRequestClose={()=>{this.setState({showPreBill:false,discountCode:''})}}>
          <div className="pre-bill-main-division">
            <div className="pre-bill-header-section">
              <div onClick= {()=>{this.setState({showPreBill:false,discountCode:''})}} className="close-modal-phone-number">
              </div>
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
                      <p>{this.props.homeData.address}</p>
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
                    <p className="duration-text">
                      <span className="pre-bill-date-item"> {englishToPersianDigits(this.state.reserveData.ordinary_duration + this.state.reserveData.weekend_duration +this.state.reserveData.special_duration +this.state.reserveData.nowruz_duration)} روز اقامت  </span>
                    </p>
                  </div>
                </div>
                <hr/>
                <div className="pre-bill-price-section">
                  {this.renderDifferentTypesPrices()}
                  {this.renderTotalPrice()}
                </div>
                  <div className="pre-bill-discount-section row-reverse" dir="rtl">
                    <input className={this.state.discountCodeApplied?this.getClassNameForDiscountCodeBox():"pre-bill-discount-value form-control-tripinn"}
                    value={this.state.discountCode}
                          placeholder="ورود کد تخفیف"
                          onChange={(event)=>{this.setState({totalPrice:this.state.reserveData.total_price,discountCodeApplied:false,discountCode:event.target.value})}}/>
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
                  {englishToPersianDigits(parsePrice3digits(this.state.totalPrice))}
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
    this.setState({showGuestNumberPickerDropdown:false});
  }


  renderGuestNumberPickerDropdown(){
    if(this.state.showGuestNumberPickerDropdown===true){
      return(
        <div className="reserve-panel-number-of-guests-dropdown">
          <GuestNumber guestNumber={this.state.numberOfGuests} changeNumberOfGuests={this.changeNumberOfGuests.bind(this)}/>
        </div>
      );
    }
  }

  openGuestNumberDropdown(){
    if (!this.state.showGuestNumberPickerDropdown) {
  document.addEventListener('click', this.handleOutsideClick, false);
    }
    else {
      document.removeEventListener('click', this.handleOutsideClick, false);
    }
    this.setState((prevState) => ({showGuestNumberPickerDropdown: !prevState.showGuestNumberPickerDropdown}));
  }
  handleOutsideClick = (e)=>{
    if (this.node.contains(e.target)) {
      if(e.target.textContent.trim()==='بستن'){
        this.openGuestNumberDropdown();
      }
      return;
    }
    this.openGuestNumberDropdown();
  }

  renderReservePanelVersion2(){
    return(
      <div className="reserve-panel-contents">
        <div className="reserve-panel-number-of-guests-division">
          <p className="reserve-panel-description">
            تعداد مهمان
          </p>
          <div ref={(node)=>{this.node = node}} className="reserve-panel-number-of-guests-input">
            <button className="reserve-panel-enter-number-of-guests-button" onClick={()=>{this.openGuestNumberDropdown()}}> {englishToPersianDigits(this.state.numberOfGuests)} نفر </button>
            {this.renderGuestNumberPickerDropdown()}
          </div>
        </div>
        <div className="reserve-panel-date-picker-division">
          <p className="reserve-panel-description">
            تاریخ ورود و خروج
          </p>
          <div className={this.state.dateNotSelected ? "reserve-panel-date-picker-input-error": "reserve-panel-date-picker-input"}>
            <DateRangePicker
              startDatePlaceholderText="تاریخ ورود"
              endDatePlaceholderText="تاریخ خروج"
              startDate={this.state.startDate}
              customArrowIcon={<div></div>}
              hideKeyboardShortcutsPanel={true}
              numberOfMonths={1}
              readOnly={true}
              isRTL={true}
              anchorDirection='right'
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
        <Fade bottom={true} when={this.state.dateNotSelected}>
        <p className="reserve-panel-error">
          لطفا تاریخ مورد نظر خود را انتخاب کنید
        </p>
        </Fade>
        <div className="reserve-panel-reserve-button-division">
          {this.renderReserveButton()}
        </div>

      </div>
    );
  }

  render(){
    return(
      <div>
        {this.renderPreBill()}
        {this.renderReservePanelVersion2()}
      </div>
    );
  }
}


export default ReservePanelMd;
