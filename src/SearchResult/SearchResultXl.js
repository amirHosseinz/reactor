import React from 'react';
import SearchResultItem from '../SearchResultItem';
import GuestNumberSearchBar from '../GuestNumberSearchBar.js'
import {Dropdown} from 'semantic-ui-react';
import "./SearchResult.css";
import { englishToPersianDigits } from '../tools/EnglishToPersianDigits';
import momentJalaali from 'moment-jalaali';
import '../tools/calendar/initialize.js';
import '../tools/calendar2/lib/css/_datepicker.css';
import {DateRangePicker} from '../tools/calendar2';
import Sticky from 'react-sticky';
import {PulseLoader} from 'react-spinners';
import MetaTags from 'react-meta-tags';
import {productionURL} from'../Data.js';


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
      itemsLoaded:false,
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

  componentWillReceiveProps(){
    var city=this.readCityFromURL();
    if(city!==null){
          this.setState({city:city[0]});
    }
    else{
        this.setState({city:city});
    }
    this.setState({token : this.getRelevantToken()},()=>{this.setSearchParams()});
  }

  setSearchParams(){
    var spar = {
      location: this.state.city,
      start_date: this.state.startDate,
      end_date: this.state.endDate,
      capacity: this.state.numberOfGuests,
    };
    this.setState({
      searchParams: spar,itemsLoaded:false},() => {
    this.getDataFromServer();
    });
  }
  getDataFromServer() {
   var request = new Request(productionURL + 'api/v1/search/light/',{
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
   this.setState({houseList: houseData.room,itemsLoaded:true, city:houseData.selected_location});
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
        <Sticky>
          {({style,isSticky})=>{
            return(
              <div style={style} className={isSticky?"results-search-sticky":"results-search-not-sticky"}>
                <div className="results-serach-child">
                  <div className="search-results-filters-container">
                    <p className="search-result-filter-label"> :فیلترها </p>
                    <div>
                      <button onClick={()=>{this.openGuestNumberDropdown()}}className="search-result-filter-button"  style={{direction:'rtl',textAlign:'center'}}>
                        <span>
                          <img src={require('../Images/guest-number-icon.png')} className='guest-number-icon' alt=""/>
                        </span>
                        <span className="guest-number-text">
                         {englishToPersianDigits(this.state.numberOfGuests)} مهمان
                        </span>
                      </button>
                      <div className="serach-result-number-of-guests-input">
                        {this.renderGuest()}
                      </div>
                    </div>
                    <div className="search-result-date-picker-input-zone">
                      <img className="date-icon-start-date" src={require('../Images/date-icon.png')} alt="" width='20' height='20' />
                      <img className="date-icon-end-date" src={require('../Images/date-icon.png')} alt="" width='20' height='20' />
                      <div className="search-result-date-picker-input">
                        <DateRangePicker
                          startDatePlaceholderText="تاریخ ورود"
                          endDatePlaceholderText="تاریخ خروج"
                          startDate={this.state.startDate}
                          customArrowIcon={<div></div>}
                          hideKeyboardShortcutsPanel={true}
                          numberOfMonths={2}
                          isRTL={true}
                          readOnly={true}
                          anchorDirection='right'
                          startDateId="your_unique_start_date_id"
                          endDate={this.state.endDate}
                          endDateId="your_unique_end_date_id"
                          onDatesChange={({startDate,endDate})=>{this.setState({startDate:startDate,endDate:endDate},()=>{this.handleClick()})}}
                          focusedInput={this.state.focusedInput}
                          reopenPickerOnClearDates={true}
                          onFocusChange={focusedInput => this.setState({focusedInput})}
                          renderMonth={(month) => momentJalaali(month).format('jMMMM jYYYY')}
                          renderDayContents={(day) => momentJalaali(day).format('jD')}
                          keepOpenOnDateSelect={false}/>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          }}
        </Sticky>
          <div className="render-houses-row">
            <div className="padding-search-results-top">
            </div>
            <div className="">
              {this.renderHouseItems()}
            </div>
            <div className="padding-search-results">
            </div>
          </div>
      </div>
    );
  }

  renderHouseItems(){;
    if(this.state.itemsLoaded===true) {
      return this.renderHousesCol5();
    }
    else{
      return(
        <div className="search-result-loading-item">
          <PulseLoader color="#12b2ce" size={15} loading={!this.state.itemsLoaded} />
        </div>
      );
    }
  }

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


  render(){
    return(
      <div className="searchbarmain">
        <MetaTags>
          <title>  رزرو ویلا و اقامتگاه بوم‌گردی در {this.readCityFromURL()} | تریپین</title>
        </MetaTags>
        <div className="container-fluid">
          {this.renderSearchBarInDetails()}
        </div>
      </div>
    );
  }
}

export default SearchResultXl;
