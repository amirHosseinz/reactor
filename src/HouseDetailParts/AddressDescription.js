import React from 'react';
import AddressDescriptionXl from './AddressDescription/AddressDescriptionXl.js';
import AddressDescriptionXs from './AddressDescription/AddressDescriptionXs.js';
import AddressDescriptionMd from './AddressDescription/AddressDescriptionMd.js';
import AddressDescriptionSm from './AddressDescription/AddressDescriptionSm.js';
class AddressDescription extends React.Component{

  renderAddressDescriptionXl(homeData){
    return(
      <div className="hidden-xs hidden-md hidden-sm visible-xl">
        <AddressDescriptionXl homeData={homeData}/>
      </div>
    );
  }

  renderAddressDescriptionXs(homeData){
    return(
      <div className="hidden-xl hidden-md hidden-sm visible-xs">
        <AddressDescriptionXs homeData={homeData}/>
      </div>
    );
  }

  renderAddressDescriptionMd(homeData){
    return(
      <div className="hidden-xs hidden-xl hidden-sm visible-md">
        <AddressDescriptionMd homeData={homeData}/>
      </div>
    );
  }

  renderAddressDescriptionSm(homeData){
    return(
      <div className="hidden-xs hidden-md hidden-xl visible-sm">
        <AddressDescriptionSm homeData={homeData}/>
      </div>
    );
  }
  render(){
    return(
      <div>
        {this.renderAddressDescriptionXl(this.props.homeData)}
        {this.renderAddressDescriptionMd(this.props.homeData)}
        {this.renderAddressDescriptionXs(this.props.homeData)}
        {this.renderAddressDescriptionSm(this.props.homeData)}
      </div>
    );
  }
}

export default AddressDescription;
