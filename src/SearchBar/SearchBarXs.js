import React from 'react';
import SearchResultItem from '../SearchResultItem';
import GuestNumber from '../GuestNumberSearchBar.js';
import "./SearchBar.css";
import "../Styles/MainPage-SearchBar.css";
import Autosuggest from 'react-autosuggest';

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
class SearchBarXs extends React.Component{
  constructor(props){
    super(props);
    this.state={
      city:'',
      suggestions:[],
    }
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
   this.setState({city:suggestionValue},()=>{this.handleClick()});
  }

handleClick(){
    if(this.state.city===''){
      this.props.history.replace("/search/هر جا");
    }
    else{
       this.props.history.replace("/search/" + this.state.city);
    }
  }
  renderSearchBar(){
    const value = this.state.city;
    const suggestions = this.state.suggestions;
    const inputProps = {
    placeholder: 'مثلا نوشهر',
    value:this.state.city,
    onChange:this.onChangeSearchBarValue
    }
    return(
      <div className="search-bar-main-division-xs">
        <div className="search-bar-background-xs">
        </div>
        <div className="search-bar-contents-xs">
          <p className="search-bar-tripinn-heading-xs">
            تریپین
          </p>
          <p className="search-bar-tripinn-heading-2-xs">
            سامانه رزرو ویلا و اقامتگاه محلی
          </p>
          <div className="search-bar-auto-suggest-container-xs">
            <p className="search-bar-inter-destenation-text-xs"> مقصد را وارد کنید:
            </p>
            <div className="search-bar-auto-suggest-xs">
              <div className="search-bar-auto-suggest-input-xs">
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
              <div className="search-bar-auto-suggest-button-xs">
                <button className="search-bar-search-button-xs" onClick={()=>{this.handleClick()}}>
                  <span>
                    <img src={require('../Images/search-bar-search-icon.svg')} className="search-bar-search-icon-xs" alt="search"/>
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="search-bar-download-app-section-xs">
        <div className="search-bar-download-phone-picture-xs">
        <img height="300px" width="200px" src={require("../Images/header-download-app-modal-phone.png")} alt=""/>
        </div>
          <div className="search-bar-app-links-section-xs">
          <p className="search-bar-download-app-sentence">
            تریپین را همیشه همراه خود داشته باشید:
          </p>
          <div className="download-app-links-xs">
            <a className="download-app-anchor-xs" rel="noopener noreferrer"target="_blank" href='http://cafebazaar.ir/app/com.trypinn/' >
              <img src={require('../Images/1.svg')} alt = 'دانلود از کافه بازار'/>
            </a>
            <a className="download-app-anchor-xs"rel="noopener noreferrer"target="_blank" href='http://new.sibapp.com/applications/tripinn' >
              <img src={require('../Images/2.svg')} alt = 'دانلود از سیب‌اپ'/>
            </a>
          </div>
          </div>
        </div>
      </div>
    );
  }
  render(){
    return(
      <div>
        {this.renderSearchBar()}
      </div>
    );
  }
}

export default SearchBarXs;
