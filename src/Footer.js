import React from 'react';
import FooterXl from './Footer/FooterXl.js';
import FooterXs from './Footer/FooterXs.js';
import FooterMd from './Footer/FooterMd.js';
import FooterSm from './Footer/FooterSm.js';
// import { Button} from 'semantic-ui-react';


class Footer extends React.Component{

  renderFooterXl(){
    return(
      <div className="hidden-xs hidden-md hidden-sm visible-xl">
        <FooterXl />
      </div>
    );
  }

  renderFooterXs(){
    return(
      <div className="hidden-xl hidden-md hidden-sm visible-xs">
        <FooterXs />
      </div>
    );
  }

  renderFooterMd(){
    return(
      <div className="hidden-xs hidden-xl hidden-sm visible-md">
        <FooterMd />
      </div>
    );
  }

  renderFooterSm(){
    return(
      <div className="hidden-xs hidden-md hidden-xl visible-sm">
        <FooterSm />
      </div>
    );
  }
  render()
  {
    return (
      <div>
        {this.renderFooterXl()}
      </div>

    );
  }
}

export default Footer;
