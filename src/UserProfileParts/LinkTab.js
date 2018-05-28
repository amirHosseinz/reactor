import React from 'react';
import LinkTabXl from './LinkTab/LinkTabXl.js';
import LinkTabXs from './LinkTab/LinkTabXs.js';
import LinkTabMd from './LinkTab/LinkTabMd.js';
import LinkTabSm from './LinkTab/LinkTabSm.js';
import MetaTags from 'react-meta-tags';


class LinkTab extends React.Component{

  renderLinkTabXl(props) {
    return (
      <div className="visible-xl hidden-md hidden-xs hidden-sm">
        <LinkTabXl {...props}/>
      </div>
    );
  }

  renderLinkTabXs(props) {
    return (
      <div className="hidden-xl hidden-md visible-xs hidden-sm">
        <LinkTabXs {...props} />
      </div>

    );
  }

  renderLinkTabMd(props) {
    return(
      <div className="hidden-xl visible-md hidden-xs hidden-sm">
        <LinkTabMd {...props}/>
      </div>
    );
  }

  renderLinkTabSm(props) {
    return (
      <div className="hidden-xl hidden-md hidden-xs visible-sm">
        <LinkTabSm {...props}/>
      </div>

    );
  }
  render(){
    return (
      <div>
        {this.renderLinkTabXl(this.props)}
        {this.renderLinkTabXs(this.props)}
        {this.renderLinkTabSm(this.props)}
        {this.renderLinkTabMd(this.props)}
      </div>
    );
  }
}

export default LinkTab;
