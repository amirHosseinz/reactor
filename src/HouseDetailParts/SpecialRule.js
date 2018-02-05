import React from 'react';
import {englishToPersianDigits} from '../tools/EnglishToPersianDigits.js';
import SpecialRuleSm from './SpecialRule/SpecialRuleSm.js';
import SpecialRuleXs  from './SpecialRule/SpecialRuleXs.js';
import SpecialRuleMd  from './SpecialRule/SpecialRuleMd.js';
import SpecialRuleXl  from './SpecialRule/SpecialRuleXl.js';


class SpecialRule extends React.Component{

  renderSpecialRuleXl(props){
    return(
      <div className="hidden-xs hidden-md hidden-sm visible-xl">
        <SpecialRuleXl {...props}/>
      </div>
    );
  }

  renderSpecialRuleXs(props){
    return(
      <div className="hidden-xl hidden-md hidden-sm visible-xs">
        <SpecialRuleXs {...props}/>
      </div>
    );
  }

  renderSpecialRuleMd(props){
    return(
      <div className="hidden-xs hidden-xl hidden-sm visible-md">
        <SpecialRuleMd {...props}/>
      </div>
    );
  }

  renderSpecialRuleSm(props){
    return(
      <div className="hidden-xs hidden-md hidden-xl visible-sm">
        <SpecialRuleSm {...props}/>
      </div>
    );
  }

render(){
  return(
    <div>
    {this.renderSpecialRuleXl(this.props)}
    {this.renderSpecialRuleXs(this.props)}
    {this.renderSpecialRuleMd(this.props)}
    {this.renderSpecialRuleSm(this.props)}
        </div>
  );
}
}


export default SpecialRule;
