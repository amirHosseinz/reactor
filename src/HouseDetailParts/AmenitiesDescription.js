import React from 'react';

import AmenitiesDescriptionXs from './AmenitiesDescription/AmenitiesDescriptionXs.js';
import AmenitiesDescriptionMd from './AmenitiesDescription/AmenitiesDescriptionMd.js';
import AmenitiesDescriptionSm from './AmenitiesDescription/AmenitiesDescriptionSm.js';
import AmenitiesDescriptionXl from './AmenitiesDescription/AmenitiesDescriptionXl.js';


class AmenitiesDiscription extends React.Component{
  renderAmenitiesDescriptionXl(props){
    return(
      <div className="hidden-xs hidden-md hidden-sm visible-xl">
        <AmenitiesDescriptionXl {...props}/>
      </div>
    );
  }

  renderAmenitiesDescriptionXs(props){
    return(
      <div className="hidden-xl hidden-md hidden-sm visible-xs">
        <AmenitiesDescriptionXs {...props}/>
      </div>
    );
  }

  renderAmenitiesDescriptionMd(props){
    return(
      <div className="hidden-xs hidden-xl hidden-sm visible-md">
        <AmenitiesDescriptionMd {...props}/>
      </div>
    );
  }

  renderAmenitiesDescriptionSm(props){
    return(
      <div className="hidden-xs hidden-md hidden-xl visible-sm">
        <AmenitiesDescriptionSm {...props}/>
      </div>
    );
  }


  render(){
    return(
      <div>
        {this.renderAmenitiesDescriptionXl(this.props)}
        {this.renderAmenitiesDescriptionXs(this.props)}
        {this.renderAmenitiesDescriptionMd(this.props)}
        {this.renderAmenitiesDescriptionSm(this.props)}
      </div>
    );
  }
}
export default AmenitiesDiscription;
