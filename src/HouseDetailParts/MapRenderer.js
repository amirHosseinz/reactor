import React from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

export class MapRenderer extends React.Component{
    render(){
      return(
        <Map
          google={this.props.google}
          zoom={14}
          className='house-google-map'
          initialCenter={this.props.position}>
          <Marker
            name={'Villa'}
            position={this.props.position}
          />
        </Map>
      );
    }
}

export default GoogleApiWrapper({
  apiKey: ('AIzaSyDYdvxvYa5_HuFrQMlTNWpbhan7nqIJuOE')
})(MapRenderer)
