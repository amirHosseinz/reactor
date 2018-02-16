import React from 'react';
import {englishToPersianDigits} from '../../tools/EnglishToPersianDigits.js';




class MaxCapacityMd extends React.Component{
  render(){
    return(
      <div className="house-details-public-rules-div">
        <img src={require('../rules/max-cap.png')}  className="house-details-other-rules-icon" alt = "" />
         <p className="house-details-rules-text-xl">
           حداکثر ظرفیت: {englishToPersianDigits(this.props.homeData.max_capacity)}
         </p>
     </div>

    );
  }
}

export default MaxCapacityMd;
