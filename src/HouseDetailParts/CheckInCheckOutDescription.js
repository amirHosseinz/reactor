import React from 'react';
import {englishToPersianDigits} from '../tools/EnglishToPersianDigits.js';


class CheckInCheckOutDescription extends React.Component{

  renderCheckIn(){
   if(this.props.homeData.check_in_from){
    const checkin=this.props.homeData.check_in_from;
    const checkintill=this.props.homeData.check_in_till;
    const checkin1=checkin.split(":", 2);
    const checkintill1=checkintill.split(":", 2);
    return(
      <div className="check-in">
       ساعت ورود: {englishToPersianDigits(checkin1[0]+":"+checkin1[1]+" تا "+checkintill1[0]+":"+checkintill1[1])}
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

      <div className="check-out">
       ساعت خروج: {englishToPersianDigits(checkout1[0]+":"+checkout1[1])}
                   <div className="divider-card"></div>
      </div>
    );
  }
  return null;
}
  render(){
    return(
      <div className="main-descriptions row">
          <div>
            {this.renderCheckIn()}
            {this.renderCheckOut()}
          </div>
      </div>
    );
  }
}

export default CheckInCheckOutDescription;
