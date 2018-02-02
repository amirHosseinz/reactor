import React from 'react';
import UserPanelXl from './UserPanel/UserPanelXl';
import UserPanelXs from './UserPanel/UserPanelXs';
import UserPanelMd from './UserPanel/UserPanelMd';
import UserPanelSm from './UserPanel/UserPanelSm';

class UserPanel extends React.Component{

  renderUserPanelXl(){
    return(
      <div className="hidden-xs hidden-md hidden-sm visible-xl">
        <UserPanelXl />
      </div>
    );
  }

  renderUserPanelXs(){
    return(
      <div className="hidden-xl hidden-md hidden-sm visible-xs">
        <UserPanelXs />
      </div>
    );
  }

  renderUserPanelMd(){
    return(
      <div className="hidden-xs hidden-xl hidden-sm visible-md">
        <UserPanelMd />
      </div>
    );
  }

  renderUserPanelSm(){
    return(
      <div className="hidden-xs hidden-md hidden-xl visible-sm">
        <UserPanelSm />
      </div>
    );
  }

  render() {
    return (
      <div>
        {this.renderUserPanelMd()}
        {this.renderUserPanelXs()}
        {this.renderUserPanelXl()}
        {this.renderUserPanelSm()}
      </div>

    );
  }
}
export default UserPanel;
