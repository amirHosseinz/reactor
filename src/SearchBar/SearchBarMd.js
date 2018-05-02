import React from 'react';
import "./SearchBar.css";
import "../Styles/MainPage-SearchBar.css";
import Autosuggest from 'react-autosuggest';
import MetaTags from 'react-meta-tags';
import ReactGA from 'react-ga';
import {productionURL} from'../Data.js';


ReactGA.initialize('UA-115538071-1');
ReactGA.pageview(window.location.pathname);
const listOfCity = [
  {name:'اصفهان',},{name:'نوشهر',},{name: 'گیلان',},{name:'رامسر'},{name:'کیش'},{name:'مازندران'},
  {name:'فریدون‌کنار'},{name:'محمودآباد'},{name:'عباس آباد'},{name:'شاندیز'},{name:'خراسان رضوی'},
  {name:'بندر انزلی'},{name:'کاشان'},{name:'باغ بهادران'},{name:'قلعه رودخان'},{name:'مشهد'},
  {name:'چمخاله'},{name:'رودسر'},{name:'فومن'},{name:'رضوان‌شهر'},{name:'زیباکنار'},
  {name:'آستارا'},{name:'چالوس'},{name:'دریاکنار'},{name:'نور'},{name:'رویان'},{name:'بابلسر'},
  {name:'تنکابن'},{name:'سرخ‌رود'},{name:'دریاکنار'},{name:'ایزدشهر'},{name:'البرز'},{name:'گلستان'},
  {name:'سلمان‌شهر'},{name:'کلاردشت'},{name:'نشتارود'},{name:'کلارآباد'},
  {name:'فارس'},{name:'شیراز'},{name:'یزد'},{name:'داراب'},{name:'بافق'},{name:'مرودشت'},
  {name : 'کرمانشاه'},{name : 'همدان'},{name : 'کردان'},
];


const theme= {
    container:                'main-page-searchbar-container',
    containerOpen:            'main-page-searchbar-container--open',
    input:                    'main-page-searchbar-input-md',
    inputOpen:                'main-page-searchbar-input--open',
    inputFocused:             'main-page-searchbar-input--focused',
    suggestionsContainer:     'main-page-searchbar-suggestions-container-md',
    suggestionsContainerOpen: 'main-page-searchbar-suggestions-container--open',
    suggestionsList:          'main-page-searchbar-suggestions-list',
    suggestion:               'main-page-searchbar-suggestion',
    suggestionFirst:          'main-page-searchbar-suggestion--first',
    suggestionHighlighted:    'main-page-searchbar-suggestion--highlighted',
    sectionContainer:         'main-page-searchbar-section-container',
    sectionContainerFirst:    'main-page-searchbar-section-container--first',
    sectionTitle:             'main-page-searchbar-section-title'
  }

class SearchBarMD extends React.Component{
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
    this.setState({
      token : this.getRelevantToken()});
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
     var request = new Request(productionURL + 'api/homepage/',{
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
    ReactGA.event({category: 'User',action: 'Search For City'});
    this.setState({city:suggestionValue},()=>{this.handleClick()});
    // console.log(suggestionValue);
   }
  renderSearchBarVersion2(){
    const value = this.state.city;
    const suggestions = this.state.suggestions;
    const inputProps = {
    autoFocus:true,
    placeholder: 'مثلا اصفهان',
    value:this.state.city,
    onChange:this.onChangeSearchBarValue
    }
    return(
      <div className="search-bar-main-division">
        <div className="search-bar-background-md">
        </div>
          <div className="search-bar-contents-md">
            <p className="search-bar-tripinn-heading">
              تریپین
            </p>
            <p className="search-bar-tripinn-heading-2">
              رزرو آنلاین ویلا و اقامتگاه بوم‌گردی
            </p>
            <div className="search-bar-auto-suggest-container-md">
              <p className="search-bar-inter-destenation-text"> مقصد را وارد کنید
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
        <MetaTags>
            <meta name="description" content="تریپین بهترین و مهمان‌نوازترین میزبانان مردمی در سرتاسر کشور – از سواحل شمال و نوشهر و رامسر تا اصفهان و شیراز و یزد و کیش - را درکنار هم آورده تا تجربه‌ای متفاوت از آسودگی در سفر را برای شما رقم بزند. در تریپین می‌توانید به راحتی اقامتگاه مورد نظر خود در طول سفر را از بین ویلاها، سوئیت‌ها، خانه‌های محلی، بوم‌گردی و گزینه‌های متعدد دیگر رزرو نمایید و سفری خاطره‌انگیز را تجربه کنید."/>
          <title>تریپین | سامانه رزرو ویلا و اقامتگاه محلی</title>
        </MetaTags>
        {this.renderSearchBarVersion2()}
      </div>
    );
  }
}

export default SearchBarMD;
