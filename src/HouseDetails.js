import React from 'react';
import HouseDetailsXl from './HouseDetails/HouseDetailsXl.js';
import HouseDetailsXs from './HouseDetails/HouseDetailsXs.js';
import HouseDetailsMd from './HouseDetails/HouseDetailsMd.js';
import HouseDetailsSm from './HouseDetails/HouseDetailsSm.js';


class HouseDetails extends React.Component {
  renderHouseDetailsXl(props){
    return(
      <div className="hidden-xs hidden-md hidden-sm visible-xl">
        <HouseDetailsXl {...props}/>
      </div>
    );
  }

  renderHouseDetailsMd(props){
    return(
      <div className="hidden-xs hidden-xl hidden-sm visible-md">
        <HouseDetailsMd {...props}/>
      </div>
    );
  }

  renderHouseDetailsXs(props){
    return(
      <div className="hidden-xl hidden-md hidden-sm visible-xs">
        <HouseDetailsXs {...props}/>
      </div>
    );
  }

  renderHouseDetailsSm(props){
    return(
      <div className="hidden-xs hidden-md hidden-xl visible-sm">
        <HouseDetailsSm {...props}/>
      </div>
    );
  }

  render(){
    return(
      <div>
        {this.renderHouseDetailsXl(this.props)}
        {this.renderHouseDetailsXs(this.props)}
        {this.renderHouseDetailsMd(this.props)}
        {this.renderHouseDetailsSm(this.props)}
      </div>
    );
}
}
export default HouseDetails;
