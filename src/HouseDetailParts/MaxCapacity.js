import React from 'react';
import {englishToPersianDigits} from '../tools/EnglishToPersianDigits.js';


class MaxCapacity extends React.Component{
  render(){
    return(
      <div className="main-descriptions row">
      <p> حداکثر ظرفیت: {englishToPersianDigits(this.props.homeData.max_capacity)}</p>
      </div>
    );
  }
}

export default MaxCapacity;
