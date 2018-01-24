import React from 'react';
import { withScriptjs ,withGoogleMap, GoogleMap,Circle , Marker } from "react-google-maps"


const MyMapComponent = withScriptjs(withGoogleMap((props) =>{
  // console.log(props);
  return(
    <GoogleMap
      defaultZoom={props.zoom}
      defaultCenter={{lat:props.lat,lng:props.lng}}>
      <Circle options={{fillOpacity:0.5,fillColor:"#12b2ce",strokeColor:"#12b2ce"}} radius={1000} defaultCenter={{lat:props.lat,lng:props.lng}}/>
    </GoogleMap>
  );
}))


export class MapDescription extends React.Component{

    render(){
      return(
        <div>
        <MyMapComponent
          lat={this.props.lat}
          lng={this.props.lng}
          zoom={this.props.zoom}
          googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyDYdvxvYa5_HuFrQMlTNWpbhan7nqIJuOE&v=3.exp&libraries=geometry,drawing,places"
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `400px` }} />}
          mapElement={<div style={{ height: `100%` }} />}>
          </MyMapComponent>
        </div>
      );
    }
}

export default MapDescription;
