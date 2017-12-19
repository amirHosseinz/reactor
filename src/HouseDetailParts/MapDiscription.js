import React from 'react';
import Map from './Map.js';
class MapDiscription extends React.Component {
  render(){
    return(
      <div>
        <Map
          zoom={13}
          lat={parseFloat(this.props.homeData.latitude)}
          lng={parseFloat(this.props.homeData.longitude)}
          isMarkerShown={true}
          googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyDYdvxvYa5_HuFrQMlTNWpbhan7nqIJuOE&v=3.exp&libraries=geometry,drawing,places"
         loadingElement={<div style={{ height: `100%` }} />}
         containerElement={<div style={{ height:`400px`,width:`100%`}} />}
         mapElement={<div style={{ height: `100%` }} />} />
      </div>
    );
  }
}
export default MapDiscription;
