import React from 'react';
import { withScriptjs ,withGoogleMap, GoogleMap,Marker } from "react-google-maps";
import {Image} from 'semantic-ui-react';

const MyMapComponent = withScriptjs(withGoogleMap((props) =>{
  return(
    <GoogleMap
      defaultZoom={props.zoom}
      defaultCenter={{lat:props.lat,lng:props.lng}}>
      <Marker defaultPosition={{lat:props.lat,lng:props.lng}}
      defaultIcon={require('./Images/pin.png')}/>
    </GoogleMap>
  );
}));

class ContactUs extends React.Component {
  render(){
    return(
      <div className="contact-us-main-division">
        <div className="contact-us-main-division-content">
          <div className="contact-us-main-division-content-text">
          <div className="contact-us-header-section">
            <span>تماس با</span><span style={{color:"#12b2ce"}}> تریپین </span>
          </div>
          <p className="contact-us-firm-name-section">
            دفتر مرکزی شرکت طراحی و راهبری فناوران دانش‌سامان آریا
          </p>
          <p className="contact-us-address-section">
          آدرس: تهران، خیابان دادمان تقاطع درختی، روبروی سازمان امور مالیاتی، پلاک 97، واحد
          </p>
          <div className="contact-us-contact-info">
            <div className="contact-us-postal-code">
              کدپستی : 1468694134
            </div>
            <div className="contact-us-tel-number">
              تلفن : 02188573037
            </div>
            <div className="contact-us-email">
              ایمیل : support@tripinn.ir
            </div>
          </div>
          <div className="contact-us-social-media-section">
            <div className="contact-us-social-media-sentence">
                ما را در شبکه های اجتماعی دنبال کنید
            </div>
            <div className="contact-us-social-media-links row-reverse">
            <div className="contact-us-social-link">
              <img height={20} width={20} src={require('./Images/trypinn-instagram.png')} alt=""/>
            </div>
            <div className="contact-us-social-link">
              <img height={20} width={20}src={require('./Images/trypinn-twitter.png')} alt=""/>
            </div>
            <div className="contact-us-social-link">
              <img height={20} width={20} src={require('./Images/trypinn-telegram-channel.png')} alt=""/>
            </div>
            </div>
          </div>
          </div>

          <div className="contact-us-map-section">
            <Map />
          </div>
        </div>
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
export default ContactUs;
