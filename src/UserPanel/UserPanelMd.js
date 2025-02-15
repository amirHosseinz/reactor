import React from 'react';
import Messages from '../Messages';
import Trips from '../Trips';
import Requests from '../Requests';
import RequestItem from '../RequestItem.js';
import TripItem from '../TripItem.js';
import UserProfile from '../UserProfile.js';
import './UserPanel.css';


class UserPanelMd extends React.Component{
  constructor(props){
    super(props);
    this.state={
      reRenderList : false,
      ProfileDetail:'',
      requestDetail:'',
      tripDetail:'',
    };
  }

  componentWillMount(){
    // document.body.style.backgroundColor = "#f8f8f8";
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
  changeReRenderList(){
    this.setState((prevState,props)=>{return({reRenderList:!prevState.reRenderList})});
  }
  showContent(){
    switch (window.location.pathname.split('/')[window.location.pathname.split('/').length-1]){
      case 'request':
      return(
        <RequestItem changeReRenderList={()=>{this.changeReRenderList()}}
        requestDetail={this.state.requestDetail}/>
      );
      case 'message':
      return(
        <div></div>
      );
      case 'trip':
      return(
        <TripItem changeReRenderList={()=>{this.changeReRenderList()}} reserveDetail={this.state.tripDetail}/>
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
        <Requests reRender={this.state.reRenderList} changeRequestDetail={this.changeRequestDetail.bind(this)} />
      );
      case 'trip':
      return(
        <Trips changeTripDetail={this.changeTripDetail.bind(this)}/>
      );
      default:
      return null;
    }
  }

renderDashbordTitle(){
  switch (window.location.pathname.split('/')[window.location.pathname.split('/').length-1]){
    case 'message':
      return(
        <div className="message-list-title"> پیام‌ها </div>
      );
    case 'request':
    return(
      <div className="request-list-title">درخواست‌ها </div>

      );
    case 'trip':
    return(
      <div className="trip-list-title">سفرها </div>
    );
  }
}

  render(){
    var selectedPanel = window.location.pathname.split('/')[window.location.pathname.split('/').length-1];
    return(
      <div className="user-panel-main-container">
          <div className="request-trip-message-list-container">
            {this.showContent()}
          </div>
          <div>
            {this.renderSelectedPanel()}
          </div>
      </div>
    );
  }
}

export default UserPanelMd;
