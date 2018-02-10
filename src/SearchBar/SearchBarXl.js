import React from 'react';
import SearchResultItem from '../SearchResultItem';
import { Typeahead,MenuItem,Menu,menuItemContainer} from '../tools/react-bootstrap-typeahead';
import { Button } from 'semantic-ui-react';
import { findDOMNode } from 'react-dom';
import $ from 'jquery';
import '../tools/DatePicker/bootstrap-datepicker.fa.js';
import '../tools/DatePicker/bootstrap-datepicker.js';
import '../tools/DatePicker/bootstrap-datepicker.css';
import {Dropdown} from 'semantic-ui-react';
import GuestNumber from '../GuestNumberSearchBar.js';
import scrollToComponent from 'react-scroll-to-component';
import "./SearchBar.css"
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


class SearchBarXl extends React.Component{
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
                <img src={require('../Images/tripinn_suitcase.png')} className='suitcase-image' alt="Trippin-Suitcase"></img>
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
                  <img src={require('../Images/trpinn_search.png')} className='search-image' alt=""></img>
                </span>
                </Button>
            </div>
        </div>
        <div className="free-zone col-md-3"></div>
      </div>
    );
  }
  renderSearchbarXl(){
    return(
      <div className="container-fluid hidden-xs visible-xl">
        {this.renderSearchBarOnlycity()}
      </div>
    );
  }

  renderSearchBarVersion2(){
    return(
      <div className="search-bar-main-division">
        <div className="search-bar-background">
        </div>
          <div className="search-bar-contents">
            <p className="search-bar-tripinn-heading">
              تریپین
            </p>
            <p className="search-bar-tripinn-heading-2">
              سامانه رزرو ویلا و اقامتگاه محلی
            </p>
            <div className="search-bar-auto-suggest-container">
              <p className="search-bar-inter-destenation-text"> مقصد را وارد کنید: </p>
              <div className="search-bar-auto-suggest">
                <div className="search-bar-auto-suggest-input">
                </div>
                <div className="search-bar-auto-suggest-button">
                </div>
              </div>
            </div>
          </div>
    </div>
    );
  }
  // {this.renderSearchbarXl()}
  render(){
    return(
      <div>
        {this.renderSearchBarVersion2()}
      </div>
    );
  }
}

export default SearchBarXl;
