import React from 'react';

class Footer extends React.Component{

  constructor (props) {
    super(props);
  }

  render()
  {
    return (
      <div className='footer'>
        <div className='footerchild' >
          <div className='mamad'>
            <div className="col-md-6 col-xs-12">
              <div className='downloadbotton'>
              </div>
              <div className='footer-menu'>
                <a class='logolink' href="www.tryppin.com">  <p className='logo-menu-font'>قوانین و شرایط استفاده</p></a>
                <a class='logolink' href="www.tryppin.com">  <p className='logo-menu-font'>!میزبان شوید</p></a>
                <a class='logolink' href="www.tryppin.com">  <p className='logo-menu-font'>درباره تریپین</p></a>
                <a class='logolink' href="www.tryppin.com">  <p className='logo-menu-font' >تماس با ما</p></a>
              </div>
            </div>
            <div className="col-md-4 col-xs-12">
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
    );
  }
}

export default Footer;
