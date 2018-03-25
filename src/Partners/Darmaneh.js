import React from 'react';
import scrollToComponent from 'react-scroll-to-component';
import './Partners.css';
import {englishToPersianDigits} from '../tools/EnglishToPersianDigits.js';
import MetaTags from 'react-meta-tags';


class Darmaneh extends React.Component{

  renderLandingXS(){
    return(
      <div>
        <div className="darmaneh-landing-page">
          <p className='darmaneh-landing-logotype'>تریپین</p>
          <p className='darmaneh-landing-description'>  سامانه رزرو ویلا و اقامتگاه بوم‌گردی   </p>
        </div>
        <div className="tripinn-darmaneh">
          <div className="tripinn-introduction">
            <p className="introduction-paragraph">
            تریپین بهترین و مهمان‌نوازترین میزبانان مردمی در سرتاسر کشور را کنار هم آورده تا تجربه‌ای متفاوت از آسودگی در سفر را برای شما رقم بزند.
                        در تریپین می‌توانید به راحتی اقامتگاه مورد نظر خود در طول سفر را از بین ویلاها،  سوئیت‌ها، خانه‌های محلی و گزینه‌های متعدد دیگر رزرو نمایید و با امنیت خاطر سفری جذاب و خاطره‌انگیز را تجربه کنید
            </p>
          </div>
          <div className="discount-code-container">
            <div className="darmaneh-landing-btn-container">
            <button className="darmaneh-landing-btn" onClick={() => scrollToComponent(this.Dis, { offset: 100, align: 'middle', duration: 1000})}> دریافت اپلیکیشن </button>
            </div>
            <div className="tripinn-darmaneh-connection">
              کاربر گرامی درمانه، با استفاده از کد تخفیف زیر می‌توانید ویلا‌ها و اقامتگاه‌های تریپین را با ده درصد تخفیف رزرو کنید.
            </div>
            <div className="discount-code-input-section">
               <img src={require('../Images/tripinn_logo.svg')} className='darmaneh-landing-logo' alt=""/>
               <p className="discount-code-title"> کد تخفیف:darmaneh97</p>
               <img src={require('../Images/Darmaneh  Logo.svg')} className="darmaneh-landing-logo"/>
            </div>
          </div>
          <div className="tripinn-features-containter">
            <p onClick={()=>{scrollToComponent(this.refs.description, { offset: 0, align: 'top', duration: 800})}}className="tripinn-features-title">
              خدمات تریپین
            </p>
            <div ref="description" className="tripinn-introduction-container">
              <p className="tripinn-introduction-title"> اقامتگاه بوم‌گردی</p>
              <div className="tripinn-boomgardi-introduction">
                <p className="introduction-paragraph">
                  اگر از زندگی پرهیاهوی ماشینی خسته شده‌اید و در سفرهای آخرهفته خود نیز شلوغی تعطیلات اجازه استراحت کامل را به شما نمی دهد، بومگردی را تجربه کنید.
                </p>
                <p className="introduction-paragraph">
                  تجربه چند روز زندگی با مردم روستا در بافت روستایی به همراه غذای محلی، به شما اجازه می‌دهد تا از سادگی و میهمان نوازی این مردم شریف انرژی بگیرید و لذت ببرید.
                </p>
                <p className="introduction-paragraph">
                تریپین، مجموعه‌ای از بومگردی‌ها و اقامتگاه‌های محلی را در یک جا جمع آوری کرده است تا مخاطبین بتوانند قبل از سفر، موارد متعدد را به سادگی با هم مقایسه کنند و با توجه به حال و هوا و با یک قیمت مناسب، اقامتگاه مورد نظر خود را رزرو کنند. پشتیبانی
                                {englishToPersianDigits(" 24 ")}
                                  ساعته تریپین از مهمانان خود، امنیت و آرامش خاطر را برای شما به ارمغان خواهد آورد.
                </p>
              </div>
            </div>
            <div className="tripinn-introduction-container">
              <p className="tripinn-introduction-title"> ویلا و سوییت </p>
              <div className="tripinn-villa-introduction">
                <p className="introduction-paragraph">
تریپین با ایجاد یک پایگاه اطلاعاتی از سوییت‌ها و ویلاها در سراسر ایران همچون شهرهای شمالی، مشهد، باغ‌بهادران اصفهان، قشم و . . . این امکان را به شما می دهد که مدتها قبل از سفر خود، اقامتگاه خود را با مقایسه شرایط مکانی و رفاهی از بین گزینه‌های مختلف انتخاب کنید و از طرفی با مشخص بودن قیمت و پشتیبانی تیم مالی و اجرایی تریپین، سفری مطمئن برای شما و همراهان و خانواده‌تان رقم خواهد زد.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="darmaneh-landing-download-area">
          <div className="darmaneh-download-app-modal-icons-container">
            <a className="darmaneh-landing-download-app-anchor"rel="noopener noreferrer"target="_blank" href='http://new.sibapp.com/applications/tripinn' >
              <img width="230px" src={require('../Images/sibapp.svg')} className="darmaneh-landing-download-icon-app" alt = 'دانلود از سیب‌اپ'/>
            </a>
            <a className="darmaneh-landing-download-app-anchor"rel="noopener noreferrer"target="_blank" href='https://play.google.com/store/apps/details?id=com.trypinn&hl=en' >
              <img  width="230px" src={require('../Images/gplay.svg')} className="darmaneh-landing-download-icon-app" alt = 'دانلود از گوگل پلی'/>
            </a>
            <a className="darmaneh-landing-download-app-anchor"rel="noopener noreferrer"target="_blank" href='http://cafebazaar.ir/app/com.trypinn/' >
              <img width="230px" src={require('../Images/bazaar.svg')} className="darmaneh-landing-download-icon-app" alt = 'دانلود از کافه بازار'/>
            </a>
            <section className='gallery-scroller' ref={(section) => {this.Dis = section;}}></section>
          </div>
        </div>
      </div>
    );
  }

  render(){
    return(
      <div className="visible-xs hidden-xl">
        <MetaTags>
          <title>کد تخفیف برای کاربران درمانه</title>
          <meta name="googlebot" content="noindex" />
        </MetaTags>
        {this.renderLandingXS()}
      </div>
    );
  }
}

export default Darmaneh;
