import React from 'react';
import LinkTabXl from './LinkTab/LinkTabXl.js';
import LinkTabXs from './LinkTab/LinkTabXs.js';
import LinkTabMd from './LinkTab/LinkTabMd.js';
import LinkTabSm from './LinkTab/LinkTabSm.js';
import MetaTags from 'react-meta-tags';


class LinkTab extends React.Component{

  renderLinkTabXl(props) {
    return (
      <LinkTabXl {...props} className="visible-xl hidden-md hidden-xs hidden-sm"/>
    );
  }

  renderLinkTabXs(props) {
    return (
      <LinkTabXs {...props} className="hidden-xl hidden-md visible-xs hidden-sm"/>
    );
  }

  renderLinkTabMd(props) {
    return (
      <LinkTabMd {...props} className="hidden-xl visible-md hidden-xs hidden-sm"/>
    );
  }

  renderLinkTabSm(props) {
    return (
      <LinkTabSm {...props} className="hidden-xl hidden-md hidden-xs visible-sm"/>
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
