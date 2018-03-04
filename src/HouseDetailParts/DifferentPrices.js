import React from 'react';

import DifferentPricesXs from './DifferentPrices/DifferentPricesXs.js';
import DifferentPricesMd from './DifferentPrices/DifferentPricesMd.js';
import DifferentPricesSm from './DifferentPrices/DifferentPricesSm.js';
import DifferentPricesXl from './DifferentPrices/DifferentPricesXl.js';


class DifferentPrices extends React.Component{
  renderDifferentPricesXl(props){
    return(
      <div className="hidden-xs hidden-md hidden-sm visible-xl">
        <DifferentPricesXl {...props}/>
      </div>
    );
  }

  renderDifferentPricesXs(props){
    return(
      <div className="hidden-xl hidden-md hidden-sm visible-xs">
        <DifferentPricesXs {...props}/>
      </div>
    );
  }

  renderDifferentPricesMd(props){
    return(
      <div className="hidden-xs hidden-xl hidden-sm visible-md">
        <DifferentPricesMd {...props}/>
      </div>
    );
  }

  renderDifferentPricesSm(props){
    return(
      <div className="hidden-xs hidden-md hidden-xl visible-sm">
        <DifferentPricesSm {...props}/>
      </div>
    );
  }


  render(){
    return(
      <div>
        {this.renderDifferentPricesXl(this.props)}
        {this.renderDifferentPricesXs(this.props)}
        {this.renderDifferentPricesMd(this.props)}
        {this.renderDifferentPricesSm(this.props)}
      </div>
    );
  }
}
export default DifferentPrices;
