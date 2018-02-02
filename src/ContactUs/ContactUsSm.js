import React from 'react';
import { withScriptjs ,withGoogleMap, GoogleMap,Marker } from "react-google-maps";
import {Image,Divider} from 'semantic-ui-react';
import {englishToPersianDigits} from '../tools/EnglishToPersianDigits.js';


const MyMapComponent = withScriptjs(withGoogleMap((props) =>{
  return(
    <GoogleMap
      defaultZoom={props.zoom}
      defaultCenter={{lat:props.lat,lng:props.lng}}>
      <Marker defaultPosition={{lat:props.lat,lng:props.lng}}
      defaultIcon={require('../Images/pin.png')}/>
    </GoogleMap>
  );
}));
class ContactUsSm extends React.Component{

  componentWillMount(){
    document.body.backgroundColor="#f8f8f8";
  }
  render(){
    return (
      <div>
      </div>
    );
  }
}
class Map extends React.Component{
  render(){
    return(
      <MyMapComponent
        lat={35.765068}
        lng={51.354639}
        zoom={16}
        googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyDYdvxvYa5_HuFrQMlTNWpbhan7nqIJuOE&v=3.exp&libraries=geometry,drawing,places"
        loadingElement={<div style={{height:`100%`}} />}
        containerElement={<div style={{height:'600px',width:'400px'}} />}
        mapElement={<div style={{height:'80%'}} />}>
        </MyMapComponent>
    );
  }
}

export default ContactUsSm;
