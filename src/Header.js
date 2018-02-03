import React from 'react';
import HeaderXl from './Header/HeaderXl';
import HeaderXs from './Header/HeaderXs';
import HeaderMd from './Header/HeaderMd';
import HeaderSm from './Header/HeaderSm';
class Header extends React.Component{

  renderHeaderXl(){
    return(
      <div className="hidden-xs hidden-md hidden-sm visible-xl">
        <HeaderXl />
      </div>
    );
  }

  renderHeaderMd(){
    return(
      <div className="hidden-xs hidden-xl hidden-sm visible-md">
        <HeaderMd />
      </div>
    );
  }

  renderHeaderSm(){
    return(
      <div className="hidden-xs hidden-md hidden-xl visible-sm">
        <HeaderSm />
      </div>
    );
  }

  renderHeaderXs(){
    return(
      <div className="hidden-xl hidden-md hidden-sm visible-xs">
        <HeaderXs />
      </div>
    );
  }

  render()
  {
    return (
      <div>
        {this.renderHeaderXl()}
        {this.renderHeaderXs()}
        {this.renderHeaderMd()}
        {this.renderHeaderSm()}
      </div>

    );
  }
}
export default Header;
