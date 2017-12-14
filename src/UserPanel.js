import React from 'react';
import Messages from './Messages';
import Trips from './Trips';
import Requests from './Requests';
import RequestItem from './RequestItem.js';


class UserPanel extends React.Component{

  constructor(props){
    super(props);
    this.state={
      requestDetail:'',
      tripDetail:'',
      defaultSelection:'request',
    };
  }

  changeRequestDetail= (request_detail) => {
    this.setState({requestDetail:request_detail});
  }

  changeTripDetail(trip_detail){
    this.setState({tripDetail:trip_detail});
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
        <div> </div>
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
        <Trips />
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
        {this.renderSelectedPanel()}
        {this.showContent()}
      </div>
    );
  }
}
export default UserPanel;
