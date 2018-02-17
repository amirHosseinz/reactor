import React from 'react';
import {Link} from 'react-router-dom';
import {englishToPersianDigits} from "../tools/EnglishToPersianDigits.js";
import './AboutUs.css';
class AboutUsXl extends React.Component{
  constructor(props){
    super(props);
    this.state={
    };
  }

  render(){
    return (
      <div className='about-us-container-xl'>
        <div className='about-us-content'>
        <div className='about-us-logo'>
        <img src={require('../Images/tripinn_logo.svg')} width="80" height="80" />
        </div>
        <p className='about-us-header'><span>درباره  </span><span className='about-us-tripinn'>تریپین</span></p>
        <div className='about-us-main-paragraph'>
       <p className="dabout-us-descriptions"> اگر به دنبال امکان مقایسه و بررسی اقامتگاه های تفریحی هستید، تریپین بهترین انتخاب شما است. پیش از آغاز سفر محل اقامت مورد نظر خود را آنلاین رزرو کنید و در طول مسافرت همراهی تیم پشتیبانی ما را در کنار خود داشته باشید. تریپین متعلق به شرکت طراحی و راهبری فناوران دانش سامان آریا به شماره ثبت {englishToPersianDigits(515951 )}  است و در حال حاضر در استان های

      <Link className="anchor-about-us" to="/search/اصفهان">اصفهان </Link> ,
      <Link className="anchor-about-us" to="/search/البرز">البرز</Link> ,
      <Link className="anchor-about-us" to="/search/خراسان رضوی">خراسان رضوی</Link> ,
      <Link className="anchor-about-us" to="/search/مازندران" > مازندران</Link> ,
      <Link className="anchor-about-us" to="/search/گیلان">گیلان</Link> و
      <Link className="anchor-about-us" to="/search/کیش"> جزیره کیش</Link> فعال است.
       </p>
       </div>
       <div className='about-us-app-paragraph'>
         <div className='about-us-app-paragraph-text'>
          با دریافت اپلیکیشن تریپین برای هر دو پلتفرم اندورید و آی‌او‌اس، علاوه بر رزرو آنلاین، به کمک امکان برقراری ارتباط مستقیم با میزبان، آسوده خاطر سفر کنید.

         </div>
         <div className='about-us-app-paragraph-img '>
          <img src={require('../Images/about-us-pic1.png')} height="250" />
         </div>
       </div>
       <div className='about-us-tripinn-objective'>
         <div className='about-us-tripinn-objective-img'>
         <img src={require('../Images/about-us-pic2.png')} height="350" />
         </div>
         <div className='about-us-tripinn-objective-text'>
          تریپین با هدف ایجاد تجربه‌ای نو، تلاش دارد تا با ارائه‌ی طیفی وسیع از ویلا، سوییت و اقامتگاه‌های بوم‌گردی، پاسخگوی نیاز جامعه ایرانی باشد.

        </div>
      </div>
    </div>
  </div>
    );
  }
}

export default AboutUsXl;
