import React from 'react';
import {Image,Divider} from 'semantic-ui-react';
import {englishToPersianDigits} from '../tools/EnglishToPersianDigits.js';
import './ContactUs.css';
import { Map, Path, TileLayer, Marker} from 'react-leaflet';


class ContactUsMD extends React.Component{
  componentWillMount(){
    document.body.backgroundColor="#f8f8f8";
  }

  render(){
    return (
      <div className="contact-us-main-division-md">
        <div className="contact-us-map-section col-md-4">
          <TripinnMap />
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
            <span> تهران، خیابان دادمان، تقاطع درختی، روبروی سازمان امور مالیاتی، پلاک</span>
            <span>{englishToPersianDigits("97")}،</span>
            <span>واحد {englishToPersianDigits("3")}</span>


            </p>
            <div className="contact-us-contact-info">
              <div className="contact-us-postal-code">
              {englishToPersianDigits(1468694134)} : کدپستی
              </div>
              <div className="contact-us-tel-number">
                {englishToPersianDigits("021 - 88573037")} : تلفن
              </div>
            <div className="contact-us-email">
              <span><a className="orng-anchors" href="mailto:support@tripinn.ir"> support@tripinn.ir </a></span>
              <span>   : ایمیل </span>

            </div>
            <div className="contact-us-divider"></div>
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

class TripinnMap extends React.Component{
  render(){
    const position = [35.765068, 51.354639]
    return(
      <Map scrollWheelZoom={false} touchZoom={false} id="tripinn-map-md" className="leaflet-map" center={position} zoom={17}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
        <Marker position={position}/>
      </Map>
    );
  }
}

export default ContactUsMD;
