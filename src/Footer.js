import React from 'react';

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
                    <div className='downloadbotton btn btn-large btn-warning padding-left'>
                    <a className='logolink' href="hwww.tryppin.com">  <p className='download-app-text'>دریافت اپلیکیشن</p></a>
                    </div>
                    <div className='footer-menu'>
                      <a class='logolink' href="www.tryppin.com">  <p className='logo-menu-font'>قوانین و شرایط استفاده</p></a>
                      <a class='logolink' href="hwww.tryppin.com">  <p className='logo-menu-font'>!میزبان شوید</p></a>
                      <a class='logolink' href="www.tryppin.com">  <p className='logo-menu-font'>درباره تریپین</p></a>
                      <a class='logolink' href="www.tryppin.com">  <p className='logo-menu-font' >تماس با ما</p></a>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="freezone"></div>
                  </div>
                  <div className="col-md-2">
                    <div classname='footer-menu'>
                      <a href="www.tryppin.com"><img src="https://image.ibb.co/kqZaZb/trypinn_telegram_channel.png" className='social-image'></img></a>
                      <a href="www.tryppin.com"><img src="https://image.ibb.co/gkG00G/trypinn_instagram.png" className='social-image'></img></a>
                      <a href="www.tryppin.com"><img src="https://image.ibb.co/jzwNEb/trypinn_twitter.png" className='social-image'></img></a>
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
                <div classname='footer-menu-mobile-social'>
                  <a href="www.tryppin.com"><img src="https://image.ibb.co/kqZaZb/trypinn_telegram_channel.png" className='social-image'></img></a>
                  <a href="www.tryppin.com"><img src="https://image.ibb.co/gkG00G/trypinn_instagram.png" className='social-image'></img></a>
                  <a href="www.tryppin.com"><img src="https://image.ibb.co/jzwNEb/trypinn_twitter.png" className='social-image'></img></a>
                </div>
            </div>
          </div>
        </div>
    );
  }
}

export default Footer;
