import React from 'react';
import { Button} from 'semantic-ui-react'

class Footer extends React.Component{
  //
  // constructor (props) {
  //   super(props);
  // }

  render()
  {
    return (
        <div>
          <div className='footer hidden-xs visible-xl navbar-fixed-bottom'>
            <div className='footerchild' >
              <div className='footer1'>
                  <div className="footer-menu-and-dl col-md-6 hidden-xs">
                      <div>
                        <Button color='blue' className="downloadd btn">دانلود اپلیکیشن</Button>
                      </div>
                    <div className='footer-menu'>
                      <a className='logolink' href="www.tryppin.com">  <p className='logo-menu-font'>قوانین و شرایط استفاده</p></a>
                      <a className='logolink' href="hwww.tryppin.com">  <p className='logo-menu-font'>!میزبان شوید</p></a>
                      <a className='logolink' href="www.tryppin.com">  <p className='logo-menu-font'>درباره تریپین</p></a>
                      <a className='logolink' href="www.tryppin.com">  <p className='logo-menu-font' >تماس با ما</p></a>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="freezone"></div>
                  </div>
                  <div className="col-md-2">
                    <div className='footer-menu'>
                      <a href="www.tryppin.com"><img src="https://image.ibb.co/kqZaZb/trypinn_telegram_channel.png" className='social-image' alt=""></img></a>
                      <a href="www.tryppin.com"><img src="https://image.ibb.co/gkG00G/trypinn_instagram.png" className='social-image' alt=""></img></a>
                      <a href="www.tryppin.com"><img src="https://image.ibb.co/jzwNEb/trypinn_twitter.png" className='social-image' alt=""></img></a>
                    </div>
                  </div>
              </div>
            </div>
          </div>
          <div className='footer hidden-xl visible-xs'>
            <div className='footer-mobile-container'>
              <a className='footer-menu-mobile-link' href="http://www.tryppin.com">
                <div className='footer-menu-mobile-item'>
                  <p className='logo-footer-menu-font-mobile' >قوانین و شرایط استفاده</p>
                </div>
              </a>
              <a className='footer-menu-mobile-link' href="http://www.tryppin.com">
                <div className='footer-menu-mobile-item'>
                  <p className='logo-footer-menu-font-mobile' >میزبان شوید</p>
                </div>
              </a>
              <a className='footer-menu-mobile-link' href="http://www.tryppin.com">
                <div className='footer-menu-mobile-item'>
                  <p className='logo-footer-menu-font-mobile' >درباره تریپین</p>
                </div>
              </a>
              <a className='footer-menu-mobile-link' href="http://www.tryppin.com">
                <div className='footer-menu-mobile-item'>
                  <p className='logo-footer-menu-font-mobile' >تماس با ما</p>
                </div>
              </a>
                <div className='footer-menu-mobile-social'>
                  <a href="www.tryppin.com"><img src="https://image.ibb.co/kqZaZb/trypinn_telegram_channel.png" className='social-image' alt=""></img></a>
                  <a href="www.tryppin.com"><img src="https://image.ibb.co/gkG00G/trypinn_instagram.png" className='social-image' alt=""></img></a>
                  <a href="www.tryppin.com"><img src="https://image.ibb.co/jzwNEb/trypinn_twitter.png" className='social-image' alt=""></img></a>
                </div>
            </div>
          </div>
        </div>
    );
  }
}

export default Footer;
