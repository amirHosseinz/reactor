import React from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper, HeatMap} from 'google-maps-react';

export class MapRenderer extends React.Component{
    render(){
      return(
        <div>
          <div className="hidden-xs visible-xl">
            <Map
              google={this.props.google}
              onChange={(event)=>{console.log(event)}}
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
          </div>
          <div className="hidden-xl visible-xs">
            <Map
              google={this.props.google}
              zoom={this.props.zoom}
              className="map-xs"
              initialCenter={this.props.position}
              >
              <Marker
                position={this.props.position}
                icon={{url:require('./dayere.png'),
              }}
              />
            </Map>
          </div>
        </div>
      );
    }
}

export default GoogleApiWrapper({
  apiKey: ('AIzaSyDYdvxvYa5_HuFrQMlTNWpbhan7nqIJuOE')
})(MapRenderer)
