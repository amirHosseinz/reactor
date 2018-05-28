import React from 'react';
import InviteSuccessXl from './InvitePage/InviteSuccessXl.js';
import InviteSuccessXs from './InvitePage/InviteSuccessXs.js';
import InviteSuccessMd from './InvitePage/InviteSuccessMd.js';
import InviteSuccessSm from './InvitePage/InviteSuccessSm.js';
import MetaTags from 'react-meta-tags';
import './InvitePage/InviteSuccess.css';


class InviteSuccess extends React.Component{
  constructor(props){
    super(props);
    this.state ={

    }
  }

  renderInviteSuccessXl(props){
    return(
      <div className="visible-xl hidden-xs hidden-sm hidden-md">
        <InviteSuccessXl {...props}/>
      </div>
    );
  }

  renderInviteSuccessXs(props){
    return(
      <div className="hidden-xl visible-xs hidden-sm hidden-md">
        <InviteSuccessXs {...props}/>
      </div>
    );
  }

  renderInviteSuccessMd(props){
    return(
      <div className="hidden-xl hidden-xs hidden-sm visible-md">
        <InviteSuccessMd{...props}/>
      </div>
    );
  }

  renderInviteSuccessSm(props){
    return(
      <div className="hidden-xl hidden-xs visible-sm hidden-md">
        <InviteSuccessSm {...props}/>
      </div>
    );
  }

  render(){
    return(
      <div>
        <MetaTags>
          <meta content="googlebot" description="noindex"/>
          <title>  تریپین | ثبت‌ موفق شماره تلفن</title>
        </MetaTags>
        {this.renderInviteSuccessXl(this.props)}
        {this.renderInviteSuccessXs(this.props)}
        {this.renderInviteSuccessMd(this.props)}
        {this.renderInviteSuccessSm(this.props)}
      </div>
    );
  }
}

export default InviteSuccess;
