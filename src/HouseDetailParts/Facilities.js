import React from 'react';
import FacilitiesXl from './FacilitiesMain/FacilitiesXl.js';
import FacilitiesXs from './FacilitiesMain/FacilitiesXs.js';
import FacilitiesMd from './FacilitiesMain/FacilitiesMd.js';
import FacilitiesSm from './FacilitiesMain/FacilitiesSm.js';
import './FacilitiesMain/Facilities.css';
class Facilities extends React.Component{

  renderFacilitiesMd(utility){
    return(
      <div className="hidden-xs hidden-xl hidden-sm visible-md">
        <FacilitiesMd utility={utility}/>
      </div>
    );
  }

  renderFacilitiesSm(utility){
    return(
      <div className="hidden-xs hidden-md hidden-xl visible-sm">
        <FacilitiesSm utility={utility}/>
      </div>
    );
  }

  renderFacilitiesXl(utility){
    return(
      <div className="hidden-xs hidden-md hidden-sm visible-xl">
        <FacilitiesXl utility={utility}/>
      </div>
    );
  }

  renderFacilitiesXs(utility){
    return(
      <div className="hidden-xl hidden-md hidden-sm visible-xs">
        <FacilitiesXs utility={utility}/>
      </div>
    );
  }

  render(){
    return(
      <div>
        {this.renderFacilitiesXl(this.props.utility)}
        {this.renderFacilitiesXs(this.props.utility)}
        {this.renderFacilitiesMd(this.props.utility)}
        {this.renderFacilitiesSm(this.props.utility)}
      </div>
    );
  }
}

export default Facilities;
