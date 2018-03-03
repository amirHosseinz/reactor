import React from 'react';
import {englishToPersianDigits } from '../../tools/EnglishToPersianDigits.js';


class AmenitiesDescriptionXl extends React.Component{
    renderBeds(){
      if(this.props.homeData.beds_number + 2 * this.props.homeData.double_beds_number){
        return(
          <p className='aminities-text'>
          {englishToPersianDigits(this.props.homeData.beds_number + 2 * this.props.homeData.double_beds_number)}
          </p>
      );
    }
    }
  renderRelevantAmenitiesDescription(){
    switch(window.location.href.split("/")[window.location.href.split("/").length-2]){
      case 'rooms':{
        return(
          <div className="main-amanities">
            <div className='main-amanities-item'>
              <img height="56px" width="56px" src={require('../facilities/guest_numbers.png')}  className="main-amanities-icon" alt = "" />
              <p className='aminities-text'> {englishToPersianDigits(this.props.homeData.capacity)} </p>
              <p className='aminities-text-static-xl'> مهمان </p>
              <img height="56px" width="56px" src={require('../facilities/rooms.png')}  className="main-amanities-icon" alt = "" />
              <p className='aminities-text'>{englishToPersianDigits(this.props.homeData.rooms_number)} </p>
              <p className='aminities-text-static-xl'> اتاق</p>
              <img  height="56px" width="56px" src={require('../facilities/beds.png')}  className="main-amanities-icon" alt = "" />
              {this.renderBeds()}
              <p className='aminities-text-static-xl'>تخت</p>
              <img height="56px" width="56px" src={require('../facilities/bath.png')}  className="main-amanities-icon" alt = "" />
              <p className='aminities-text'> {englishToPersianDigits(this.props.homeData.bath_room_number)} </p>
              <p className='aminities-text-static-xl'>حمام </p>
            </div>
          </div>
        );
      }

      case 'ecotourism':{
        return(
          <div className="main-amanities-ecotourism">
            <div className='main-amanities-item-ecotourism-room'>
              <div className="main-amanities-item-ecotourism-content">
                <img height="74px" width="74px" src={require('../facilities/rooms.svg')}  alt = "" />
                <div className="amenities-text-ecotourism">
                  <p className='aminities-title-text'> {englishToPersianDigits(this.props.homeData.rooms_number)}  اتاق</p>
                  <p className="aminities-title-description"> در اقامتگاه</p>
                </div>
              </div>
            </div>
            <div className='main-amanities-item-ecotourism-bed'>
              <div className="main-amanities-item-ecotourism-content">
                <img height="74px" width="74px" src={require('../facilities/sleep.svg')}  alt = "" />
                <div className="amenities-text-ecotourism">
                  <p className='aminities-title-text'> {englishToPersianDigits(this.props.homeData.total_capacity)}  سرویس خواب</p>
                  <p className="aminities-title-description"> {this.renderBedServiceType()}</p>
                </div>
              </div>
            </div>
            <div className='main-amanities-item-ecotourism'>
              <div className="main-amanities-item-ecotourism-content">
                <img height="74px" width="74px" src={require('../facilities/food.svg')}  alt = "" />
                <div className="amenities-text-ecotourism">
                  <p className='aminities-title-text'>
                  {(this.props.homeData.food_service_type.length!==0)?englishToPersianDigits(this.props.homeData.food_service_type.length)+'وعده ':'ندارد'}
                </p>
                  <p className="aminities-title-description">{this.renderFoodServiceType()}</p>
                </div>
              </div>
            </div>
            <div className='main-amanities-item-ecotourism'>
              <div className="main-amanities-item-ecotourism-content">
                <img height="74px" width="74px" src={require('../facilities/urbn-rural.svg')}  alt = "" />
                <div className="amenities-text-ecotourism">
                  <p className='aminities-title-text'> {this.renderEcoTourismType()}</p>
                  <p className="aminities-title-description"> نوع دسترسی</p>
                </div>
              </div>
            </div>
          </div>
        );
      }
    }
  }
  renderEcoTourismType(){
    if(this.props.homeData.room_type.indexOf('RURAL')!==-1){
      return 'روستایی';
    }
    if(this.props.homeData.room_type.indexOf('URBAN')!==-1){
      return 'شهری';
    }
    if(this.props.homeData.room_type.indexOf('JUNGLE')!==-1){
      return 'جنگلی';
    }
    if(this.props.homeData.room_type.indexOf('DESERT')!==-1){
      return 'صحرایی';
    }
    if(this.props.homeData.room_type.indexOf('GROVE')!==-1){
      return 'دشت';
    }
    if(this.props.homeData.room_type.indexOf('COASTAL')!==-1){
      return 'ساحلی';
    }
  }
  renderBedServiceType(){
    if(this.props.homeData.general_utils_options.indexOf('BED')!==-1 && this.props.homeData.general_utils_options.indexOf('MATTRESS')!==-1){
      return 'تخت‌خواب + سنتی';
    }
    if(this.props.homeData.general_utils_options.indexOf('BED')!==-1){
      return 'تخت‌خواب';
    }
    if(this.props.homeData.general_utils_options.indexOf('MATTRESS')!==-1){
      return 'سنتی';
    }
  }
  renderFoodServiceType(){
    var foodServiceType="";
    if(this.props.homeData.food_service_type.indexOf('BREAK_FAST_INCLUDED')!==-1){
      foodServiceType = foodServiceType + 'صبحانه';
    }
    if(this.props.homeData.food_service_type.indexOf('LUNCH_INCLUDED')!==-1){
      foodServiceType = foodServiceType + '، نهار';
    }
    if(this.props.homeData.food_service_type.indexOf('DINNER_INCLUDED')!==-1){
      foodServiceType = foodServiceType + '، شام';
    }
    return foodServiceType;
  }
  render(){
    return(
      <div>
        {this.renderRelevantAmenitiesDescription()}
      </div>
    );
  }
}

export default AmenitiesDescriptionXl;
