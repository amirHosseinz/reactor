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
class ContactUsXl extends React.Component{
  componentWillMount(){
    document.body.backgroundColor="#f8f8f8";
  }
  
  render(){
    return (
      <div className="contact-us-main-division">
        <div className="contact-us-map-section col-md-4">
          <Map />
        </div>
        <div className="contact-us-main-division-content col-md-8">
          <div className="contact-us-main-division-content-text">
          <div className="contact-us-header-section">
            <span>تماس با
            </span>
            <span style={{color:"#12b2ce"}}> تریپین </span>
          </div>
          <div className="contact-texts">
            <p className="contact-us-firm-name-section">
              دفتر مرکزی شرکت طراحی و راهبری فناوران دانش‌سامان آریا
            </p>
            <p className="contact-us-address-section">
            <span>آدرس : </span>
            <span> تهران،خیابان دادمان،تقاطع درختی، روبروی سازمان امور مالیاتی، پلاک </span>
            <span>{englishToPersianDigits("97")}،</span>
            <span>واحد {englishToPersianDigits("2")}</span>


            </p>
            <div className="contact-us-contact-info">
              <div className="contact-us-postal-code">
              {englishToPersianDigits(1468694134)} : کدپستی
              </div>
              <div className="contact-us-tel-number">
                {englishToPersianDigits("02188573037")} : تلفن
              </div>
            <div className="contact-us-email">
              <span><a className="orng-anchors" href="mailto:support@tripinn.ir"> support@tripinn.ir </a></span>
              <span>   : ایمیل </span>

            </div>
            <Divider/>
            <div className="contact-us-social-media-sentence">
                ما را در شبکه های اجتماعی دنبال کنید:
            </div>
            <div className="contact-us-social-media-section">

              <div className="contact-us-social-media-links row-reverse">
                <div className="contact-us-social-link">
                  <a href="https://instagram.com/tripinn.ir"><img height={21} className="social-icon-contactus"  src={require('../Images/trypinn-instagram.png')} alt=""/></a>
                </div>
                <div className="contact-us-social-link">
                <a href="https://twitter.com/tripinni">  <img height={21} className="social-icon-contactus" src={require('../Images/trypinn-twitter.png')} alt=""/></a>
                </div>
                <div className="contact-us-social-link">
                <a href="https://telegram.me/tripinni">  <img height={21} className="social-icon-contactus" src={require('../Images/trypinn-telegram-channel.png')} alt=""/></a>
                </div>
              </div>
            </div>
          </div>
          </div>
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

export default ContactUsXl;
