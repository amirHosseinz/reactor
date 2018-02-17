import React from 'react';
import Facilities from '../Facilities.js';
import { englishToPersianDigits } from '../../tools/EnglishToPersianDigits';

class RulesDescriptionXl extends React.Component{

  renderSmoking(){
    const smoking=this.props.homeData.smoking_allowed;
    if (smoking===false){
      return(
        <div className="house-details-public-rules-div">
          <img src={require('../rules/cigarette.png')}   className="house-details-other-rules-icon" alt = "" />
          <p className="house-details-rules-text-xl">ممنوعیت استعمال دخانیات </p>
        </div>
      );
    }
  }


renderPet(){
  const pet=this.props.homeData.pet_allowed;
  if(pet===false){
    return(
      <div className="house-details-public-rules-div">
        <img src={require('../rules/dog.png')}   className="house-details-other-rules-icon" alt = "" />
        <p className="house-details-rules-text-xl">ممنوعیت ورود حیوان به خانه</p>
        </div>
    );
  }
}


renderParty(){
  const party=this.props.homeData.party_allowed;
  if(party===false){
    return(
      <div className="house-details-public-rules-div">
      <img src={require('../rules/singles.png')}   className="house-details-other-rules-icon" alt = "" />
        <p className="house-details-rules-text-xl">ممنوعیت برگزاری جشن </p>
      </div>
    );
  }
}
  render(){
    return(
        <div className="house-details-rules-container">
          {this.renderParty()}
          {this.renderPet()}
          {this.renderSmoking()}
        </div>
    );
  }
}

export default RulesDescriptionXl;
