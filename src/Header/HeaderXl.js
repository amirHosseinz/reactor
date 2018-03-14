import React from 'react';
import Login from '../Login.js';
import {reserveModalStyleRequests} from '../Styles.js';
import {Link} from 'react-router-dom';
import {Button,Divider} from 'semantic-ui-react';
import {Dropdown} from 'semantic-ui-react';
import './Header.css';
import '../Styles/Header-SearchBar.css';
import {CancelButtonModalStyle} from '../Styles.js';
import {downloadAppModalStyle,loginPasswordStyle, loginPhoneNumberStyle, loginPanelmobileStyle , loginVerifySmsXl} from '../Styles.js';
import {englishToPersianDigits,persianArabicToEnglishDigits} from '../tools/EnglishToPersianDigits';
import {Image} from 'react-bootstrap';
import Modal from 'react-modal';
import {Sticky} from 'react-sticky';
import Autosuggest from 'react-autosuggest';
import '../Styles/ModalCloseButton.css';


const theme ={
  container:                'header-searchbar-container',
  containerOpen:            'header-searchbar-container--open',
  input:                    'header-searchbar-input',
  inputOpen:                'header-searchbar-input--open',
  inputFocused:             'header-searchbar-input--focused',
  suggestionsContainer:     'header-searchbar-suggestions-container',
  suggestionsContainerOpen: 'header-searchbar-suggestions-container--open',
  suggestionsList:          'header-searchbar-suggestions-list',
  suggestion:               'header-searchbar-suggestion',
  suggestionFirst:          'header-searchbar-suggestion--first',
  suggestionHighlighted:    'header-searchbar-suggestion--highlighted',
  sectionContainer:         'header-searchbar-section-container',
  sectionContainerFirst:    'header-searchbar-section-container--first',
  sectionTitle:             'header-searchbar-section-title',
};

const listOfCity = [
  {name:'اصفهان',},{name:'نوشهر',},{name: 'گیلان',},{name:'رامسر'},{name:'کیش'},{name:'مازندران'},
  {name:'فریدون کنار'},{name:'محمودآباد'},{name:'عباس آباد'},{name:'شاندیز'},{name:'خراسان رضوی'},
  {name:'بندر انزلی'},{name:'کاشان'},{name:'باغ بهادران'},{name:'قلعه رودخان'},{name:'مشهد'},
  {name:'چمخاله'},{name:'رودسر'},{name:'فومن'},{name:'رضوان‌شهر'},{name:'زیباکنار'},
  {name:'آستارا'},{name:'چالوس'},{name:'دریاکنار'},{name:'نور'},{name:'رویان'},{name:'بابلسر'},
  {name:'تنکابن'},{name:'سرخ‌رود'},{name:'دریاکنار'},{name:'ایزدشهر'},{name:'البرز'},{name:'گلستان'},
  {name:'سلمان‌شهر'},{name:'کلاردشت'},{name:'نشتارود'},{name:'کلارآباد'},
  {name:'فارس'},{name:'شیراز'},{name:'یزد'},{name:'داراب'},{name:'بافق'},{name:'مرودشت'},
];


class HeaderXl extends React.Component{
  constructor (props){
    super(props);
    this.state={
      token: null,
      cellPhone:'',
      suggestions: listOfCity,
      city : '',
      reloadPage: false,
      showDownloadAppModal:false,
      showBurgerMenu:false,
      isLoggedIn : localStorage['isLoggedIn'],
      loginPanelVisible:false,
      loginPanelVisible2:false,
      hasPassword: null,
      hasAccount:null,
      searchParams:{
      phoneNumber: null,
      showMobileLoginPanel:false,
      },
    };
  }
  componentDidMount(){
    this.interval = setInterval(() => this.reloadHeader(), 1000);
  }
  handleSignOutButton(){
    localStorage['isLoggedIn']='false';
    localStorage['user-profile-picture']='';
    localStorage['user-first-name']='';
    localStorage['user-last-name']='';
    localStorage['default-panel']='';
    // window.location.href = '/';
    this.getGuestTokenFromServer();
  }

