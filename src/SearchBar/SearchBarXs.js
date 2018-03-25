import React from 'react';
import SearchResultItem from '../SearchResultItem';
import { Typeahead,MenuItem,Menu,menuItemContainer} from '../tools/react-bootstrap-typeahead';
import { Button } from 'semantic-ui-react';
import { findDOMNode } from 'react-dom';
import {Dropdown} from 'semantic-ui-react';
import GuestNumber from '../GuestNumberSearchBar.js';
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
class SearchBarXs extends React.Component{

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
    );
  }
  renderLandingXS(){
    return(
      <div>
        <div className="landing-page-mobile visible-xs hidden-xl">
          <img src={require('../Images/trpinn-logo-white.svg')} className='landing-logo' alt=""/>
          <p className='logotype-landing'>تریپین</p>
          <p className='description-landing'>سامانه رزرو ویلا و اقامت‌گاه بوم‌گردی</p>
          <button className="landing-btn" onClick={() => scrollToComponent(this.Dis, { offset: 0, align: 'top', duration: 1500})}> دریافت اپلیکیشن </button>
        </div>
        <div className="landing-download-area visible-xs hidden-xl">
          <div className="download-app-modal-icons-container">
            <a className="download-app-anchor"rel="noopener noreferrer"target="_blank" href='http://new.sibapp.com/applications/tripinn' >
              <img src={require('../Images/sibapp.svg')} className="download_icon_app" alt = 'دانلود از سیب‌اپ'/>
            </a>
            <a className="download-app-anchor"rel="noopener noreferrer"target="_blank" href='https://play.google.com/store/apps/details?id=com.trypinn&hl=en' >
              <img src={require('../Images/gplay.svg')} className="download_icon_app" alt = 'دانلود از گوگل پلی'/>
            </a>
            <a className="download-app-anchor"rel="noopener noreferrer"target="_blank" href='http://cafebazaar.ir/app/com.trypinn/' >
              <img src={require('../Images/bazaar.svg')} className="download_icon_app" alt = 'دانلود از کافه بازار'/>
            </a>
            <section className='gallery-scroller' ref={(section) => {this.Dis = section;}}></section>
          </div>
        </div>
      </div>
    );
  }

  render(){
    return(
      <div>
        {this.renderLandingXS()}
      </div>
    );
  }
}

export default SearchBarXs;
