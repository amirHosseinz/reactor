import React from 'react';
import SearchResult from './SearchResult';
import {Typeahead} from 'react-bootstrap-typeahead'; // ES2015
import { Button} from 'semantic-ui-react';
import {findDOMNode} from 'react-dom';
import $ from 'jquery';
import './tools/DatePicker/bootstrap-datepicker.fa.js';
import './tools/DatePicker/bootstrap-datepicker.js';
import './tools/DatePicker/bootstrap-datepicker.css';


class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      token: null,
      showOnlyCitySearchBar:true,
      houseList:[],
      cityList:[],
      cityListFromServer:null,
      city:null,
      searchParams : {
        location: '',
        start_date: null,
        end_date: null,
        capacity: null,
      },
    };
  }

  getRelevantToken(){
    return localStorage['token'];
  }
  componentWillMount(){
    this.setState({
      token : this.getRelevantToken(),
    }, () => {this.getCityListFromServer()});
  }
  renderData(houseData) {
   this.setState({
     houseList: houseData.room,
   });
  }

  renderSearchBarInDetails(){
    return(
      <div className="render-results row">
            <div className="results-search">
              <div className="results-serach-child">
                <div className="col-md-3">
                </div>
                <div className="search-inputs col-md-9">
                  <div className="multi-input-1 col-md-2">
                    <Typeahead
                      className="typeahead-indetail-xl"
                      minLength="2"
                      align="right"
                      emptyLabel="نتیجه‌ای یافت نشد"
                      maxResults="5"
                      placeholder={this.state.city}
                      onChange={(selected)=>{this.setState({city:selected[0]}
                      )}}
                      options={this.state.cityList}
                      />
                  </div>
                  <div className="multi-input-1 col-md-2">
                  </div>
                  <div className="multi-input-1 col-md-2">
                    <input className="date-picker-input input-sm form-control" id='fromdatepicker' ref='fromdatepicker' placeholder='تاریخ ورود'style={{direction:'rtl',textAlign:'center'}}/>
                  </div>
                  <div className="multi-input-1 col-md-2">
                    <input className="date-picker-input input-sm form-control" id='todatepicker' ref='todatepicker' placeholder='تاریخ خروج'style={{direction:'rtl',textAlign:'center'}}/>
                  </div>
                  <div className="multi-input-number col-md-2" dir="rtl" >
                   <select className="form-control" id="sel1">
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
                  <div className="multi-input-2 col-md-1">
                  <Button color='blue' className="search-btn-result"  onClick={this.handleClick.bind(this)} data-reactid="99">
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
              {this.renderHouses()}
            </div>
            <div className="renderresults-main visible-sm">
              {this.renderHouses()}
            </div>
            <div className="padding-search-results">
            </div>
          </div>
      </div>
    );
  }
  renderSearchBarOnlycity(){
    return(
      <div className='only-city-search-bar row'>
        <div className="free-zone col-md-3 col-sm-2"></div>
        <div className="main-zone col-md-6 col-sm-8">
          <div className="row">
          <div className="xxxz col-md-2 col-sm-1"></div>
          <div className="xxx col-md-8 col-sm-10">
            <div className="slogenholder">
              <div className="seach-top-slogan-container">
                <img src={require('./Images/tripinn_suitcase.png')} className='suitcase-image' alt="Trippin-Suitcase"></img>
                <div className="slogan-container">
                  <p className='slogan-1' >!سفرت رو شیرین‌تر کن</p>
                  <p className='slogan-2' >!اجاره اقامتگاه و ویلا از همیشه آسون‌تر شده</p>
                </div>
              </div>
            </div>

          </div>
          <div className="xxxz col-md-2 col-sm-1"></div>
          </div>
            <div className="searchbar-zone">
                <Typeahead
                  bsSize="large"
                  placeholder="!مقصد خود را وارد نمایید"
                  align="right"
                  lableKey="name"
                  minLength="2"
                  emptyLabel="نتیجه‌ای یافت نشد"
                  maxResults="5"
                  emptyLabel="نتیجه‌ای یافت نشد"
                  className="typeahead-onlycity-xl"
                  onChange={(selected) => {this.setState({city:selected[0]})
                  }}
                  options={this.state.cityList}
                  />
              <Button color='blue' className="search-btn btn"  onClick={this.handleClick.bind(this)} data-reactid="99">
                <span className='searchicon'>
                  <img src={require('./Images/trpinn_search.png')} className='search-image' alt=""></img>
                </span>
              </Button>
            </div>
        </div>
        <div className="free-zone col-md-3"></div>
      </div>
    );
  }
  renderRelevantSearchBar(){
    if (this.state.showOnlyCitySearchBar ===true){
      return this.renderSearchBarOnlycity();
    }
    else{
      return this.renderSearchBarInDetails();
    }
  }
  renderHouses () {
    var results = [];
    var initList = this.state.houseList.map((houseItem) => {
      return(
        <div className="pre-img-result col-md-2"
         key = {houseItem.id}>
         <SearchResult
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
          <div className="full-width col-md-1">
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
    return results;
  }

  setToken() {
    this.setState({
      token: localStorage['token'],});
  }
  setSearchParams(){
    var spar = {
      location: this.state.city,
      start_date: new Date(),
      end_date: new Date(),
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
        location: this.state.searchParams.location,
        start_date: this.state.searchParams.start_date,
        end_date: this.state.searchParams.end_date,
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
   handleClick(){
     this.setState({showOnlyCitySearchBar:false} , ()=> {this.setSearchParams()});
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
   getCityListFromServer(){
     var request = new Request('https://www.trypinn.com/api/homepage/',{
       method: 'POST',
       headers: new Headers({'Accept': 'application/json','Content-Type': 'application/json',
       'Authorization': 'Token '+this.state.token,})
     });
    fetch(request)
    .then((response) => {
      return response.json();
    })
    .then((response) => {
      this.setState({cityListFromServer:response.location},()=>{this.fillSearchBarOptions()});
    });
   }
   fillSearchBarOptions(){
     var list = [];
     if(this.state.cityListFromServer!==null){
       for (var i=0 ; i<this.state.cityListFromServer.length; i++){
        list.push(this.state.cityListFromServer[i]);
       }
     }
     // list = removeDuplicatesFromList(list);
     var list2 = [];
     for (var i=0 ; i<list.length ; i++) {
       list2.push(list[i].text);
     }
     this.setState({cityList : list2});
   }
  render(){
    {this.renderToDatePicker()}
    {this.renderFromDatePicker()}
    return (
      <div className="searchbarmain">
          <div className="container-fluid hidden-xs visible-xl">
            {this.renderRelevantSearchBar()}
            <div className="col-lg col-sm-12 mb-10">
            </div>
            <div className="col-lg col-sm-12 mb-10">
            </div>
          </div>
          <div className="container-fluid hidden-xl visible-xs">
              <div className='mobile-margined-search'>
                <div className="main-zone-xs col-md-12">
                  <div className="row">
                    <div className="seach-top-slogan-xs-container col-md-12">
                        <p className='slogan-xs'>تریپین</p>
                    </div>
                  <div className="row col-md-12">
                    <p className='slogan-xss'>سامانه رزرو ویلا و اقامتگاه</p>
                  </div>
                  </div>
                    <div className="searchbar-zone-mobile">
                      <Typeahead
                        bsSize="sm"
                        placeholder="!مقصد خود را وارد نمایید"
                        align="right"
                        lableKey="name"
                        minLength="2"
                        emptyLabel="نتیجه‌ای یافت نشد"
                        maxResults="5"
                        className="typeahead-onlycity-sm"
                        onChange={(selected) => {this.setState({city:selected[0]})
                        }}
                        options={this.state.cityList}
                        />
                        <Button color='blue' className="search-btn-xs" onClick={this.handleClick.bind(this)} data-reactid="99">
                          <span className='searchicon'>
                            <img src="http://image.ibb.co/fjdMQG/trpinn_search.png" className='search-image-xs' alt=""></img>
                          </span>
                        </Button>
                    </div>
                    <div className="serachbar-indetail-xs">
                      <Typeahead
                        className="typeahead-indetail-sm"
                        minLength="2"
                        align="right"
                        emptyLabel="نتیجه‌ای یافت نشد"
                        maxResults="5"
                        placeholder={this.state.city}
                        onChange={(selected)=>{this.setState({city:selected[0]}
                        )}}
                        options={this.state.cityList}
                        />
                      <input className="date-picker-input" id='fromdatepicker' ref='fromdatepicker' placeholder='تاریخ ورود'style={{direction:'rtl',textAlign:'center'}}/>
                      <input className="date-picker-input" id='todatepicker' ref='todatepicker' placeholder='تاریخ خروج'style={{direction:'rtl',textAlign:'center'}}/>
                      <div className="multi-input-number col-md-2" dir="rtl" >
                       <select className="form-control" id="sel1">
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
                       <Button color='blue' className="search-btn-result-xs"  onClick={this.handleClick.bind(this)} data-reactid="99">
                         <span className='searchicon'>
                           <img src={require('./Images/trpinn_search.png')} className='search-image-result-xs' alt=""></img>
                         </span>
                       </Button>
                     </div>
                    </div>
                    {this.renderHouses()}
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
export default SearchBar;
