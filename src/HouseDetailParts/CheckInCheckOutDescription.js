import React from 'react';
import CheckInCheckOutDescriptionMd from './CheckInCheckOutDescription/CheckInCheckOutDescriptionMd.js';
import CheckInCheckOutDescriptionXs from './CheckInCheckOutDescription/CheckInCheckOutDescriptionXs.js';
import CheckInCheckOutDescriptionXl from './CheckInCheckOutDescription/CheckInCheckOutDescriptionXl.js';
import CheckInCheckOutDescriptionSm from './CheckInCheckOutDescription/CheckInCheckOutDescriptionSm.js';

class CheckInCheckOutDescription extends React.Component{

  renderCheckInCheckOutXl(homeData){
    return(
      <div className="hidden-xs hidden-md hidden-sm visible-xl">
        <CheckInCheckOutDescriptionXl homeData={homeData}/>
      </div>
    );
  }

  renderCheckInCheckOutXs(homeData){
    return(
      <div className="hidden-xl hidden-md hidden-sm visible-xs">
        <CheckInCheckOutDescriptionXs homeData={homeData}/>
      </div>
    );
  }

  renderCheckInCheckOutMd(homeData){
    return(
      <div className="hidden-xs hidden-xl hidden-sm visible-md">
        <CheckInCheckOutDescriptionMd homeData={homeData}/>
      </div>
    );
  }

  renderCheckInCheckOutSm(homeData){
    return(
      <div className="hidden-xs hidden-md hidden-xl visible-sm">
        <CheckInCheckOutDescriptionSm homeData={homeData}/>
      </div>
    );
  }

  render(){
    return(
      <div>
        {this.renderCheckInCheckOutMd(this.props.homeData)}
        {this.renderCheckInCheckOutXs(this.props.homeData)}
        {this.renderCheckInCheckOutXl(this.props.homeData)}
        {this.renderCheckInCheckOutSm(this.props.homeData)}
      </div>
    );
  }
}

export default CheckInCheckOutDescription;
