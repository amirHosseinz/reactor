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
        <div className="landing-page-mobile">
          <img src={require('../Images/trpinn-logo-white.svg')} className='landing-logo' alt=""/>
          <p className='logotype-landing'>تریپین</p>
          <p className='description-landing'>رزرو آنلاین ویلا و اقامتگاه بوم‌گردی</p>
          <p className="description-landing-second">تجربه‌ای متمایز، اقامتی منحصر‌به‌فرد</p>
        </div>
        <div className="landing-triangle">
        </div>
        <div className="landing-triangle-red">
        </div>
        <div className="landing-download-section">
          <p className="landing-download-title">
            دریافت اپلیکیشن تریپین
          </p>
          <p className="landing-download-os">
            برای اندروید و iOS
          </p>
          <a className="download-app-anchor"rel="noopener noreferrer"target="_blank" href='http://cafebazaar.ir/app/com.trypinn/' >
            <img src={require('../Images/logos/bazaar.png')} className="download_icon_app_bazaar" alt = 'دانلود از کافه بازار'/>
          </a>
          <a className="download-app-anchor"rel="noopener noreferrer"target="_blank" href='https://myket.ir/app/com.trypinn' >
            <img src={require('../Images/logos/myket.png')} className="download_icon_app_myket" alt = 'دانلود از مایکت'/>
          </a>
          <a className="download-app-anchor" rel="noopener noreferrer"target="_blank" href='https://play.google.com/store/apps/details?id=com.trypinn&hl=en' >
            <img src={require('../Images/logos/googleplay.png')} className="download_icon_app_google" alt = 'دانلود از گوگل پلی'/>
          </a>
          <a className="download-app-anchor"rel="noopener noreferrer"target="_blank" href='http://new.sibapp.com/applications/tripinn' >
            <img src={require('../Images/logos/sibapp.png')} className="download_icon_app_sibapp" alt = 'دانلود از سیب‌اپ'/>
          </a>
          <div style={{height:"40px"}}>
          </div>
        </div>
      </div>
    );
  }

  renderLandingXS2(){
    return(
      <div className="landing-main">
        <div className="landing-intro">
          <div className="intro-text">
            <p className="primary-title">
                تریپین؛
            </p>
            <p className="secondary-title">
              تجربه‌ای تازه از سفر
            </p>
            <p className="description-paragraph">
              تریپین سامانه رزرو ویلا و اقامتگاه بوم‌گردی است. قصد سفر
              به هر نقطه‌ای از ایران را که داشته باشید، کافی است
              با انتخاب مقصد خود محل اقامت خود را از میان ویلاها، اقامتگاه‌های بوم‌گردی و سوییت‌ها
              انتخاب کنید.
            </p>
          </div>
        </div>
        <img className="intro-picture" src={require("../Images/landing-page-picture1.png")} />
        <div className="landing-download-intro">
          <p className="landing-download-title">
            دریافت اپلیکیشن تریپین
          </p>
          <p className="landing-download-description">
          تریپین در هر دو سیستم عامل
          Android
          و
          iOS
          قابل استفاده است.
          </p>
          <img className="download-picture" src={require("../Images/landing-page-picture2.png")} />
        </div>
        <div className="landing-download-links">
          <p className="landing-download-description">
            شما می‌توانید با توجه به سیستم عامل خود از یکی از لینک‌های زیر استفاده کنید.
          </p>
          <p className="landing-download-os">
            اندروید
          </p>
          <a href="landing-download-link">
            <div className="landing-download-button">
            </div>
          </a>
          <a href="landing-download-link">
            <div className="landing-download-button">
            </div>
          </a>
          <a href="landing-download-link">
            <div className="landing-download-button">
            </div>
          </a>
          <p className="landing-download-os">
            iOS
          </p>
          <a href="" className="landing-download-link">
            <div className="landing-download-button">
            </div>
          </a>
        </div>
      </div>
    );
  }

  render(){
    console.log(this.props.history);
    return(
      <div>
        {this.renderLandingXS()}
      </div>
    );
  }
}

export default SearchBarXs;
