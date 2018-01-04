import React from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper, HeatMap} from 'google-maps-react';

export class MapRenderer extends React.Component{
    render(){
      return(
        <Map
          google={this.props.google}
          zoom={this.props.zoom}
          style={this.props.style}
          initialCenter={this.props.position}>
          <Marker
            position={this.props.position}
            icon={{url:require('./dayere.png')}}
          />
          <HeatMap
            gradient={1}
            radius={20}
            opacity={0.2}
          />
        </Map>
      );
    }
}

export default GoogleApiWrapper({
  apiKey: ('AIzaSyDYdvxvYa5_HuFrQMlTNWpbhan7nqIJuOE')
})(MapRenderer)
