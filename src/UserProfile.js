import React from 'react';
import UserProfileXs from './UserProfile/UserProfileXs.js';
import UserProfileXl from './UserProfile/UserProfileXl.js';
import UserProfileMd from './UserProfile/UserProfileMd.js';
import UserProfileSm from './UserProfile/UserProfileSm.js';

class UserProfile extends React.Component{


  renderUserProfileXl(){
    return(
      <div className="hidden-xs hidden-md hidden-sm visible-xl">
        <UserProfileXl />
      </div>
    );
  }

  renderUserProfileXs(){
    <div className="hidden-xl hidden-md hidden-sm visible-xs">
      <UserProfileXs />
    </div>
  }

  renderUserProfileMd(){
    return(
      <div className="hidden-xs hidden-xl hidden-sm visible-md">
        <UserProfileMd />
      </div>
    );
  }

  renderUserProfileSm(){
    return(
      <div className="hidden-xs hidden-md hidden-xl visible-sm">
        <UserProfileMd />
      </div>
    );
  }


  render(){
    return(
        <div>
          {this.renderUserProfileMd()}
          {this.renderUserProfileXs()}
          {this.renderUserProfileXl()}
          {this.renderUserProfileSm()}
        </div>


    );
  }
}
export default UserProfile;
