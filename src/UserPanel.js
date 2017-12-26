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
      defaultSelection:'request',
    };
  }

  changeRequestDetail = (request_detail) => {
    this.setState({requestDetail:request_detail});
  }

  changeTripDetail = (trip_detail) => {
    this.setState({tripDetail:trip_detail});
  }
  changeProfileDetail = (Profile_Detail) => {
    this.setState({ProfileDetail:Profile_Detail});
  }

  showContent(){
    switch (this.state.defaultSelection){
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
      case 'userprofile':
      return(
        <div></div>
      );
      default:
      return null;
    }
  }
  handleMessageClick(){
    if (this.state.defaultSelection!=='message'){
       this.setState({defaultSelection:'message'});
    }
  }
  handleTripClick(){
    if (this.state.defaultSelection!=='trip'){
      this.setState({defaultSelection:'trip'});
    }
  }
  handleRequestClick(){
    if (this.state.defaultSelection!=='request'){
      this.setState({defaultSelection:'request'});
    }
  }
  handleUserProfileClick(){
    if (this.state.defaultSelection!=='userprofile'){
      this.setState({defaultSelection:'userprofile'});
    }
  }
  renderSelectedPanel(){
    switch (this.state.defaultSelection){
      case 'message':
        return(
          <Messages />
        );
      case 'request':
      return(
        <Requests changeRequestDetail={this.changeRequestDetail} />
      );
      case 'trip':
      return(
        <Trips changeTripDetail={this.changeTripDetail}/>
      );
      case 'userprofile':
      return(
        <UserProfile changeProfileDetail={this.changeProfileDetail}/>
      );
      default:
      return null;
    }
  }
  render() {
    return (

      <div>
        <button className="messages" onClick={this.handleMessageClick.bind(this)}>
          پیام ها
        </button>
        <button className="requests" onClick={this.handleRequestClick.bind(this)}>
          درخواست ها
        </button>
        <button className="trips" onClick={this.handleTripClick.bind(this)}>
          سفرها
        </button>
        <button className="userprofile" onClick={this.handleUserProfileClick.bind(this)}>
         اطلاعت کاربر
        </button>
        {this.renderSelectedPanel()}
        {this.showContent()}
      </div>
    );
  }
}
export default UserPanel;
