import React from 'react';
import {Link} from 'react-router-dom';
// import { Button} from 'semantic-ui-react';


class Footer extends React.Component{
  constructor(props){
    super(props);
  }

  renderFooter(){
    if(window.location.href.indexOf('rooms')===-1){
      return (
        <div>
          <div className='footer hidden-xs visible-xl navbar-fixed-bottom'>
            <div className='footerchild' >
                  <div className="footer-menu-and-dl hidden-xs">
                    <div className='footer-menu-social col-md-2'>
                      <a href="https://t.me/"><img src={require('./Images/trypinn-telegram-channel.png')} className='social-image-xl' alt=""></img></a>
                      <a href="https://instagram.com/tripinn.ir"><img src={require('./Images/trypinn-instagram.png')} className='social-image-xl' alt=""></img></a>
                      <a href="https://www.twitter.com/"><img src={require('./Images/trypinn-twitter.png')} className='social-image-xl' alt=""></img></a>
                    </div>
                    <div className='footer-menu col-md-10'>

                      <a className="download-app-footer-anchor" rel="noopener noreferrer" target="_blank" href='http://cafebazaar.ir/app/com.trypinn/' >
                        <button className="download-tripinn" >دانلود اپلیکیشن
                        </button>
                      </a>
                    <Link to="/terms&conditions"><p className='logo-menu-font'> قوانین و شرایط استفاده </p></Link>
                    <Link to="/becomehost"><p className='logo-menu-font'>میزبان شوید </p></Link>
                    <Link to="/aboutus"><p className='logo-menu-font'>درباره تریپین </p></Link>
                    <Link to="/contactus"><p className='logo-menu-font'> تماس با ما </p></Link> 
                    </div>
                  </div>
            </div>
          </div>
          <div className='footer hidden-xl visible-xs'>
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
                  <a href="https://t.me/"><img src={require('./Images/trypinn-telegram-channel.png')} className='social-image' alt=""></img></a>
                  <a href="https://instagram.com/tripinn.ir"><img src={require('./Images/trypinn-instagram.png')} className='social-image' alt=""></img></a>
                  <a href="https://www.twitter.com/"><img src={require('./Images/trypinn-twitter.png')} className='social-image' alt=""></img></a>
                </div>
            </div>
          </div>
        </div>
      );
    }
    else{
      return(
        <div>
        </div>
      );
    }
  }
  render()
  {
    return (
      <div>
        {this.renderFooter()}
      </div>
    );
  }
}

export default Footer;
