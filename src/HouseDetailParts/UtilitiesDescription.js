import React from 'react';
import UtilitiesDescriptionXl from './UtilitiesDescription/UtilitiesDescriptionXl.js';
import UtilitiesDescriptionXs from './UtilitiesDescription/UtilitiesDescriptionXs.js';
import UtilitiesDescriptionMd from './UtilitiesDescription/UtilitiesDescriptionMd.js';
import UtilitiesDescriptionSm from './UtilitiesDescription/UtilitiesDescriptionSm.js';


class UtilitiesDescription extends React.Component{

  renderUtilitiesXs(props){
    return(
      <div className="hidden-xl hidden-md hidden-sm visible-xs">
        <UtilitiesDescriptionXs {...props}/>
      </div>
    );
  }

  renderUtilitiesSm(props){
    return(
      <div className="hidden-xs hidden-md hidden-xl visible-sm">
        <UtilitiesDescriptionSm {...props}/>
      </div>
    );
  }

  renderUtilitiesXl(props){
    return(
      <div className="hidden-xs hidden-md hidden-sm visible-xl">
        <UtilitiesDescriptionXl {...props}/>
      </div>
    );
  }

  renderUtilitiesMd(props){
    return(
      <div className="hidden-xs hidden-xl hidden-sm visible-md">
        <UtilitiesDescriptionMd {...props}/>
      </div>
    );
  }


  render(){
    return(
      <div>
        {this.renderUtilitiesXl(this.props)}
        {this.renderUtilitiesXs(this.props)}
        {this.renderUtilitiesMd(this.props)}
        {this.renderUtilitiesSm(this.props)}
      </div>

    );
  }
}

export default UtilitiesDescription
