import React from 'react';
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from "react-google-maps";

const Map = withScriptjs(withGoogleMap((props) =>
    <GoogleMap
    defaultZoom={11}
    defaultCenter={{lat: -40,lng: 80 }}>
    {props.isMarkerShown && <Marker position={{ lat:props.lat , lng:props.lng}} />}
  </GoogleMap>
))

export default Map;
