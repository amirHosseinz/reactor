import React from 'react';
import ContactUsXl from './ContactUs/ContactUsXl.js';
import ContactUsXs from './ContactUs/ContactUsXs.js';
import ContactUsMd from './ContactUs/ContactUsMd.js';
import ContactUsSm from './ContactUs/ContactUsSm.js';
import MetaTags from 'react-meta-tags';

class ContactUs extends React.Component {
  renderContactUsMd(){
    return(
      <div className="hidden-xs hidden-xl hidden-sm visible-md">
        <ContactUsMd />
      </div>
    );
  }

  renderContactUsSm(){
    return(
      <div className="hidden-xs hidden-md hidden-xl visible-sm">
        <ContactUsSm />
      </div>
    );
  }

  renderContactUsXl(){
    return(
      <div className="hidden-xs hidden-md hidden-sm visible-xl">
        <ContactUsXl />
      </div>
    );
  }

  renderContactUsXs(){
    return(
      <div className="hidden-xl hidden-md hidden-sm visible-xs">
        <ContactUsXs />
      </div>
    );
  }
  render(){
    return(
      <div>
        <MetaTags>
          <title>تریپین | تماس با ما</title>
        </MetaTags>
        {this.renderContactUsXl()}
        {this.renderContactUsXs()}
        {this.renderContactUsSm()}
        {this.renderContactUsMd()}
      </div>

    );
  }
}
export default ContactUs;