  getGuestTokenFromServer(){
    if (localStorage['isLoggedIn']!=='true'){
      var request = new Request('https://www.trypinn.com/auth/api/user/login_guest/',{
        method: 'POST',
        headers: new Headers({'Accept': 'application/json','Content-Type': 'application/json',
                              })
      });
     fetch(request)
     .then((response) => {
       return response.json();
     })
     .then((response) => {
       localStorage['token']= response.token;
       window.location.reload();
     });
    }
  }
  handleLoginButton(){
    this.setState({loginPanelVisible:true});
  }
  getUserHasPasswordByEnter(event){
    // console.log(event.key);
    if(event.key === 'Enter'){
      this.getUserHasPassword();
    }
    if (['0','1','2','3','4','5','6','7','8','9'].indexOf(event.key)===-1){
      if(event.key!=="Backspace"){
        event.preventDefault();
      }
    }
 }

 handleClick(){
   if(this.state.city===''){
     this.props.history.push("/search/هر جا");
   }
   else{
      this.props.history.push("/search/" + this.state.city);
   }
 }

 onChangeSearchBarValue = (event,{newValue, method}) => {
   this.setState({
     city: newValue
   });
 };
 onSuggestionsFetchRequested=({value})=> {
   this.setState({
     suggestions: this.getSuggestions(value)
   });
 }

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

 onSuggestionSelected =(event, { suggestion, suggestionValue, suggestionIndex, sectionIndex, method })=>{
   this.setState({city:suggestionValue},()=>{this.setState({city:''});this.handleClick()})
 }

 renderSearchBarXL(){
   const value = this.state.city;
   const suggestions = this.state.suggestions;
   if(window.location.pathname!=='/'){
     const inputProps = {
     autoFocus:true,
     placeholder: 'جستجوی مقصد...',
     value:this.state.city,
     onChange:this.onChangeSearchBarValue
  };
     return(
       <div className='header-search-bar'>
         <Autosuggest
           theme={theme}
           highlightFirstSuggestion={true}
           suggestions={suggestions}
           onSuggestionSelected = {this.onSuggestionSelected}
           onKeyDown={(event)=>{}}
           onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
           onSuggestionsClearRequested={this.onSuggestionsClearRequested}
           getSuggestionValue={this.getSuggestionValue}
           renderSuggestion={this.renderSuggestion}
           inputProps={inputProps}>
           </Autosuggest>
          <img src={require('../Images/header-search-icon.svg')} onClick={()=>{this.handleClick()}} className="header-search-icon" alt = 'تریپین'></img>
        </div>
     );
   }
 }
  renderLoginPanelFirstStep(){
    return(
      <div className="login-modal-main">
        <Modal isOpen={this.state.loginPanelVisible}
          style={loginPhoneNumberStyle}
          onRequestClose={()=>{this.setState({loginPanelVisible:false,cellPhone:''})}}>
          <div className="login1-modal">
            <div onClick={()=>{this.setState({loginPanelVisible:false,cellPhone:''})}} className="close-modal-phone-number">
            </div>
            <p className="login-title-in-modal"> ورود / ثبت‌نام  </p>
            <div className="header-login-modal-divider">
            </div>
              <div className="header-login-modal-content-container">
                <p className="enter-phone-number-inmodal"> :برای ورود یا ثبت‌نام شماره تلفن همراه خود را وارد کنید </p>
                <div dir="rtl">
                  <p className="header-login-modal-input-label"> شماره موبایل: </p>
                  <input
                      maxLength="11"
                      id="tel-number"
                      value={this.state.cellPhone}
                      onAfterOpen={()=>{document.body.style.overflow="hidden"}}
                      onChange={(event)=>{this.setState({cellPhone:englishToPersianDigits(event.target.value)})}}
                      autoComplete="off"
                      autoFocus={true}
                      className="header-login-modal-input"
                      placeholder="مثال: ۰۹۱۲۰۰۰۰۰۰۰"
                      type="text"
                      onKeyDown ={(event)=> {this.getUserHasPasswordByEnter(event)}}
                      />
                      <br/>
                      <br/>
                      <button className="header-login-modal-button" onClick={this.getUserHasPassword.bind(this)}>
                        ادامه
                      </button>
                </div>
              </div>
            </div>
        </Modal>
        {this.renderLoginPanelSecondStep()}
      </div>
    );
  }

