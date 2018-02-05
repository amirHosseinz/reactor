import React from 'react';
import {englishToPersianDigits} from '../tools/EnglishToPersianDigits.js';
import MaxCapacitySm from './MaxCapacity/MaxCapacitySm.js';
import MaxCapacityMd  from './MaxCapacity/MaxCapacityMd.js';
import MaxCapacityXl  from './MaxCapacity/MaxCapacityXl.js';
import MaxCapacityXs  from './MaxCapacity/MaxCapacityXs.js';

class MaxCapacity extends React.Component{

  renderMaxCapacityXl(props){
    return(
      <div className="hidden-xs hidden-md hidden-sm visible-xl">
        <MaxCapacityXl {...props}/>
      </div>
    );
  }

  renderMaxCapacityXs(props){
    return(
      <div className="hidden-xl hidden-md hidden-sm visible-xs">
        <MaxCapacityXs {...props}/>
      </div>
    );
  }

  renderMaxCapacityMd(props){
    return(
      <div className="hidden-xs hidden-xl hidden-sm visible-md">
        <MaxCapacityMd {...props}/>
      </div>
    );
  }

  renderMaxCapacitySm(props){
    return(
      <div className="hidden-xs hidden-md hidden-xl visible-sm">
        <MaxCapacitySm {...props}/>
      </div>
    );
  }

render(){
  return(
    <div>
    {this.renderMaxCapacityXl(this.props)}
    {this.renderMaxCapacityXs(this.props)}
    {this.renderMaxCapacityMd(this.props)}
    {this.renderMaxCapacitySm(this.props)}
    </div>
  );
}
}

export default MaxCapacity;
