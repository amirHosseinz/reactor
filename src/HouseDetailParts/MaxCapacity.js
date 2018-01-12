import React from 'react';
import {englishToPersianDigits} from '../tools/EnglishToPersianDigits.js';


class MaxCapacity extends React.Component{
  render(){
    return(
      <div className="main-descriptions-cap row">
          <div>
             <div className="public-rules-div">
               <img src={require('./rules/max-cap.png')}  className="other-rules-icon" alt = "" />
                <p className="facility-text" >
                  حداکثر ظرفیت: {englishToPersianDigits(this.props.homeData.max_capacity)}
                </p>
              </div>
            </div>
          </div>
    );
  }
}

export default MaxCapacity;
