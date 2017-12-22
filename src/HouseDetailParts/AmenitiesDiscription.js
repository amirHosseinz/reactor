import React from 'react';
import { englishToPersianDigits } from '../tools/EnglishToPersianDigits';


class AmenitiesDiscription extends React.Component{
  render(){
    return(
      <div className="main-amanities row">
        <div className='main-amanities-item col-md-3'>
            <img src="http://image.ibb.co/fWec9m/baths.png"  className="main-amanities-icon" alt = "" />
            <p className='aminities-text'>حمام {englishToPersianDigits(this.props.homeData.bath_room_number)} </p>
        </div>
        <div className='main-amanities-item col-md-3'>
            <img src="http://image.ibb.co/kWoth6/beds.png"  className="main-amanities-icon" alt = "" />
            <p className='aminities-text'>تخت {englishToPersianDigits(this.props.homeData.beds_number)} </p>
        </div>
        <div className='main-amanities-item col-md-3'>
            <img src="http://image.ibb.co/dNn8FR/rooms.png"  className="main-amanities-icon" alt = "" />
            <p className='aminities-text'>اتاق {englishToPersianDigits(this.props.homeData.rooms_number)} </p>
        </div>
        <div className='main-amanities-item col-md-3'>
           <img src="http://image.ibb.co/hx4oFR/persons.png"  className="main-amanities-icon" alt = "" />
           <p className='aminities-text'>مهمان {englishToPersianDigits(this.props.homeData.capacity)} </p>
        </div>
      </div>
    );
  }
}
export default AmenitiesDiscription;
