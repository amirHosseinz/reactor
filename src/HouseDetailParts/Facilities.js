import React from 'react';
import FacilitiesXl from './FacilitiesMain/FacilitiesXl.js';
import FacilitiesXs from './FacilitiesMain/FacilitiesXs.js';
import FacilitiesMd from './FacilitiesMain/FacilitiesMd.js';
import FacilitiesSm from './FacilitiesMain/FacilitiesSm.js';
import './FacilitiesMain/Facilities.css';
class Facilities extends React.Component{


  renderFacilitiesMd(props){
    return(
      <div className="hidden-xs hidden-xl hidden-sm visible-md">
        <FacilitiesMd {...props}/>
      </div>
    );
  }

  renderFacilitiesSm(props){
    return(
      <div className="hidden-xs hidden-md hidden-xl visible-sm">
        <FacilitiesSm {...props}/>
      </div>
    );
  }

  renderFacilitiesXl(props){
    return(
      <div className="hidden-xs hidden-md hidden-sm visible-xl">
        <FacilitiesXl {...props}/>
      </div>
    );
  }

  renderFacilitiesXs(props){
    return(
      <div className="hidden-xl hidden-md hidden-sm visible-xs">
        <FacilitiesXs {...props}/>
      </div>
    );
  }

  render(){
    return(
      <div>
        {this.renderFacilitiesXl(this.props)}
        {this.renderFacilitiesXs(this.props)}
        {this.renderFacilitiesMd(this.props)}
        {this.renderFacilitiesSm(this.props)}
      </div>
    );
  }
}

export default Facilities;
