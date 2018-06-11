import React from 'react';
import { Map, Path, TileLayer,Circle} from 'react-leaflet';


class MapRendererMd extends React.Component{
  constructor(props) {
    super(props);
    this.state ={
      lat: this.props.lat,
      lng: this.props.lng,
      zoom: 13,
    }
  }

  render(){
    const position = [this.state.lat, this.state.lng]
    return(
      <Map id="mapid-md" className="leaflet-map" center={position} zoom={this.state.zoom}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
        <Circle fillColor="#12b2ce" radius={600} center={position}/>
      </Map>
    );
  }
}

export default MapRendererMd;
