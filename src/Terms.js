import React from 'react';
import TermsXs from './Terms/TermsXs.js';
import TermsXl from './Terms/TermsXl.js';
import TermsSm from './Terms/TermsSm.js';
import TermsMd from './Terms/TermsMd.js';
import MetaTags from 'react-meta-tags';

class Terms extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      OpenPanel1:false,
      OpenPanel2:false,
      OpenPanel3:false,
      OpenPanel4:false,
      OpenPanel5:false,
      OpenPanel6:false,
      OpenPanel7:false,
      OpenPanel8:false,
      OpenPanel9:false,
      OpenPanel10:false,
      OpenPanel11:false,
        };
  }


  renderTermsMd(){
    return(
      <div className="hidden-xs hidden-xl hidden-sm visible-md">
        <TermsMd />
      </div>
    );
  }

  renderTermsSm(){
    return(
      <div className="hidden-xs hidden-md hidden-xl visible-sm">
        <TermsSm />
      </div>
    );
  }

  renderTermsXl(){
    return(
      <div className="hidden-xs hidden-md hidden-sm visible-xl">
        <TermsXl />
      </div>
    );
  }

  renderTermsXs(){
    return(
      <div className="hidden-xl hidden-md hidden-sm visible-xs">
        <TermsXs />
      </div>
    );
  }
  render(){
    return(
      <div>
      <MetaTags>
        <title> قوانین و مقررات تریپین</title>
      </MetaTags>
        {this.renderTermsXl()}
        {this.renderTermsXs()}
        {this.renderTermsMd()}
        {this.renderTermsSm()}
      </div>

    );
  }
}
export default Terms;
