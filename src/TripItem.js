import React from 'react';
import TripItemXl from './TripItem/TripItemXl.js';
import TripItemXs from './TripItem/TripItemXs.js';
import TripItemMd from './TripItem/TripItemMd.js';
import TripItemSm from './TripItem/TripItemSm.js';


class TripItem extends React.Component{
  constructor(props){
    super(props);
    this.state={
      trip : null,
      tripStatus : null,
    }
  }
  componentWillReceiveProps(nextProps){
    this.setState({
      trip:nextProps.reserveDetail,tripStatus:nextProps.reserveDetail.status,
    });
  }

  renderTripItemXl(){
    return(
      <div className="hidden-xs hidden-md hidden-sm visible-xl">
        <TripItemXl reserveDetail={this.state.trip} tripStatus={this.state.tripStatus}/>
      </div>
    );
  }

  renderTripItemXs(){
    return(
      <div className="hidden-xl hidden-md hidden-sm visible-xs">
        <TripItemXs />
      </div>
    );
  }

  renderTripItemMd(){
    return(
      <div className="hidden-xs hidden-xl hidden-sm visible-md">
        <TripItemMd />
      </div>
    );
  }

  renderTripItemSm(){
    return(
      <div className="hidden-xs hidden-md hidden-xl visible-sm">
        <TripItemSm />
      </div>
    );
  }

  render(){
    return(
      <div>
        {this.renderTripItemMd()}
        {this.renderTripItemXs()}
        {this.renderTripItemXl()}
        {this.renderTripItemSm()}
      </div>
    );
  }
}
export default TripItem;
