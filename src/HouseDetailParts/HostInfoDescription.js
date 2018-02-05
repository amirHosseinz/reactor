import React from 'react';
import HostInfoDescriptionXl from './HostInfoDescription/HostInfoDescriptionXl.js';
import HostInfoDescriptionXs from './HostInfoDescription/HostInfoDescriptionXs.js';
import HostInfoDescriptionMd from './HostInfoDescription/HostInfoDescriptionMd.js';
import HostInfoDescriptionSm from './HostInfoDescription/HostInfoDescriptionSm.js';


class HostInfoDescription extends React.Component{

  renderHostInfoDescriptionXl(props){
    return(
      <div className="hidden-xs hidden-md hidden-sm visible-xl">
        <HostInfoDescriptionXl {...props}/>
      </div>
    );
  }

  renderHostInfoDescriptionXs(props){
    return(
      <div className="hidden-xl hidden-md hidden-sm visible-xs">
        <HostInfoDescriptionXs {...props}/>
      </div>
    );
  }

  renderHostInfoDescriptionMd(props){
    return(
      <div className="hidden-xs hidden-xl hidden-sm visible-md">
        <HostInfoDescriptionMd {...props}/>
      </div>
    );
  }

  renderHostInfoDescriptionSm(props){
    return(
      <div className="hidden-xs hidden-md hidden-xl visible-sm">
        <HostInfoDescriptionSm {...props}/>
      </div>
    );
  }
  render(){
    return(
      <div>
        {this.renderHostInfoDescriptionXl(this.props)}
        {this.renderHostInfoDescriptionXs(this.props)}
        {this.renderHostInfoDescriptionMd(this.props)}
        {this.renderHostInfoDescriptionSm(this.props)}
      </div>
    );
  }
}
export default HostInfoDescription;
