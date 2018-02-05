import React from 'react';
import HouseDetailsXl from './HouseDetails/HouseDetailsXl.js';
import HouseDetailsXs from './HouseDetails/HouseDetailsXs.js';
import HouseDetailsMd from './HouseDetails/HouseDetailsMd.js';
import HouseDetailsSm from './HouseDetails/HouseDetailsSm.js';


class HouseDetails extends React.Component {
  renderHouseDetailsXl(){
    return(
      <div className="hidden-xs hidden-md hidden-sm visible-xl">
        <HouseDetailsXl />
      </div>
    );
  }

  renderHouseDetailsMd(){
    return(
      <div className="hidden-xs hidden-xl hidden-sm visible-md">
        <HouseDetailsMd />
      </div>
    );
  }

  renderHouseDetailsXs(){
    return(
      <div className="hidden-xl hidden-md hidden-sm visible-xs">
        <HouseDetailsXs />
      </div>
    );
  }

  renderHouseDetailsSm(){
    return(
      <div className="hidden-xs hidden-md hidden-xl visible-sm">
        <HouseDetailsSm />
      </div>
    );
  }


  render(){
    return(
      <div>
        {this.renderHouseDetailsXl()}
        {this.renderHouseDetailsXs()}
        {this.renderHouseDetailsMd()}
        {this.renderHouseDetailsSm()}
      </div>
    );
}
}
export default HouseDetails;
