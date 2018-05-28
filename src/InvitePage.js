import React from 'react';
import MetaTags from 'react-meta-tags';
import InvitePageXl from './InvitePage/InvitePageXl.js';
import InvitePageXs from './InvitePage/InvitePageXs.js';
import InvitePageMd from './InvitePage/InvitePageMd.js';
import InvitePageSm from './InvitePage/InvitePageSm.js';
import './InvitePage/InvitePage.css';


class InvitePage extends React.Component {
  constructor(props){
    super(props);
    this.state ={

    }
  }

  renderInvitePageXl(props){
    return(
      <div className="visible-xl hidden-xs hidden-sm hidden-md">
        <InvitePageXl {...props}/>
      </div>
    );
  }

  renderInvitePageXs(props){
    return(
      <div className="hidden-xl visible-xs hidden-sm hidden-md">
        <InvitePageXs {...props}/>
      </div>
    );
  }

  renderInvitePageMd(props){
    return(
      <div className="hidden-xl hidden-xs hidden-sm visible-md">
        <InvitePageMd{...props}/>
      </div>
    );
  }

  renderInvitePageSm(props){
    return(
      <div className="hidden-xl hidden-xs visible-sm hidden-md">
        <InvitePageSm {...props}/>
      </div>
    );
  }

  render(){
    return(
      <div>
        <MetaTags>
          <meta name="googlebot" content="noindex" />
          <title> ثبت‌نام در تریپین </title>
        </MetaTags>
        {this.renderInvitePageXl(this.props)}
        {this.renderInvitePageXs(this.props)}
        {this.renderInvitePageMd(this.props)}
        {this.renderInvitePageSm(this.props)}
      </div>
    );
  }
}

export default InvitePage;
