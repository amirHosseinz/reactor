import React from 'react';
import { englishToPersianDigits } from '../tools/EnglishToPersianDigits';


class AmenitiesDiscription extends React.Component{
  render(){
    return(
      <div>
        <div className="main-amanities row hidden-xs visible-xl">
          <div className='main-amanities-item col-md-3'>
              <img src={require('./facilities/baths.png')}  className="main-amanities-icon" alt = "" />
              <p className='aminities-text'> {englishToPersianDigits(this.props.homeData.bath_room_number)} </p>
              <p className='aminities-text'>حمام </p>
          </div>
          <div className='main-amanities-item col-md-3'>
              <img src={require('./facilities/beds.png')}  className="main-amanities-icon" alt = "" />
              <p className='aminities-text'> {englishToPersianDigits(this.props.homeData.beds_number + 2 * this.props.homeData.double_beds_number)} </p>
              <p className='aminities-text'>تخت</p>
          </div>
          <div className='main-amanities-item col-md-3'>
              <img src={require('./facilities/rooms.png')}  className="main-amanities-icon" alt = "" />
              <p className='aminities-text'>{englishToPersianDigits(this.props.homeData.rooms_number)} </p>
              <p className='aminities-text'> اتاق</p>
          </div>
          <div className='main-amanities-item col-md-3'>
             <img src={require('./facilities/persons.png')}  className="main-amanities-icon" alt = "" />
             <p className='aminities-text'> {englishToPersianDigits(this.props.homeData.capacity)} </p>
             <p className='aminities-text'> مهمان </p>
          </div>
        </div>


        <div className="hidden-xl visible-xs">
          <div className="main-amanities-xs">
            <div className='amanities-div-xs col-xs-3'>
                <img src={require('./facilities/baths.png')}  className="main-amanities-icon-xs" alt = "" />

            </div>
            <div className='amanities-div-xs col-xs-3'>
                <img src={require('./facilities/beds.png')}  className="main-amanities-icon-xs" alt = "" />

            </div>
            <div className='amanities-div-xs col-xs-3'>
                <img src={require('./facilities/rooms.png')}  className="main-amanities-icon-xs" alt = "" />

            </div>
            <div className='amanities-div-xs col-xs-3'>
               <img src={require('./facilities/persons.png')}  className="main-amanities-icon-xs" alt = "" />
            </div>
          </div>
          <div className="spaced-dises">
            <div className='main-amanities-item-xs '>
              <p className='aminities-text-xs'> {englishToPersianDigits(this.props.homeData.bath_room_number)}</p>
              <p className='aminities-text-xs'>  حمام </p>
            </div>
            <div className='main-amanities-item-xs  '>
              <p className='aminities-text-xs'>  {englishToPersianDigits(this.props.homeData.beds_number + 2 * this.props.homeData.double_beds_number)}</p>
              <p className='aminities-text-xs'>تخت</p>
            </div>
            <div className='main-amanities-item-xs '>
              <p className='aminities-text-xs'>  {englishToPersianDigits(this.props.homeData.rooms_number)}</p>
              <p className='aminities-text-xs'>اتاق</p>
            </div>
            <div className='main-amanities-item-xs '>
              <p className='aminities-text-xs'>  {englishToPersianDigits(this.props.homeData.capacity)}</p>
              <p className='aminities-text-xs'>مهمان</p>
           </div>
          </div>
        </div>

      </div>
    );
  }
}
export default AmenitiesDiscription;
