import React from 'react';

class HostInfoDiscription extends React.Component{
  renderHost () {
    if (this.props.homeData.owner) {
      return(
        <div> <p className="text-013">{this.props.homeData.owner.first_name} {this.props.homeData.owner.last_name}</p></div>
      );
    }
  }
  renderHostPhoto(){
      if (this.props.homeData !== ''){
        if (this.props.homeData.owner.profile_picture === null){
          return(
            <img src="http://svgshare.com/i/4V0.svg"  className="avatar-icon" alt = "" />
          );
        }
        else{
          return(
            <div className="host-photo">
             <p><img className="host-img" src={"https://www.trypinn.com/" +this.props.homeData.owner.profile_picture} alt=""/></p>
            </div>
          );
        }
      }
    }
  render(){
    return(
      <div className="host-info">
          <div className="host-avatar">
              {this.renderHostPhoto()}
          </div>
          <div className="host-texts">
            <p className="text-011">به میزبانی </p>
            {this.renderHost()}
          </div>
      </div>
    );
  }
}
export default HostInfoDiscription;
