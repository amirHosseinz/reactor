import React from 'react';

class HostInfoDescriptionMd extends React.Component{

  renderHost(){
    if (this.props.homeData.owner) {
      return(
        <div> <p className="host-name-house-details">{this.props.homeData.owner.first_name} {this.props.homeData.owner.last_name}</p></div>
      );
    }
  }
  renderHostPhoto(){
      if (this.props.homeData !== ''){
        if (this.props.homeData.owner.profile_picture === null){
          return(
            <img src={require('../facilities/prof_avatar_tripinn.svg')}  className="house-details-host-avatar-icon" alt = "" />
          );
        }
        else{
          return(
            <div className="house-details-host-photo">
             <p><img className="house-details-host-img" src={"https://www.trypinn.com/" +this.props.homeData.owner.profile_picture} alt=""/></p>
            </div>
          );
        }
      }
    }
  render(){
    return(
      <div className="house-details-host-information">
          <div className="house-details-host-avatar">
              {this.renderHostPhoto()}
          </div>
          <div className="house-details-host-textbox">
            <p className="house-details-text-name-label">میزبان </p>
            {this.renderHost()}
          </div>
      </div>
    );
  }
}

export default HostInfoDescriptionMd;
