import React from 'react';
import SearchResultItem from '../SearchResultItem';
import scrollToComponent from 'react-scroll-to-component';
import ReactGA from 'react-ga';
ReactGA.initialize('UA-115538071-1');
ReactGA.pageview(window.location.pathname);


class SearchBarXs extends React.Component{

  renderLandingXS(){
    return(
      <div>
        <div className="landing-page-mobile visible-xs hidden-xl">
          <img src={require('../Images/trpinn-logo-white.svg')} className='landing-logo' alt=""/>
          <p className='logotype-landing'>تریپین</p>
          <p className='description-landing'>سامانه رزرو ویلا و اقامت‌گاه بوم‌گردی</p>
          <button className="landing-btn" onClick={() => scrollToComponent(this.Dis, { offset:-100, align: 'center', duration: 1500})}> دریافت اپلیکیشن </button>
        </div>
        <div className="landing-download-area visible-xs hidden-xl">
          <div className="download-app-modal-icons-container">
            <a onClick={()=>{ReactGA.event({category: 'User',action: 'Download From Sibapp'})}} className="download-app-anchor"rel="noopener noreferrer"target="_blank" href='http://new.sibapp.com/applications/tripinn' >
              <img src={require('../Images/sibapp.svg')} className="download_icon_app" alt = 'دانلود از سیب‌اپ'/>
            </a>
            <a onClick={()=>{ReactGA.event({category: 'User',action: 'Download From Google Play'})}} className="download-app-anchor"rel="noopener noreferrer"target="_blank" href='https://play.google.com/store/apps/details?id=com.trypinn&hl=en' >
              <img src={require('../Images/gplay.svg')} className="download_icon_app" alt = 'دانلود از گوگل پلی'/>
            </a>
            <a onClick={()=>{ReactGA.event({category: 'User',action: 'Download From Caffe Bazaar'})}} className="download-app-anchor"rel="noopener noreferrer"target="_blank" href='http://cafebazaar.ir/app/com.trypinn/' >
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
