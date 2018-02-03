import React from 'react';
import HeaderXl from './Header/HeaderXl';
import HeaderXs from './Header/HeaderXs';
import HeaderMd from './Header/HeaderMd';
import HeaderSm from './Header/HeaderSm';
class Header extends React.Component{

  renderHeaderXl(props){
    return(
      <div className="hidden-xs hidden-md hidden-sm visible-xl">
        <HeaderXl {...props}/>
      </div>
    );
  }

  renderHeaderMd(props){
    return(
      <div className="hidden-xs hidden-xl hidden-sm visible-md">
        <HeaderMd {...props}/>
      </div>
    );
  }

  renderHeaderSm(props){
    return(
      <div className="hidden-xs hidden-md hidden-xl visible-sm">
        <HeaderSm {...props}/>
      </div>
    );
  }

  renderHeaderXs(props){
    return(
      <div className="hidden-xl hidden-md hidden-sm visible-xs">
        <HeaderXs {...props}/>
      </div>
    );
  }

  render()
  {
    return (
      <div>
        {this.renderHeaderXl(this.props)}
        {this.renderHeaderXs(this.props)}
        {this.renderHeaderMd(this.props)}
        {this.renderHeaderSm(this.props)}
      </div>

    );
  }
}
export default Header;
