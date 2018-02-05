import React from 'react';
import RulesDescriptionXl from './RulesDescription/RulesDescriptionXl.js';
import RulesDescriptionXs from './RulesDescription/RulesDescriptionXs.js';
import RulesDescriptionSm from './RulesDescription/RulesDescriptionSm.js';
import RulesDescriptionMd from './RulesDescription/RulesDescriptionMd.js';


class RulesDescription extends React.Component{

  renderRulesDescriptionMd(props){
    return(
      <div className="hidden-xs hidden-xl hidden-sm visible-md">
        <RulesDescriptionMd {...props}/>
      </div>
    );
  }

  renderRulesDescriptionSm(props){
    return(
      <div className="hidden-xs hidden-md hidden-xl visible-sm">
        <RulesDescriptionSm {...props}/>
      </div>
    );
  }

  renderRulesDescriptionXl(props){
    return(
      <div className="hidden-xs hidden-md hidden-sm visible-xl">
        <RulesDescriptionXl {...props}/>
      </div>
    );
  }

  renderRulesDescriptionXs(props){
    return(
      <div className="hidden-xl hidden-md hidden-sm visible-xs">
        <RulesDescriptionXs {...props}/>
      </div>
    );
  }


  render(){
    return(
      <div>
        {this.renderRulesDescriptionXl(this.props)}
        {this.renderRulesDescriptionXs(this.props)}
        {this.renderRulesDescriptionMd(this.props)}
        {this.renderRulesDescriptionSm(this.props)}
      </div>

    );
  }
}
export default RulesDescription;
