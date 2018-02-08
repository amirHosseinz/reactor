import React from 'react';
import UserPanelXl from './UserPanel/UserPanelXl';
import UserPanelXs from './UserPanel/UserPanelXs';
import UserPanelMd from './UserPanel/UserPanelMd';
import UserPanelSm from './UserPanel/UserPanelSm';

class UserPanel extends React.Component{

  renderUserPanelXl(props){
    return(
      <div className="hidden-xs hidden-md hidden-sm visible-xl">
        <UserPanelXl {...props}/>
      </div>
    );
  }

  renderUserPanelXs(props){
    return(
      <div className="hidden-xl hidden-md hidden-sm visible-xs">
        <UserPanelXs {...props}/>
      </div>
    );
  }

  renderUserPanelMd(props){
    return(
      <div className="hidden-xs hidden-xl hidden-sm visible-md">
        <UserPanelMd {...props}/>
      </div>
    );
  }

  renderUserPanelSm(props){
    return(
      <div className="hidden-xs hidden-md hidden-xl visible-sm">
        <UserPanelSm {...props}/>
      </div>
    );
  }

  render() {
    return (
      <div>
        {this.renderUserPanelMd(this.props)}
        {this.renderUserPanelXs(this.props)}
        {this.renderUserPanelXl(this.props)}
        {this.renderUserPanelSm(this.props)}
      </div>

    );
  }
}
export default UserPanel;
