import React from 'react';
import Messages from './Messages';
import Trips from './Trips';
import Requests from './Requests';
import RequestItem from './RequestItem.js';
import TripItem from './TripItem.js';
import UserProfile from './UserProfile.js';


class UserPanel extends React.Component{
  constructor(props){
    super(props);
    this.state={
      ProfileDetail:'',
      requestDetail:'',
      tripDetail:'',
      defaultSelection:'userprofile',
    };
  }

  handleNameChange(event) {
    this.setState({Name: event.target.value});
  }

  changeRequestDetail (request_detail) {
    this.setState({requestDetail:request_detail});
  }

  changeTripDetail (trip_detail) {
    this.setState({tripDetail:trip_detail});
  }
  changeProfileDetail (Profile_Detail) {
    this.setState({ProfileDetail:Profile_Detail});
  }

  showContent(){
    switch (localStorage['default-panel']){
      case 'request':
      return(
        <RequestItem requestDetail={this.state.requestDetail}/>
      );
      case 'message':
      return(
        <div> </div>
      );
      case 'trip':
      return(
        <TripItem reserveDetail={this.state.tripDetail}/>
      );
      default:
      return null;
    }
  }
  renderSelectedPanel(){
    switch (localStorage['default-panel']){
      case 'message':
        return(
          <Messages />
        );
      case 'request':
      return(
        <Requests changeRequestDetail={this.changeRequestDetail.bind(this)} />
      );
      case 'trip':
      return(
        <Trips changeTripDetail={this.changeTripDetail.bind(this)}/>
      );
      // case 'userprofile':
      // return(
      //   <UserProfile/>
      // );
      default:
      return null;
    }
  }
  render() {
    return (
      <div className="dashboard-backgroud">
          <div className="profile-container-margined">
              <div className="profile_dynamic_edit col-md-9  padding-top">
                {this.showContent()}
              </div>

              <div className="profile_static_bar col-md-3">
                {this.renderSelectedPanel()}
              </div>

          </div>
      </div>
    );
  }
}
export default UserPanel;
