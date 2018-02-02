import React from 'react';
import TripsXl from './Trips/TripsXl.js';
import TripsXs from './Trips/TripsXs.js';
import TripsSm from './Trips/TripsSm.js';
import TripsMd from './Trips/TripsMd.js';
class Trips extends React.Component{

  renderTripsXl(){
    return(
      <div className="hidden-xs hidden-md hidden-sm visible-xl">
        <TripsXl changeTripDetail={this.props.changeTripDetail.bind(this)}/>
      </div>
    );
  }

  renderTripsXs(){
    return(
      <div className="hidden-xl hidden-md hidden-sm visible-xs">
        <TripsXs changeTripDetail={this.props.changeTripDetail.bind(this)}/>
      </div>
    );
  }

  renderTripsMd(){
    return(
      <div className="hidden-xs hidden-xl hidden-sm visible-md">
        <TripsMd changeTripDetail={this.props.changeTripDetail.bind(this)}/>
      </div>
    );
  }

  renderTripsSm(){
    return(
      <div className="hidden-xs hidden-md hidden-xl visible-sm">
        <TripsSm changeTripDetail={this.props.changeTripDetail.bind(this)}/>
      </div>
    );
  }
  render(){
    return(
      <div>
        {this.renderTripsSm()}
        {this.renderTripsXl()}
        {this.renderTripsXs()}
        {this.renderTripsMd()}
      </div>

    );
  }
}
export default Trips;
