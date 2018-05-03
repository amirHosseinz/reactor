import React from 'react';
import EditPasswordXl from './EditPassword/EditPasswordXl.js';
import EditPasswordXs from './EditPassword/EditPasswordXs.js';
import EditPasswordMd from './EditPassword/EditPasswordMd.js';
import EditPasswordSm from './EditPassword/EditPasswordSm.js';
import MetaTags from 'react-meta-tags';


class EditPassword extends React.Component{

  renderEditPasswordXl(props) {
    return (
      <EditPasswordXl {...props} className="visible-xl hidden-md hidden-xs hidden-sm"/>
    );
  }

  renderEditPasswordXs(props) {
    return (
      <EditPasswordXs {...props} className="hidden-xl hidden-md visible-xs hidden-sm"/>
    );
  }

  renderEditPasswordMd(props) {
    return (
      <EditPasswordMd {...props} className="hidden-xl visible-md hidden-xs hidden-sm"/>
    );
  }

  renderEditPasswordSm(props) {
    return (
      <EditPasswordSm {...props} className="hidden-xl hidden-md hidden-xs visible-sm"/>
    );
  }
  render(){
    return (
      <div>
      <MetaTags>
        <title> تریپین |‌ فهرست مورد علاقه ها </title>
      </MetaTags>
        {this.renderEditPasswordXl(this.props)}
        {this.renderEditPasswordXs(this.props)}
        {this.renderEditPasswordSm(this.props)}
        {this.renderEditPasswordMd(this.props)}
      </div>
    );
  }
}

export default EditPassword;
