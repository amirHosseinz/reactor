import React from 'react';
import {englishToPersianDigits} from '../../tools/EnglishToPersianDigits.js';




class MaxCapacityMd extends React.Component{

  renderRelevantMaxCapacity(){
    switch(window.location.href.split("/")[window.location.href.split("/").length-2]){
      case 'rooms':{
        return englishToPersianDigits(this.props.homeData.max_capacity);
      }
      case 'ecotourism':{
        return englishToPersianDigits(this.props.homeData.total_capacity);
      }
    }
  }
  render(){
    return(
      <div className="house-details-public-rules-div">
        <img src={require('../rules/max-cap.png')}  className="house-details-other-rules-icon" alt = "" />
         <p className="house-details-rules-text-xl">
           حداکثر ظرفیت: {this.renderRelevantMaxCapacity()}
         </p>
     </div>

    );
  }
}

export default MaxCapacityMd;
