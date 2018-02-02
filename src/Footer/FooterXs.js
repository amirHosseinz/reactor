import React from 'react';
import {Link} from 'react-router-dom';

class FooterXs extends React.Component{

  renderFooterXS(){
    return(
      <div className='footer hidden-xl visibe-xs'>
        <div className='footer-mobile-container'>
          <a className='footer-menu-mobile-link' href="/terms&conditions">
            <div className='footer-menu-mobile-item'>
              <p className='logo-footer-menu-font-mobile' >قوانین و شرایط استفاده</p>
            </div>
          </a>
          <a className='footer-menu-mobile-link' href="becomehost">
            <div className='footer-menu-mobile-item'>
              <p className='logo-footer-menu-font-mobile' >میزبان شوید</p>
            </div>
          </a>
          <a className='footer-menu-mobile-link' href="/aboutus">
            <div className='footer-menu-mobile-item'>
              <p className='logo-footer-menu-font-mobile' >درباره تریپین</p>
            </div>
          </a>
          <a className='footer-menu-mobile-link' href="/contactus">
            <div className='footer-menu-mobile-item'>
              <p className='logo-footer-menu-font-mobile' >تماس با ما</p>
            </div>
          </a>
            <div className='footer-menu-mobile-social'>
              <a href="https://t.me/tripinni"><img src={require('../Images/trypinn-telegram-channel.png')} className='social-image' alt=""></img></a>
              <a href="https://instagram.com/tripinn.ir"><img src={require('../Images/trypinn-instagram.png')} className='social-image' alt=""></img></a>
              <a href="https://twitter.com/tripinni"><img src={require('../Images/trypinn-twitter.png')} className='social-image' alt=""></img></a>
            </div>
        </div>
      </div>
    );
  }

  render(){
    return(
      <div>
      </div>
    );
  }
}

export default FooterXs;
