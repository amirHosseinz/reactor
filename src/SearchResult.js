import React from 'react';
import { findDOMNode } from 'react-dom';
import { Button } from 'semantic-ui-react';
import { Typeahead ,MenuItem,Menu , menuItemContainer,Highlighter} from 'react-bootstrap-typeahead';
import SearchResultItem from './SearchResultItem';
import $ from 'jquery';
import './tools/DatePicker/bootstrap-datepicker.fa.js';
import './tools/DatePicker/bootstrap-datepicker.js';
import './tools/DatePicker/bootstrap-datepicker.css';
import utf8 from 'utf8';


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



class SearchResult extends React.Component{
  constructor(props){
    super(props);
    this.state={
      city:localStorage['selected-city-search'],
      houseList:[],
      token: null,
      searchParams : {
        location: '',
        start_date: new Date(),
        end_date: new Date(),
        capacity: null,
      },
    };
  }
  componentWillMount(){
    this.renderToDatePicker();
    this.renderFromDatePicker();
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
    var url = window.location.href.split('/');

    var city = url[4].split('%');
    city.shift();
    var farsiChar;
    for (var i=0 ; i<city.length/2;i++){
      farsiChar= city[2*i] + city[2*i+1];
      // var A = '\xDA\xA9';
      // var B = utf8.decode(utf8.encode("\\x".concat(city[2*i])).concat(utf8.encode("\\x".concat(city[2*i+1]))));
    }
    // return [String.fromCharCode(url[4])];
    return [localStorage['selected-city-search']];
  }

  handleClick(){
      localStorage['selected-city-search']=this.state.city;
      window.location.href="/search/" + this.state.city;
  }

  handleClickXs(){
     if(this.state.showOnlyCitySearchBarMobile===true){
       localStorage['selected-city-search']=this.state.city;
     }
     this.setState({showOnlyCitySearchBarMobile:false},()=>{this.setSearchParams()});
  }

  handleSearchByEnter(event){
    if(event.key==="Enter" && this.state.city!==null && this.state.city!==''){
      this.handleClick();
    }
  }
  renderSearchBarInDetails(){
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
                      renderMenu={(results, menuProps) => {
                          return (
                            <Menu {...menuProps}>
                              {results.map((result, index) => (
                                <TypeaheadMenuItem option={result} position={index}>
                                  {result}
                                </TypeaheadMenuItem>
                              ))}
                            </Menu>
                          );
                        }}
                      onKeyDown={(event)=>{this.handleSearchByEnter(event)}}
                      minLength={2}
                      align="right"
                      emptyLabel="نتیجه‌ای یافت نشد"
                      maxResults={5}
                      selected={this.readCityFromURL()}
                      placeholder='هرجا'
                      selectHintOnEnter={false}
                      highlightOnlyResult={true}
                      submitFormOnEnter={false}
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
                  <div className="multi-input-1" dir="rtl" >
                   <select className="form-control1" id="sel1">
                     <option className="guestnumber-option">1 مهمان</option>
                     <option className="guestnumber-option">2 مهمان</option>
                     <option className="guestnumber-option">3 مهمان </option>
                     <option className="guestnumber-option">4 مهمان</option>
                     <option className="guestnumber-option">5 مهمان</option>
                     <option className="guestnumber-option">6 مهمان</option>
                     <option className="guestnumber-option">7 مهمان </option>
                     <option className="guestnumber-option">8 مهمان</option>
                     <option className="guestnumber-option">9 مهمان</option>
                     <option className="guestnumber-option">10 مهمان و بیشتر</option>
                   </select>
                 </div>
                  <div className="multi-input-2">
                  <Button color='blue' type="button" className="search-btn-result"  onClick={this.handleClick.bind(this)} data-reactid="99">
                    <span className='searchicon'>
                      <img src={require('./Images/trpinn_search.png')} className='search-image-result' alt=""></img>
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

  renderSearchBarInDetailsXs(){
     return(
       <div className="serachbar-indetail-xs">
         <Typeahead
           className="typeahead-indetail-sm "
           minLength={2}
           align="right"
           emptyLabel="نتیجه‌ای یافت نشد"
           maxResults={5}
           onKeyDown={(event)=>{this.handleSearchByEnter(event)}}
           selectHintOnEnter={false}
           highlightOnlyResult={true}
           submitFormOnEnter={false}
           selected={[localStorage['selected-city-search']]}
           onInputChange={(input)=> { this.setState({city:input})}}
           onChange={(selected)=>{
             if(selected.length!==0){
               this.setState({city:selected[0]},()=>{this.handleClickXs()});
             }
           }}
           options={listOfCity}
           />
         <input className="date-picker-input form-control1" id='fromdatepicker' ref='fromdatepicker' placeholder='تاریخ ورود'style={{direction:'rtl',textAlign:'center'}}/>
         <input className="date-picker-input form-control1" id='todatepicker' ref='todatepicker' placeholder='تاریخ خروج'style={{direction:'rtl',textAlign:'center'}}/>
         <div className="guestholder-xs" dir="rtl">
          <select className="form-control1" id="sel1">
            <option>1 مهمان</option>
            <option>2 مهمان</option>
            <option>3 مهمان </option>
            <option>4 مهمان</option>
            <option>5 مهمان</option>
            <option>6 مهمان</option>
            <option>7 مهمان </option>
            <option>8 مهمان</option>
            <option>9 مهمان</option>
            <option>10 مهمان و بیشتر</option>
          </select>
          </div>
          <Button color='blue' className="search-btn-result-xs"  onClick={this.handleClickXs.bind(this)} data-reactid="99">
            <span className='searchicon'>
              <img src={require('./Images/trpinn_search.png')} className='search-image-result-xs' alt=""></img>
            </span>
          </Button>
       </div>
     );
  }

  renderHousesCol1 () {
    var results = [];
    var initList = this.state.houseList.map((houseItem) => {
      return(
        <div className="pre-img-result full-width"
         key = {houseItem.id}>
         <SearchResultItem
          room = {houseItem}
          preview ={"https://www.trypinn.com" + houseItem.preview} />
        </div>
      );
    });
    var counter = 0;
    var listOfOne = [];
    initList.map((item) => {
      counter++;
      listOfOne.push(item);
      if (counter===1) {
        counter = 0;
        results.push(
          <div className="row">
          {listOfOne}
          </div>
        );
        listOfOne = [];
      }
    });
    if (listOfOne.length > 0) {
      results.push(
        <div className="row">
        {listOfOne}
        </div>
      );
    }
    return results;
  }
  render(){
    this.renderToDatePicker();
    this.renderFromDatePicker();
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
            {this.renderSearchBarInDetailsXs()}
            {this.renderHousesCol1()}

            <div className='mobile-margined-search'>
              <div className="main-zone-xs col-md-12">
              </div>
            </div>
          </div>
      </div>
      <div className="downlaod-app-mobile">
        <div className='mobile-margined-search'>
          <div className="img-iphone col-xs-5">
            <img src={require('./Images/phone-app.png')} className='iphone' alt="اپلیکیشن تریپین"></img>
          </div>
          <div className="img-download col-xs-6">
            <a href="https://cafebazaar.ir/app/com.trypinn/">
              <img src={require('./Images/bazaar.svg')} className='bazar-ico' alt="دانلود از بازار"></img>
            </a>
            <img src={require('./Images/button-app-store.svg')} className='bazar-ico' alt=" دانلود از سیب‌اپ"></img>
          </div>
        </div>
      </div>
      </div>
      </div>
    );
  }
}


export default SearchResult;
