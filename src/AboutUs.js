import React from 'react';
import {Link} from 'react-router-dom';
import {englishToPersianDigits} from "./tools/EnglishToPersianDigits.js";
class AboutUs extends React.Component {
  constructor(props){
    super(props);
    this.state={

    };
  }
  render(){
    return(
      <div className='about-us-container'>
        <div className='about-us-content'>
        <div className='about-us-logo'>
        <img src={require('./Images/tripinn_logo.svg')} width="80" height="80" />
        </div>
        <p className='about-us-header'><span>درباره  </span><span className='about-us-tripinn'>تریپین</span></p>
        <div className='about-us-main-paragraph'>
          <p> .اگر برای سفر به دنبال اقامتگاهی مناسب هستید تریپین برای شما بهترین انتخاب است
      <br/>
      تریپین سامانه رزرو ویلا، سوییت و اقامتگاه‌های بومگردی است که از طریق آن می‌توانید با مقایسه اقامتگاه‌های تفریحی گوناگون در شهرهای مختلف و رزرو آنلاین آنها قبل از سفر خود، اقامتی بی‌نظیر را تجربه کنید
      <br/>
       در طول سفر نیز همراه شما خواهد بود و با پشتیبانی 24 ساعته شما را همراهی خواهد کرد. در صورت بروز سوال و پیشنهاد از طریق صفحه تماس با ما، ما را در جریان بگذارید
      <br/>
       تریپین متعلق به شرکت طراحی و راهبری فناوران دانش سامان آریا به شماره ثبت {englishToPersianDigits(515951 )} است و در حال حاضر در استان های


      <Link to="/search/مازندران" > مازندران</Link> ,
      <Link to="/search/خراسان رضوی">خراسان رضوی</Link> ,
      <Link to="/search/اصفهان">اصفهان</Link> ,
      <Link to="/search/گیلان">گیلان</Link> و
      <Link to="/search/کیش"> جزیره کیش</Link> فعال است
       </p>
       </div>
       <div className='about-us-app-paragraph'>
         <div className='about-us-app-paragraph-text'>
        . علاوه بر سایت، شما میتوانید با اپلیکیشن تریپین نیز به رزرو انواع اقامتگاه ها بپردازید. هم اکنون اپلیکیشن تریپین برای هر دو پلتفرم اندروید و آی او اس قابل دریافت است
         </div>
         <div className='about-us-app-paragraph-img '>
          <img src={require('./Images/about-us-pic1.png')} height="250" />
         </div>
       </div>
       <div className='about-us-tripinn-objective'>
         <div className='about-us-tripinn-objective-img'>
         <img src={require('./Images/about-us-pic2.png')} height="350" />
         </div>
         <div className='about-us-tripinn-objective-text'>
        .هدف تریپین ارائه تنوعی بالا از انواع ویلا، اقامتگاه بومگردی، سوییت و آپارتمان متناسب با نیاز شماست.
        </div>
      </div>
    </div>
  </div>

    );
  }
}
export default AboutUs;
