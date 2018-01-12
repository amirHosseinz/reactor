import React from 'react';
import Facilities from './Facilities.js';
import { englishToPersianDigits } from '../tools/EnglishToPersianDigits';

class RulesDescription extends React.Component{


  renderSmoking(){
    const smoking=this.props.homeData.smoking_allowed;
    if (smoking===false){
      return(
        <div className="public-rules-div">
          <img src={require('./rules/cigarette.png')}   className="other-rules-icon" alt = "" />
          <p className="facility-text">ممنوعیت استعمال دخانیات </p>
        </div>
      );
    }
  }


renderPet(){
  const pet=this.props.homeData.pet_allowed;
  if(pet===false){
    return(
      <div className="public-rules-div">
        <img src={require('./rules/dog.png')}   className="other-rules-icon" alt = "" />
        <p className="facility-text">ممنوعیت ورود حیوان به خانه</p>
        </div>
    );
  }
}


renderParty(){
  const party=this.props.homeData.party_allowed;
  if(party===false){
    return(
      <div className="public-rules-div">
      <img src={require('./rules/singles.png')}   className="other-rules-icon" alt = "" />
        <p className="facility-text">ممنوعیت برگزاری جشن </p>
      </div>
    );
  }
}


  render(){
    return(
        <div className="main-descriptions row">
          <div className="rules">
            {this.renderParty()}
            {this.renderPet()}
            {this.renderSmoking()}
          </div>

        </div>
    );
  }
}
export default RulesDescription;
