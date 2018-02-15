import React from 'react';
import {englishToPersianDigits} from '../../tools/EnglishToPersianDigits.js';


class CheckInCheckOutDescriptionXl extends React.Component{

  renderCheckIn(){
   if(this.props.homeData.check_in_from){
    const checkin=this.props.homeData.check_in_from;
    const checkintill=this.props.homeData.check_in_till;
    const checkin1=checkin.split(":", 2);
    const checkintill1=checkintill.split(":", 2);
    return(

       <div className="house-details-public-rules-div">
         <img src={require('../rules/checkin.png')}   className="house-details-other-rules-icon" alt = "" />
         <p className="house-details-rules-text-xl">
       ساعت ورود: {englishToPersianDigits(checkin1[0]+":"+checkin1[1]+" تا "+checkintill1[0]+":"+checkintill1[1])}
         </p>
         </div>


    );
  }
  return null;
}
  renderCheckOut(){
    if(this.props.homeData.check_out){
    const checkout=this.props.homeData.check_out;
    const checkout1=checkout.split(":", 2);
    return(

      <div className="house-details-public-rules-div">
        <img src={require('../rules/checkout.png')}   className="house-details-other-rules-icon" alt = "" />
        <p className="house-details-rules-text-xl">
         ساعت خروج: {englishToPersianDigits(checkout1[0]+":"+checkout1[1])}
       </p>
      </div>
    );
  }
  return null;
}
  render(){
    return(
          <div>
            {this.renderCheckIn()}
            {this.renderCheckOut()}
          </div>

    );
  }
}

export default CheckInCheckOutDescriptionXl;