  renderLoginPanelSecondStep(){
    if (this.state.hasPassword===true){
      return(
        <Modal isOpen={this.state.loginPanelVisible2}
          style={loginPasswordStyle}
          onRequestClose={()=>{this.closeLoginPanel();this.setState({loginPanelVisible2:false})}}>
          <Login cellPhone={this.state.cellPhone} closeLoginPanel={this.closeLoginPanel.bind(this)} hasAccount={this.state.hasAccount} hasPassword={this.state.hasPassword}/>
        </Modal>
      );
    }
    else{
      return(
        <Modal isOpen={this.state.loginPanelVisible2}
          style={loginVerifySmsXl}
          onRequestClose={()=>{this.closeLoginPanel();this.setState({loginPanelVisible2:false})}}>
          <Login cellPhone={this.state.cellPhone} closeLoginPanel={this.closeLoginPanel.bind(this)} hasAccount={this.state.hasAccount} hasPassword={this.state.hasPassword}/>
        </Modal>
      );
    }

  }
  renderUserPhoto(){
     if(localStorage['user-profile-picture']==='null'||localStorage['user-profile-picture']===undefined){
       return(
         <div style={{float:'left'}}>
          <Image className="profile-card-user-avatar" src={require('../HouseDetailParts/facilities/prof_avatar_tripinn.svg')} height={70}  circle={true}/>
         </div>
       );
     }
       else{
         return(
           <div style={{float:'left'}}>
             <img className="profile-card-user-avatar" src={'https://www.trypinn.com/' + localStorage['user-profile-picture']} height={70} width={70}/>
           </div>
         );
       }
    }
  reloadHeader(){
    if (this.state.isLoggedIn!== localStorage['isLoggedIn']){
      this.setState({isLoggedIn:localStorage['isLoggedIn']});
    }
  }
  getUserHasPassword(){
    this.setToken();
  }
  getRelevantToken(){
    if (localStorage['isLoggedIn']==='true'){
      this.setState({token:localStorage['token']},()=>{this.setSearchParams()});
    }
    else{
      this.setState({token:localStorage['token']},()=>{this.setSearchParams()});
    }
  }
  setToken(){
    this.getRelevantToken();
  }
  setSearchParams(){
    var spar = {phoneNumber:persianArabicToEnglishDigits(this.state.cellPhone)};
    this.setState({searchParams:spar},()=>{this.getDataFromServer()})
  }
    getDataFromServer(){
      var request = new Request('https://www.trypinn.com/auth/api/user/check_account/', {
        method: 'POST',
        body: JSON.stringify({
          cell_phone : this.state.searchParams.phoneNumber,
      }),
        headers: new Headers({'Accept':'application/json','Content-Type': 'application/json',
        })
      });
     fetch(request)
     .then((response) => {
       return response.json();
     })
     .then((loginStatus) => {
       localStorage['phone-number'] = this.state.searchParams.phoneNumber;
       this.setState({hasPassword: loginStatus.has_pass,hasAccount:loginStatus.has_account});
       this.setState({loginPanelVisible2 : true});
       this.setState({loginPanelVisible: false});
     });
  }
  closeLoginPanel(){
    this.setState({loginPanelVisible2:false,cellPhone:''});
  }
  renderLoginButton(){
    if (this.state.isLoggedIn !== 'true'){
      return(
        <div className="main-menu-header">
          <p className="login-signup-button-header clickable-p"  onClick={this.handleLoginButton.bind(this)}>ورود / ثبت نام </p>
        </div>
      );
    }
  }

