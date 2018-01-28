import React from 'react';
import SearchResultItem from './SearchResultItem';
import { Typeahead,MenuItem,Menu,menuItemContainer} from 'react-bootstrap-typeahead';
import { Button } from 'semantic-ui-react';
import { findDOMNode } from 'react-dom';
import $ from 'jquery';
import './tools/DatePicker/bootstrap-datepicker.fa.js';
import './tools/DatePicker/bootstrap-datepicker.js';
import './tools/DatePicker/bootstrap-datepicker.css';
import {Dropdown} from 'semantic-ui-react';
import GuestNumber from './GuestNumberSearchBar.js';
import scrollToComponent from 'react-scroll-to-component';
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

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      token: null,
      showOnlyCitySearchBar:true,
      showOnlyCitySearchBarMobile:true,
      houseList:[],
      cityList:[],
      cityListFromServer:null,
      city:'',
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
    document.body.style.backgroundColor = "#f8f8f8";
    this.setState({
      token : this.getRelevantToken(),
    }, );
    // () => {this.getCityListFromServer()}
  }
  renderData(houseData) {
   this.setState({
     houseList: houseData.room,
   });
  }

    handleSearchByEnter(event){
      if(event.key==="Enter" && this.state.city!==null && this.state.city!==''){
        this.handleClick();
      }

    }
  renderSearchBarOnlycity(){
    return(
      <div className='only-city-search-bar row'>
        <div className="free-zone col-md-3 col-sm-2">
        </div>
        <div className="main-zone col-md-6 col-sm-8">
          <div className="row">
          <div className="xxxz col-md-2 col-sm-1"></div>
          <div className="xxx col-md-8 col-sm-10">
            <div className="slogenholder">
              <div className="seach-top-slogan-container">
                <img src={require('./Images/tripinn_suitcase.png')} className='suitcase-image' alt="Trippin-Suitcase"></img>
                <div className="slogan-container">
                  <p className='slogan-1' >سفرت رو شیرین‌تر کن</p>
                  <p className='slogan-2' >اجاره اقامتگاه و ویلا از همیشه آسون‌تر شده</p>
                </div>
              </div>
            </div>
          </div>
          <div className="xxxz col-md-2 col-sm-1"></div>
          </div>
            <div className="searchbar-zone">
                <Typeahead
                    id="searchbox"
                    autoFocus={true}
                    bsSize="large"
                    renderMenu={(results, menuProps) => {
                      return (
                        <Menu {...menuProps}>
                          {results.map((result, index) => (
                            <TypeaheadMenuItem option={result} position={index}>
                              <div  className="search-bar-only-city-item">
                                {result}
                              </div>
                            </TypeaheadMenuItem>
                          ))}
                        </Menu>
                      );
                  }}

                    renderMenu={(results, menuProps) => {
                        return (
                          <Menu {...menuProps}>
                            {results.map((result,index) => (
                              <TypeaheadMenuItem className="search-bar-only-city-menu-item" option={result} position={index}>
                                {result}
                              </TypeaheadMenuItem>
                            ))}
                          </Menu>
                        );
                      }}
                    placeholder="  !مقصد خود را وارد نمایید  "
                    minLength={2}
                    align='right'
                    onInputChange={(input)=>{this.setState({city:input})}}
                    selectHintOnEnter={false}
                    highlightOnlyResult={true}
                    submitFormOnEnter={false}
                    emptyLabel="نتیجه‌ای یافت نشد"
                    maxResults={5}
                    className="typeahead-onlycity-xl"
                    onChange={(selected)=>{
                      this.setState({city:selected[0]},()=>{this.handleClick()});
                    }}
                    options={listOfCity}
                  />
              <Button type='button' color='blue' className="search-btn btn"  onClick={this.handleClick.bind(this)} data-reactid="99">
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

   handleClick(){
       if(this.state.city===''){
         this.props.history.replace("/search/هر جا");
       }
       else{
          this.props.history.replace("/search/" + this.state.city);
       }
     }
   getCityListFromServer(){
     var request = new Request('https://www.trypinn.com/api/homepage/',{
       method: 'POST',
       body: JSON.stringify({
         platform:'web',
     }),
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
   renderSearchBarOnlycityXs(){
      return(
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
                  onInputChange={(input)=> {this.setState({city:input})}}
                  minLength={2}
                  selectHintOnEnter={true}
                  submitFormOnEnter={false}
                  onKeyDown={(event)=>{this.handleSearchByEnter(event)}}
                  emptyLabel="نتیجه‌ای یافت نشد"
                  maxResults={5}
                  className="typeahead-onlycity-sm"
                  onChange={(selected) => {this.setState({city:selected[0]},()=>{this.handleClick()})
                  }}
                  options={listOfCity}
                  />
                  <Button color='blue' className="search-btn-xs" onClick={this.handleClick.bind(this)} data-reactid="99">
                    <span className='searchicon'>
                      <img src="http://image.ibb.co/fjdMQG/trpinn_search.png" className='search-image-xs' alt=""></img>
                    </span>
                  </Button>
              </div>
          </div>
        </div>
      );
   }
  renderSearchBarXS(){
    return(
      <div className="container-fluid hidden-xl visible-xs">
          <div className='mobile-margined-search'>
            <div className="main-zone-xs col-md-12">
              <div className="row">
              </div>
        {this.renderSearchBarOnlycityXs()}
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
    );
  }
  renderSearchbarXl(){
    return(
      <div className="container-fluid hidden-xs visible-xl">
        {this.renderSearchBarOnlycity()}
        <div className="dl-app-main">
          <div className="main-page-download-app-section row-reverse">
              <a className="download-app-anchor"rel="noopener noreferrer"target="_blank" href='http://new.sibapp.com/applications/tripinn' >
                <img src={require('./Images/2.svg')} className="download_icon_app" alt = 'دانلود از سیب‌اپ'/>
              </a>
              <a className="download-app-anchor"rel="noopener noreferrer"target="_blank" href='https://play.google.com/store/apps/details?id=com.trypinn&hl=en' >
                <img src={require('./Images/3.png')} className="download_icon_app2" alt = 'دانلود از گوگل پلی'/>
              </a>
              <a className="download-app-anchor"rel="noopener noreferrer"target="_blank" href='http://cafebazaar.ir/app/com.trypinn/' >
                <img src={require('./Images/1.svg')} className="download_icon_app" alt = 'دانلود از کافه بازار'/>
              </a>
          </div>
        </div>
      </div>
    );
  }
  renderLandingXS(){
    return(
      <div>
        <div className="landing-page-mobile visible-xs hidden-xl">
          <img src={require('./Images/trpinn-logo-white.svg')} className='landing-logo' alt=""></img>
          <p className='logotype-landing'>تریپین</p>
          <p className='description-landing'>سامانه رزرو ویلا و اقامت‌گاه بوم‌گردی</p>
          <button className="landing-btn" onClick={() => scrollToComponent(this.Dis, { offset: 0, align: 'top', duration: 1500})}> دریافت اپلیکیشن </button>
        </div>
        <div className="landing-download-area visible-xs hidden-xl">
          <div className="download-app-modal-icons-container">
            <a className="download-app-anchor"rel="noopener noreferrer"target="_blank" href='http://new.sibapp.com/applications/tripinn' >
              <img src={require('./Images/sibapp.svg')} className="download_icon_app" alt = 'دانلود از سیب‌اپ'/>
            </a>
            <a className="download-app-anchor"rel="noopener noreferrer"target="_blank" href='https://play.google.com/store/apps/details?id=com.trypinn&hl=en' >
              <img src={require('./Images/gplay.svg')} className="download_icon_app" alt = 'دانلود از گوگل پلی'/>
            </a>
            <a className="download-app-anchor"rel="noopener noreferrer"target="_blank" href='http://cafebazaar.ir/app/com.trypinn/' >
              <img src={require('./Images/bazaar.svg')} className="download_icon_app" alt = 'دانلود از کافه بازار'/>
            </a>
            <section className='gallery-scroller' ref={(section) => {this.Dis = section;}}></section>
          </div>
        </div>
      </div>
    );
  }
            // {this.renderSearchBarXS()}
  render(){
    document.title = "تریپین | سامانه رزرو ویلا";
    return (
      <div className="searchbarmain">
          {this.renderSearchbarXl()}
          {this.renderLandingXS()}
      </div>
    );
  }
}
export default SearchBar;
