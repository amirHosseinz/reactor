import React from 'react';
import {Link} from 'react-router-dom';


class FooterXl extends React.Component{
  renderFooterXL(){
    return(
      <div className='footer navbar-fixed-bottom'>
        <div className='footerchild' >
          <div className="footer-child-margined">
              <div className="footer-menu-and-dl hidden-xs">
                <div className='footer-menu-social col-md-2'>
                  <a href="https://t.me/tripinni"><img src={require('../Images/trypinn-telegram-channel.png')} className='social-image-xl' alt=""></img></a>
                  <a href="https://instagram.com/tripinn.ir"><img src={require('../Images/trypinn-instagram.png')} className='social-image-xl' alt=""></img></a>
                  <a href="https://twitter.com/tripinni"><img src={require('../Images/trypinn-twitter.png')} className='social-image-xl' alt=""></img></a>
                </div>
                <div className='footer-menu col-md-8'>
                  TripInn 2018
                </div>
                <div className='footer-menu col-md-2'>

                </div>
              </div>
            </div>
        </div>
      </div>
    );
  }
  renderFooter(){
    if(window.location.href.indexOf('rooms')===-1){
      return (
        <div>
          {this.renderFooterXL()}
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
  render(){
    return(
      <div>
        {this.renderFooter()}
      </div>
    );
  }
}

export default FooterXl;
