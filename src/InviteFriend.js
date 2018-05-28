import React from 'react';
import MetaTags from 'react-meta-tags';
import InviteFriendXl from './InviteFriend/InviteFriendXl.js';
import InviteFriendXs from './InviteFriend/InviteFriendXs.js';
import InviteFriendMd from './InviteFriend/InviteFriendMd.js';
import InviteFriendSm from './InviteFriend/InviteFriendSm.js';
import './InviteFriend/InviteFriend.css';
import {Redirect} from 'react-router-dom';


class InviteFriend extends React.Component {
  constructor(props){
    super(props);
    this.state = {

    };
  }

  renderInviteFriendXl(props){
    return(
      <div className="visible-xl hidden-xs hidden-sm hidden-md">
        <InviteFriendXl {...props}/>
      </div>
    );
  }

  renderInviteFriendXs(props){
    return(
      <div className="hidden-xl visible-xs hidden-sm hidden-md">
        <InviteFriendXs {...props}/>
      </div>
    );
  }

  renderInviteFriendMd(props){
    return(
      <div className="hidden-xl hidden-xs hidden-sm visible-md">
        <InviteFriendMd{...props}/>
      </div>
    );
  }

  renderInviteFriendSm(props){
    return(
      <div className="hidden-xl hidden-xs visible-sm hidden-md">
        <InviteFriendSm {...props}/>
      </div>
    );
  }
  render(){
    if (localStorage['isLoggedIn']==="false"){
      return(
        <Redirect to="/"/>
      );
    }
    return (
      <div>
        <MetaTags>
          <meta name="googlebot" content="noindex" />
          <title> تریپین | دعوت از دوستان </title>
        </MetaTags>
        {this.renderInviteFriendXl(this.props)}
        {this.renderInviteFriendXs(this.props)}
        {this.renderInviteFriendMd(this.props)}
        {this.renderInviteFriendSm(this.props)}
      </div>
    );
  }
}

export default InviteFriend;
