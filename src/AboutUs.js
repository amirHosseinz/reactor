import React from 'react';
import {Link} from 'react-router-dom';
// import {englishToPersianDigits} from "./tools/EnglishToPersianDigits.js";
import AboutUsXl from './AboutUs/AboutUsXl.js';
import AboutUsMd from './AboutUs/AboutUsMd.js';
import AboutUsXs from './AboutUs/AboutUsXs.js';
import AboutUsSm from './AboutUs/AboutUsSm.js';

class AboutUs extends React.Component {
  constructor(props){
    super(props);
    this.state={
    };
  }
  renderAboutUsXl(){
    return(
      <div className="hidden-xs hidden-md hidden-sm visible-xl">
        <AboutUsXl />
      </div>
    );
  }

  renderAboutUsMd(){
    return(
      <div className="hidden-xs hidden-xl hidden-sm visible-md">
        <AboutUsMd />
      </div>
    );
  }

  renderAboutUsSm(){
    return(
      <div className="hidden-xs hidden-md hidden-xl visible-sm">
        <AboutUsSm />
      </div>
    );
  }

  renderAboutUsXs(){
    return(
      <div className="hidden-xl hidden-md hidden-sm visible-xs">
        <AboutUsXs />
      </div>
    );
  }
  render(){
    return(
      <div>
        {this.renderAboutUsXl()}
        {this.renderAboutUsMd()}
        {this.renderAboutUsXs()}
        {this.renderAboutUsSm()}
      </div>

    );
  }
}
export default AboutUs;
