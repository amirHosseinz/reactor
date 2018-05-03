import React from 'react';
import EditProfileXl from './EditProfile/EditProfileXl.js';
import EditProfileXs from './EditProfile/EditProfileXs.js';
import EditProfileMd from './EditProfile/EditProfileMd.js';
import EditProfileSm from './EditProfile/EditProfileSm.js';
import MetaTags from 'react-meta-tags';


class EditProfile extends React.Component{

  renderEditProfileXl(props) {
    return (
      <EditProfileXl {...props} className="visible-xl hidden-md hidden-xs hidden-sm"/>
    );
  }

  renderEditProfileXs(props) {
    return (
      <EditProfileXs {...props} className="hidden-xl hidden-md visible-xs hidden-sm"/>
    );
  }

  renderEditProfileMd(props) {
    return (
      <EditProfileMd {...props} className="hidden-xl visible-md hidden-xs hidden-sm"/>
    );
  }

  renderEditProfileSm(props) {
    return (
      <EditProfileSm {...props} className="hidden-xl hidden-md hidden-xs visible-sm"/>
    );
  }
  render(){
    return (
      <div>
        <MetaTags>
          <title> تریپین | ویرایش حساب کاربری</title>
        </MetaTags>
        {this.renderEditProfileXl(this.props)}
        {this.renderEditProfileXs(this.props)}
        {this.renderEditProfileSm(this.props)}
        {this.renderEditProfileMd(this.props)}
      </div>
    );
  }
}

export default EditProfile;
