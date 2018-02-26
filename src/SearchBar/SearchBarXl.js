import React from 'react';
import SearchResultItem from '../SearchResultItem';
import { Typeahead,MenuItem,Menu,menuItemContainer} from '../tools/react-bootstrap-typeahead';
import { Button } from 'semantic-ui-react';
import { findDOMNode } from 'react-dom';
import {Dropdown} from 'semantic-ui-react';
import GuestNumber from '../GuestNumberSearchBar.js';
import scrollToComponent from 'react-scroll-to-component';
import "./SearchBar.css";
import "../Styles/MainPage-SearchBar.css";
import Autosuggest from 'react-autosuggest';
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

const theme= {
    container:                'main-page-searchbar-container',
    containerOpen:            'main-page-searchbar-container--open',
    input:                    'main-page-searchbar-input',
    inputOpen:                'main-page-searchbar-input--open',
    inputFocused:             'main-page-searchbar-input--focused',
    suggestionsContainer:     'main-page-searchbar-suggestions-container-xl',
    suggestionsContainerOpen: 'main-page-searchbar-suggestions-container--open',
    suggestionsList:          'main-page-searchbar-suggestions-list',
    suggestion:               'main-page-searchbar-suggestion',
    suggestionFirst:          'main-page-searchbar-suggestion--first',
    suggestionHighlighted:    'main-page-searchbar-suggestion--highlighted',
    sectionContainer:         'main-page-searchbar-section-container',
    sectionContainerFirst:    'main-page-searchbar-section-container--first',
    sectionTitle:             'main-page-searchbar-section-title'
  }

class SearchBarXl extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      token: null,
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
         this.props.history.push("/search/هر جا");
       }
       else{
          this.props.history.push("/search/" + this.state.city);
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

  onSuggestionSelected = (event, { suggestion, suggestionValue, suggestionIndex, sectionIndex, method })=>{
    // console.log(method);
    this.setState({city:suggestionValue},()=>{this.handleClick()});
    // console.log(suggestionValue);
   }
  renderSearchBarVersion2(){
    const value = this.state.city;
    const suggestions = this.state.suggestions;
    const inputProps = {
    autoFocus:true,
    placeholder: 'مثلا نوشهر',
    value:this.state.city,
    onChange:this.onChangeSearchBarValue
    }
    return(
      <div className="search-bar-main-division">
        <div className="search-bar-background-xl">
        </div>
          <div className="search-bar-contents-xl">
            <p className="search-bar-tripinn-heading">
              تریپین
            </p>
            <p className="search-bar-tripinn-heading-2">
              سامانه رزرو ویلا و اقامتگاه محلی
            </p>
            <div className="search-bar-auto-suggest-container-xl">
              <p className="search-bar-inter-destenation-text"> مقصد را وارد کنید:
              </p>
              <div className="search-bar-auto-suggest">

                <div className="search-bar-auto-suggest-input">
                  <Autosuggest
                    theme={theme}
                    highlightFirstSuggestion={true}
                    suggestions={this.state.suggestions}
                    onSuggestionSelected={this.onSuggestionSelected}
                    onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                    onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                    getSuggestionValue={this.getSuggestionValue}
                    renderSuggestion={this.renderSuggestion}
                    inputProps={inputProps}/>
                </div>
                <div className="search-bar-auto-suggest-button">
                  <button className="search-bar-search-button" onClick={()=>{this.handleClick()}}>
                    <span>
                      <img src={require('../Images/search-bar-search-icon.svg')} className="search-bar-search-icon" alt="search"/>
                    </span>
                  </button>
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
