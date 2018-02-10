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
  {name:'اصفهان',},{name:'نوشهر',},{name: 'گیلان',},{name:'رامسر'},{name:'کیش'},{name:'مازندران'},
  {name:'فریدون کنار'},{name:'محمودآباد'},{name:'عباس آباد'},{name:'شاندیز'},{name:'خراسان رضوی'},
  {name:'بندر‌انزلی'},{name:'کاشان'},{name:'باغ بهادران'},{name:'قلعه رودخان'},{name:'مشهد'},
  {name:'چمخاله'},{name:'رودسر'},{name:'فومن'},{name:'رضوان‌شهر'},{name:'زیباکنار'},
  {name:'آستارا'},{name:'چالوس'},{name:'دریاکنار'},{name:'نور'},{name:'رویان'},{name:'بابلسر'},
  {name:'تنکابن'},{name:'سرخ‌رود'},{name:'دریاکنار'},{name:'ایزدشهر'},{name:'البرز'},
  {name:'سلمان شهر'},{name:'تنکابن'},{name:'کلاردشت'},{name:'نشتارود'},{name:'کلارآباد'},
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
      suggestions:[],
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

   onSuggestionsFetchRequested=({value})=> {
     this.setState({
       suggestions: this.getSuggestions(value)
     });
   }
   onChangeSearchBarValue = (event,{newValue, method}) => {
     this.setState({
       city: newValue
     });
   };

   getSuggestions(value) {
     const escapedValue = this.escapeRegexCharacters(value.trim());

     if (escapedValue === '') {
       return [];
     }
     const regex = new RegExp('^' + escapedValue, 'i');
     return listOfCity.filter(city => regex.test(city.name));
   }

   escapeRegexCharacters(str) {
     return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
   }

   onSuggestionsClearRequested=() =>{
     this.setState({
       suggestions: []
     });
   }

   renderSuggestion = (suggestion)=>{
     return(
       <span>
         {suggestion.name}
       </span>
     );
   }

   getSuggestionValue(suggestion){
     return suggestion.name;
   }
  renderSearchBarVersion2(){
    const value = this.state.city;
    const suggestions = this.state.suggestions;
    if(window.location.href.indexOf('search')===-1 && window.location.pathname!=='/'){
      const inputProps = {
      placeholder: 'مثلا نوشهر',
      value:this.state.city,
      onChange:this.onChangeSearchBarValue
   };
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
                  <Autosuggest
                    suggestions={suggestions}
                    onSuggestionSelected={(selected)=>{this.setState({city:selected.target.innerText},()=>{this.handleClick()})}}
                    onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                    onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                    getSuggestionValue={this.getSuggestionValue}
                    renderSuggestion={this.renderSuggestion}
                    inputProps={inputProps}/>
                </div>
                <div className="search-bar-auto-suggest-button">
                </div>
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