  signOutAndProfile(){
    return (
        <div>
          <div>
            <Dropdown className="header-drop-down-texts" icon='dropdown' dir="rtl" floating={false} text={ ' سلام ' + ' ' +  localStorage['user-first-name'] } >
             <Dropdown.Menu>
                <div className="drp-down-menu-cont">
                  <div className="profile-card-up row-reverse">
                  <div onClick={(event)=>{event.stopPropagation()}}>
                    {this.renderUserPhoto()}
                  </div>
                    <div>
                    <p className="profile-card-user-name" onClick={this.handleUserProfileClick.bind(this)}>{localStorage['user-first-name'] + ' ' + localStorage['user-last-name']}</p>
                    <p className="profile-card-user-profile" onClick={this.handleUserProfileClick.bind(this)}>حساب کاربری</p>
                    </div>
                  </div>
                  <div className="profile-card-divider"></div>
                  <div>
                    <div>
                      {this.renderRequestButton()}
                      {this.renderTripButton()}
                    </div>
                    <p className="profile-card-exit-button" onClick={this.handleSignOutButton.bind(this)}>خروج</p>
                  </div>
                </div>
             </Dropdown.Menu>
            </Dropdown>
          </div>

        </div>
    );
  }
  renderMainMenu(){
    if(this.state.isLoggedIn==='true'){
      return (
        <div className='main-menu-header'>
          {this.signOutAndProfile()}
        </div>
      );
    }
  }
  handleMessageClick(){
    window.location.href = '/dashboard';
    if (localStorage['default-panel']!=='message'){
       localStorage['default-panel']='message';
    }
  }
  handleTripClick(){
    if (localStorage['default-panel']!=='trip'){
      localStorage['default-panel']='trip';
    }
    this.props.history.push('/dashboard/trip');
  }
  handleRequestClick(){

    if (localStorage['default-panel']!=='request'){
      localStorage['default-panel']='request';
    }
    this.props.history.push('/dashboard/request');
  }

  handleUserProfileClick(){
    this.props.history.push('/userprofile');
  }
  renderRequestButton(){
    if(localStorage['isLoggedIn']==='true'){
      return(
        <p className="profile-card-user-requests" onClick={this.handleRequestClick.bind(this)}>درخواست های من</p>
      );
    }
  }

  renderTripButton(){
    if(localStorage['isLoggedIn']==='true'){
      return(
        <p className="profile-card-user-trips"  onClick={this.handleTripClick.bind(this)}>سفرهای من</p>
      );
    }
  }

  renderMessageButton(){
    if(localStorage['isLoggedIn']==='true'){
      return(
        <p className="profile-card-user-messages" onClick={this.handleMessageClick.bind(this)}>پیام‌ها</p>
      );
    }
  }
  renderGetApplicationButton(){
    {
      return (
        <div className="downlaod-app-button-header" >
          <p className="clickable-p download-item-menu" onClick={()=>{this.setState({showDownloadAppModal:true})}}> دریافت اپلیکیشن</p>
        </div>
      );
    }
  }

