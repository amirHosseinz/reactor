import React from 'react';
import { findDOMNode } from 'react-dom';
import { Button } from 'semantic-ui-react';
import { Typeahead ,MenuItem,Menu , menuItemContainer} from '../tools/react-bootstrap-typeahead';
import SearchResultItem from '../SearchResultItem';

import GuestNumberSearchBar from '../GuestNumberSearchBar.js'
import {Dropdown} from 'semantic-ui-react';
import "./SearchResult.css";
import { englishToPersianDigits } from '../tools/EnglishToPersianDigits';

// import momentJalaali from 'moment-jalaali';
// import '../tools/calendar2/initialize.js';
// import '../tools/calendar2/lib/css/_datepicker.css';
// import {DateRangePicker} from '../tools/calendar2';


// import ThemedStyleSheet from 'react-with-styles/lib/ThemedStyleSheet';
// import aphroditeInterface from 'react-with-styles-interface-aphrodite';
// import DefaultTheme from '../tools/calendar/lib/theme/DefaultTheme';
//
//
// ThemedStyleSheet.registerInterface(aphroditeInterface);
// ThemedStyleSheet.registerTheme({
//   reactDates: {
//     zIndex : 1,
//     ...DefaultTheme.reactDates,
//     color: {
//       ...DefaultTheme.reactDates.color,
//       highlighted: {
//         backgroundColor: '#82E0AA',
//         backgroundColor_active: '#58D68D',
//         backgroundColor_hover: '#58D68D',
//         color: '#186A3B',
//         color_active: '#186A3B',
//         color_hover: '#186A3B',
//       },
//     },
//   },
// });

const TypeaheadMenuItem = menuItemContainer(MenuItem);
const listOfCity = [
  'اصفهان',
  'نوشهر',
  'گیلان',
  'رامسر',
  'کیش',
  'مازندران',
  'بابلسر',
  'فریدون‌کنار',
  'محمودآباد',
  'عباس‌آباد',
  'شاندیز',
  'خراسان رضوی',
  'بندر انزلی',
  'کاشان',
  'باغ‌بهادران',
  'قلعه‌رودخان',
  'مشهد',
  'چمخاله',
  'فومن',
  'رضوان‌شهر',
  'رودسر',
  'آستارا',
  'زیباکنار',
  'سرخ‌رود',
  'رویان',
  'نور',
  'چالوس',
  'تنکابن',
  'دریاکنار',
  'ایزدشهر',
  'کلاردشت',
  'کلارآباد',
  'سلمان‌شهر',
  'نشتارود',
  'البرز',
];

class SearchResultXl extends React.Component{
  constructor(props){
    super(props);
    this.state={
      city: null,
      houseList:[],
      token: null,
      showGuestNumberPicker:false,
      numberOfGuests: 1,
      OpenDropDown:false,
      Counter:false,
      startDate:null,
      endDate:null,
      searchParams : {
        location: '',
        start_date: new Date(),
        end_date: new Date(),
        capacity: null
      },
    };
  }
  componentWillMount(){
    var city=this.readCityFromURL();
    if(city!==null){
          this.setState({city:city[0]});
    }
    else{
        this.setState({city:city});
    }
    this.setState({token : this.getRelevantToken()},()=>{this.setSearchParams()});
  }

  // componentWillReceiveProps(){
  //   this.setState({token : this.getRelevantToken()},()=>{this.setSearchParams()});
  // }

  setSearchParams(){
    var spar = {
      location: this.state.city,
      start_date: this.state.startDate,
      end_date: this.state.endDate,
      capacity: this.state.numberOfGuests,
    };
    this.setState({
      searchParams: spar
    },() => {
    this.getDataFromServer();
    });
  }
  getDataFromServer(){
    var request = new Request('https://www.trypinn.com/api/search/',{
      method: 'POST',
      body: JSON.stringify({
        platform: 'web',
        location: this.state.searchParams.location,
        start_date: (this.state.searchParams.start_date == null) ? null : this.state.searchParams.start_date.toISOString(),
        end_date: (this.state.searchParams.end_date == null) ? null : this.state.searchParams.end_date.toISOString(),
        capacity: this.state.searchParams.capacity,
    }),
      headers: new Headers({'Accept': 'application/json','Content-Type': 'application/json',
      'Authorization': 'Token '+this.state.token,})
    });
   fetch(request)
   .then((response) => {
     return response.json();
   })
   .then((homeData) => {
     this.renderData(homeData);
   });
  }

  renderData(houseData) {
   this.setState({
     houseList: houseData.room,
   });
  }
  getRelevantToken(){
    return localStorage['token'];
  }

  renderGuest(){
    if(this.state.showGuestNumberPicker===true){
      return(
        <div className="searcu-result-guest-number-dropdown"ref={node=>{this.node=node}}>
          <GuestNumberSearchBar guestNumber={this.state.numberOfGuests} changeNumberOfGuests={this.changeNumberOfGuests.bind(this)} />
        </div>
      );
    }
  }


  changeNumberOfGuests(number){
    this.setState({numberOfGuests:number});
  }

  readCityFromURL(){
    var url = decodeURIComponent(window.location.href.split('/')).split(',');
    if(url[4]==='هر جا'){
      return null;
    }
    else{
      return [url[4]];
    }
  }

