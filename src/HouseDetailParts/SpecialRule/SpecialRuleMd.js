import React from 'react';
import Facilities from '../Facilities.js';
import { englishToPersianDigits } from '../../tools/EnglishToPersianDigits';

class SpecialRuleMd extends React.Component{


renderSpecialRules (){
  if(this.props.homeData.special_rules!==''){
    return (
      <div>
          <p className="house-details-description-content">{this.props.homeData.special_rules}</p>
      </div>
    );
  }
}
  render(){
    return(
           <div>
              {this.renderSpecialRules()}
            </div>
    );
  }
}
export default SpecialRuleMd;
