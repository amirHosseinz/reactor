import React from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper, HeatMap} from 'google-maps-react';

export class MapRenderer extends React.Component{
    render(){
      return(
        <Map
          google={this.props.google}
          zoom={this.props.zoom}
          className="kolsoom"
          initialCenter={this.props.position}
          >
          <Marker
            position={this.props.position}
            icon={{url:require('./dayere.png'),
          }}
          />
        </Map>
      );
    }
}

export default GoogleApiWrapper({
  apiKey: ('AIzaSyDYdvxvYa5_HuFrQMlTNWpbhan7nqIJuOE')
})(MapRenderer)
