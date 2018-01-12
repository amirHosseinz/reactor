import React from 'react';
import Facilities from './Facilities.js';
import { englishToPersianDigits } from '../tools/EnglishToPersianDigits';

class SpecialRule extends React.Component{


renderSpecialRules (){
  if(this.props.homeData.special_rules!==''){
    return (
      <div className='special-rules'>
          <p className="des-main-xs">{this.props.homeData.special_rules}</p>
      </div>
    );
  }
}
  render(){
    return(
        <div className="main-descriptions row">
           <div>
              {this.renderSpecialRules()}
            </div>
        </div>
    );
  }
}
export default SpecialRule;
