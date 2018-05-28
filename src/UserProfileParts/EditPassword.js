import React from 'react';
import EditPasswordXl from './EditPassword/EditPasswordXl.js';
import EditPasswordXs from './EditPassword/EditPasswordXs.js';
import EditPasswordMd from './EditPassword/EditPasswordMd.js';
import EditPasswordSm from './EditPassword/EditPasswordSm.js';
import MetaTags from 'react-meta-tags';


class EditPassword extends React.Component{

  renderEditPasswordXl(props) {
    return (
      <div className="visible-xl hidden-md hidden-xs hidden-sm">
        <EditPasswordXl {...props}/>
      </div>
    );
  }

  renderEditPasswordXs(props) {
    return (
      <div className="hidden-xl hidden-md visible-xs hidden-sm">
        <EditPasswordXs {...props}/>
      </div>

    );
  }

  renderEditPasswordMd(props) {
    return (
      <div className="hidden-xl visible-md hidden-xs hidden-sm">
        <EditPasswordMd {...props} />
      </div>
    );
  }

  renderEditPasswordSm(props) {
    return (
      <div className="hidden-xl hidden-md hidden-xs visible-sm">
        <EditPasswordSm {...props} />
      </div>

    );
  }
  render(){
    return (
      <div>
      <MetaTags>
        <title> تریپین | ویرایش رمز عبور </title>
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
