import React from 'react';
import Messages from '../Messages';
import Trips from '../Trips';
import Requests from '../Requests';
import RequestItem from '../RequestItem.js';
import TripItem from '../TripItem.js';
import UserProfile from '../UserProfile.js';


class UserPanelXl extends React.Component{

  constructor(props){
    super(props);
    this.state={
      ProfileDetail:'',
      requestDetail:'',
      tripDetail:'',
    };
  }

  componentWillMount(){
    document.body.style.backgroundColor = "#f8f8f8";
  }
  handleNameChange(event) {
    this.setState({Name: event.target.value});
  }

  changeRequestDetail (request_detail){
    this.setState({requestDetail:request_detail});
  }

  changeTripDetail (trip_detail) {
    this.setState({tripDetail:trip_detail});
  }
  changeProfileDetail (Profile_Detail) {
    this.setState({ProfileDetail:Profile_Detail});
  }

  showContent(){
    switch (window.location.pathname.split('/')[window.location.pathname.split('/').length-1]){
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
    switch (window.location.pathname.split('/')[window.location.pathname.split('/').length-1]){
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

renderDashbordTitle(){
  switch (window.location.pathname.split('/')[window.location.pathname.split('/').length-1]){
    case 'message':
      return(
        <div className="requests-list-title"> پیام‌ها </div>
      );
    case 'request':
    return(
      <div className="requests-list-title">درخواست‌ها </div>

      );
    case 'trip':
    return(
      <div className="requests-list-title">سفرها </div>
    );
  }
}

  render(){
    return(
      <div requests-list-title>
          <div className="profile-container-margined">
              <div className="profile_dynamic_edit col-md-9  padding-top">
                {this.showContent()}
              </div>
              <div className="profile_static_bar col-md-3">
                {this.renderSelectedPanel()}
              </div>
          </div>
          <div className="request-list-xs hidden-xl visible-xs">
              <div className="request-xs-header-title-div">
                {this.renderDashbordTitle()}
              </div>
              <div className="request-list-xs-list">
                {this.renderSelectedPanel()}
              </div>
          </div>
      </div>
    );
  }
}

export default UserPanelXl;
