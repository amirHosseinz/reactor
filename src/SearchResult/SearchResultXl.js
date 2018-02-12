import React from 'react';
import { findDOMNode } from 'react-dom';
import { Button } from 'semantic-ui-react';
import { Typeahead ,MenuItem,Menu , menuItemContainer} from '../tools/react-bootstrap-typeahead';
import SearchResultItem from '../SearchResultItem';
import $ from 'jquery';
import '../tools/DatePicker/bootstrap-datepicker.fa.js';
import '../tools/DatePicker/bootstrap-datepicker.js';
import '../tools/DatePicker/bootstrap-datepicker.css';
import GuestNumber from '../HouseDetailParts/GuestNumber'
import {Dropdown} from 'semantic-ui-react';
import {Sticky} from 'react-sticky';


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
      houseList: [],
      token: null,
      numberOfGuests: 1,
      OpenDropDown:false,
      Counter:false,
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
    this.renderToDatePicker();
    this.renderFromDatePicker();
    this.setState({token : this.getRelevantToken()},()=>{this.setSearchParams()});
  }


  componentWillReceiveProps(){
    this.setState({token : this.getRelevantToken()},()=>{this.setSearchParams()});
  }
  setSearchParams(){
    var spar = {
      location: this.state.city,
      start_date: this.state.searchParams.start_date,
      end_date: this.state.searchParams.end_date,
      capacity: 1,
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
     console.log(homeData);
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
  renderFromDatePicker(){
    const fromDatePicker = findDOMNode(this.refs.fromdatepicker);
    $(document).ready(function(){
      $(fromDatePicker).datepicker({
        changeMonth: true,
        changeYear: true,
        isRTL: true,
        numberOfMonths:1,
        showButtonPanel:true,
        dateFormat: "yy/m/d",
       });
    });
  }

  renderGuest(){
    return(
      <div   >
        <GuestNumber changeNumberOfGuests={this.changeNumberOfGuests.bind(this)} />
      </div>
    );
  }


  changeNumberOfGuests(number){
    this.setState({numberOfGuests:number});
  }

  renderToDatePicker(){
    const toDatePicker = findDOMNode(this.refs.todatepicker);
    $(document).ready(function(){
      $(toDatePicker).datepicker({
        changeMonth: true,
        changeYear: true,
        numberOfMonths:1,
        showButtonPanel:true,
        isRTL: true,
        dateFormat: "yy/m/d",
       });
    });
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
    if(this.state.city==='' || this.state.city === null){
      this.props.history.replace("/search/هر جا");
    }
    else{
       this.props.history.replace("/search/" + this.state.city);
    }
  }
  renderSearchBarInDetails(){
    this.renderFromDatePicker();
    this.renderToDatePicker();
    return(
          <div className="render-results row">
                <div className="results-search">
                  <div className="results-serach-child">
                    <div className="col-md-3">
                    </div>
                    <div className="search-inputs col-md-9">
                      <div className="multi-input-typeahead">
                      <Typeahead
                        className="typeahead-indetail-xl"
                        renderMenu={(results,menuProps) => {
                            return(
                              <Menu {...menuProps}>
                                {results.map((result, index) => (
                                  <TypeaheadMenuItem option={result} position={index}>
                                    {result}
                                  </TypeaheadMenuItem>
                                ))}
                              </Menu>
                            );
                          }}
                        minLength={2}
                        align="right"
                        emptyLabel="نتیجه‌ای یافت نشد"
                        maxResults={5}
                        selected={this.readCityFromURL()}
                        placeholder='هر جا'
                        onInputChange={(input)=> {this.setState({city:input})}}
                        selectHintOnEnter={false}
                        highlightOnlyResult={true}
                        submitFormOnEnter={true}
                        onChange={(selected)=>{
                          if(selected.length!==0){
                            this.setState({city:selected[0]},()=>{this.handleClick()});
                          }
                        }}
                      options={listOfCity}
                        />
                      </div>

                      <div className="multi-input-1">
                        <input className="date-picker-input  form-control1" id='fromdatepicker' ref='fromdatepicker' placeholder='تاریخ ورود'style={{direction:'rtl',textAlign:'center'}}/>
                      </div>
                      <div className="multi-input-1">
                        <input className="date-picker-input  form-control1" id='todatepicker' ref='todatepicker' placeholder='تاریخ خروج'style={{direction:'rtl',textAlign:'center'}}/>
                      </div>
                      <div className="multi-input-1">
                        <input className="dropdown form-control1" placeholder={this.state.numberOfGuests + " نفر "} style={{direction:'rtl',textAlign:'center'}}/>
                      </div>



                      <div className="multi-input-2">
                      <Button color='blue' type="button" className="search-btn-result" onClick={()=>{this.handleClick()}} data-reactid="99">
                        <span className='searchicon'>
                          <img src={require('../Images/trpinn_search.png')} className='search-image-result' alt=""></img>
                        </span>
                      </Button>
                      </div>
                      <div className="col-md-6">
                      </div>
                    </div>
                  </div>
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

 //  <div className="multi-input-1" dir="rtl"  >
 //  <Dropdown className="drop" icon={""} dir="rtl"  text={''} >
 //    <Dropdown.Menu onClick={(event)=>{event.stopPropagation()}}>
 //    {this.renderGuest()}
 //    </Dropdown.Menu>
 // </Dropdown>
 // </div>

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