  handleClick(){
    if(this.state.city===''){
      this.props.history.replace("/search/هر جا");
    }
    else{
       this.props.history.replace("/search/" + this.state.city);
    }
  }
  handleOutsideClick = (e)=>{
    if (this.node.contains(e.target)) {
      return;
    }
    this.openGuestNumberDropdown();
  }

  openGuestNumberDropdown(){
    if (!this.state.showGuestNumberPicker) {
      document.addEventListener('click', this.handleOutsideClick, false);
    }
    else {
      document.removeEventListener('click', this.handleOutsideClick, false);
      this.setSearchParams();
    }
    this.setState(prevState => ({showGuestNumberPicker: !prevState.showGuestNumberPicker}));
  }
  renderSearchBarInDetails(){
    return(
      <div className="render-results row">
            <div className="results-search">

            </div>
          <div className="render-houses-row">
            <div className="padding-search-results-top">
            </div>
            <div className="renderresults-main hidden-sm">
              {this.renderHousesCol5()}
            </div>
            <div className="renderresults-main visible-sm">
              {this.renderHousesCol3()}
            </div>
            <div className="padding-search-results">
            </div>
          </div>
      </div>
    );
  }

  // <img className="date-icon-start-date" src={require('../Images/date-icon.png')} alt="" width='20' height='20' />
  // <img className="date-icon-end-date" src={require('../Images/date-icon.png')} alt="" width='20' height='20' />
  // <DateRangePicker
  //   startDatePlaceholderText="تاریخ ورود"
  //   endDatePlaceholderText="تاریخ خروج"
  //   startDate={this.state.startDate}
  //   readOnly={true}
  //   customArrowIcon={<div></div>}
  //   anchorDirection="right"
  //   hideKeyboardShortcutsPanel={true}
  //   numberOfMonths={2}
  //   isRTL={true}
  //   startDateId="your_unique_start_date_id"
  //   endDate={this.state.endDate}
  //   endDateId="your_unique_end_date_id"
  //   onClose={()=>{this.setSearchParams()}}
  //   onDatesChange={({startDate,endDate})=>{this.setState({startDate:startDate,endDate:endDate})}}
  //   focusedInput={this.state.focusedInput}
  //   reopenPickerOnClearDates={true}
  //   withClearDatesButton={true}
  //   onFocusChange={focusedInput => this.setState({focusedInput})}
  //   renderMonth={(month) => momentJalaali(month).format('jMMMM jYYYY')}
  //   renderDayContents={(day) => momentJalaali(day).format('jD')}
  //   keepOpenOnDateSelect={false}/>

  renderHousesCol5 () {
    var results = [];
    var initList = this.state.houseList.map((houseItem) => {
      return(
        <div className="pre-img-result col-md-2"
         key = {houseItem.id}>
         <SearchResultItem
          room = {houseItem}
          preview ={"https://www.trypinn.com" + houseItem.preview}/>
        </div>
      );
    });
    var counter = 0;
    var listOfFive = [];
    initList.map((item) => {
      counter++;
      if (counter===1) {
        listOfFive.push(
          <div className="full-width col-md-1 right-align">
          </div>
        );
      }
      listOfFive.push(item);
      if (counter===5) {
        counter = 0;
        results.push(
          <div className="row">
          {listOfFive}
          </div>
        );
        listOfFive = [];
      }
    });
    if (listOfFive.length > 0) {
      results.push(
        <div className="row">
        {listOfFive}
        </div>
      );
    }
    return results;
  }

  renderHousesCol3 () {
    var results = [];
    var initList = this.state.houseList.map((houseItem) => {
      return(
        <div className="pre-img-result col-sm-4"
         key = {houseItem.id}>
         <SearchResultItem
          room = {houseItem}
          preview ={"https://www.trypinn.com" + houseItem.preview} />
        </div>
      );
    });
    var counter = 0;
    var listOfThree = [];
    initList.map((item) => {
      counter++;
      listOfThree.push(item);
      if (counter===3) {
        counter = 0;
        results.push(
          <div className="row">
          {listOfThree}
          </div>
        );
        listOfThree = [];
      }
    });
    if (listOfThree.length > 0) {
      results.push(
        <div className="row">
        {listOfThree}
        </div>
      );
    }
    return results;
  }
  render(){
    return(
      <div className="searchbarmain">
          <div className="container-fluid hidden-xs visible-xl">
            {this.renderSearchBarInDetails()}
            <div className="col-lg col-sm-12 mb-10">
            </div>
            <div className="col-lg col-sm-12 mb-10">
            </div>
          </div>

          <div className="container-fluid hidden-xl visible-xs">
              <div className='mobile-margined-search'>
                <div className="main-zone-xs col-md-12">
                  <div className="row">
                  </div>
            <div className='mobile-margined-search'>
              <div className="main-zone-xs col-md-12">
              </div>
            </div>
          </div>
      </div>
      <div className="downlaod-app-mobile">
        <div className='mobile-margined-search'>
          <div className="img-iphone col-xs-5">
            <img src={require('../Images/phone-app.png')} className='iphone' alt="اپلیکیشن تریپین"></img>
          </div>
          <div className="img-download col-xs-6">
            <a href="https://cafebazaar.ir/app/com.trypinn/">
              <img src={require('../Images/bazaar.svg')} className='bazar-ico' alt="دانلود از بازار"></img>
            </a>
            <img src={require('../Images/button-app-store.svg')} className='bazar-ico' alt=" دانلود از سیب‌اپ"></img>
          </div>
        </div>
       </div>
      </div>
    </div>
    );
  }
}

export default SearchResultXl;