  renderDownloadAppModal(){
    return(
      <Modal isOpen={this.state.showDownloadAppModal}
            style={downloadAppModalStyle}
             onRequestClose={()=>{this.setState({showDownloadAppModal:false})}}>
              <div className="header-downlaod-app-modal-container">
                <img  src={require('../Images/header-download-app-modal-phone.png')} className="header-download-app-modal-phone"/>
                <div className="header-downlaod-app-modal-content-container">
                  <div className="header-downlaod-app-modal-heading">
                    <span className="header-downlaod-app-modal-brandname"> تریپین </span>
                    <span className="header-downlaod-app-modal-slogen">  همیشه همراه شما </span>
                  </div>
                  <p className="header-downlaod-app-modal-download-description">اپلیکیشن تریپین بر روی دستگاه‌های اندروید و iOS قابل نصب است. </p>
                  <div direction="rtl">
                    <p className="header-downlaod-app-modal-download-label"> نسخه اندروید </p>
                    <div className="header-downlaod-app-modal-android">
                      <a className="download-app-anchor"rel="noopener noreferrer"target="_blank" href='http://cafebazaar.ir/app/com.trypinn/' >
                        <img src={require('../Images/1.svg')} className="download_icon_app" alt = 'دانلود از کافه بازار'/>
                      </a>
                      <a className="download-app-anchor"rel="noopener noreferrer"target="_blank" href='https://play.google.com/store/apps/details?id=com.trypinn&hl=en' >
                        <img src={require('../Images/3.png')} className="download_icon_app" alt = 'دانلود از گوگل پلی'/>
                      </a>
                      <a className="download-app-anchor"rel="noopener noreferrer"target="_blank" href='https://myket.ir/app/com.trypinn' >
                        <img src={require('../Images/MYKET72 copy.svg')} className="download_icon_app" alt = 'دانلود از مایکت'/>
                      </a>
                    </div>
                    <p className="header-downlaod-app-modal-download-label">نسخه iOS </p>
                    <a className="download-app-anchor"rel="noopener noreferrer"target="_blank" href='http://new.sibapp.com/applications/tripinn' >
                      <img src={require('../Images/sibapp-2.png')} className="download_icon_app" alt = 'دانلود از سیب‌اپ'/>
                    </a>
                  </div>
                </div>
              </div>
            </Modal>
    );
  }
  // <Link className="header-link" to="/becomehost"><p className='logo-menu-font'>میزبان شوید </p></Link>
  renderHeaderXl(){
    return(
      <div className='header'>
       <div className='hearder-child-margined'>
          <div className="header-menu col-md-6">
            {this.renderMainMenu()}
            {this.renderLoginButton()}
            <div className="row-reverse">
              <Link className="header-link" to="/suggestions&comments"><p className='logo-menu-font'>ثبت شکایات </p></Link>
              <Link className="header-link" to="/contactus"><p className='logo-menu-font'> تماس با ما </p></Link>
              <Link className="header-link" to="/aboutus"><p className='logo-menu-font'>درباره ما </p></Link>
              <Link className="header-link" to="/terms&conditions"><p className='logo-menu-font'>قوانین </p></Link>
              {this.renderGetApplicationButton()}
            </div>
          </div>
          {this.renderLoginPanelFirstStep()}
          <div className="header-logo-side col-md-6">
              <div className='header-logo-and-search'>
                <div className='header-logo-container'>
                <div itemScope={true} itemType="http://schema.org/Organization">
                   <Link itemProp="url" to="/">
                      <img itemProp="logo" src={require('../Images/tripinn_logo.svg')} className="header-logo-image" alt = 'tripinn logo'/>
                   </Link>
               </div>
                </div>
                <div>
                  <Link className='logolink' to="/"><p className='header-logo-type'>تریپین</p></Link>
                </div>
                {this.renderSearchBarXL()}
              </div>
          </div>
        </div>
      </div>
    );
  }

  renderRelevantHeaderBasedOnURL(){
      return(
        <Sticky>
          {({style,isSticky})=>{
            return(
            <div className={isSticky?"header-sticky":"header-not-sticky"} style={style}>
              {this.renderHeaderXl()}
              {this.renderDownloadAppModal()}
            </div>
          );
          }}
        </Sticky>
      );
  }

  render(){
    return(
      <div>
        {this.renderRelevantHeaderBasedOnURL()}
      </div>
    );
  }
}

export default HeaderXl;
