import React from 'react';
import RequestsXl from './Requests/RequestsXl.js';
import RequestsXs from './Requests/RequestsXs.js';
import RequestsMd from './Requests/RequestsMd.js';
import RequestsSm from './Requests/RequestsSm.js';


class Requests extends React.Component{
  renderRequestsXl(props){
    return(
      <div className="hidden-xs hidden-md hidden-sm visible-xl">
        <RequestsXl {...props} changeRequestDetail={this.props.changeRequestDetail.bind(this)}/>
      </div>
    );
  }

  renderRequestsXs(props){
    return(
      <div className="hidden-xl hidden-md hidden-sm visible-xs">
        <RequestsXs {...props} changeRequestDetail={this.props.changeRequestDetail.bind(this)}/>
      </div>
    );
  }

  renderRequestsMd(props){
    return(
      <div className="hidden-xs hidden-xl hidden-sm visible-md">
        <RequestsMd {...props} changeRequestDetail={this.props.changeRequestDetail.bind(this)}/>
      </div>
    );
  }

  renderRequestsSm(props){
    return(
      <div className="hidden-xs hidden-md hidden-xl visible-sm">
        <RequestsSm {...props} changeRequestDetail={this.props.changeRequestDetail.bind(this)}/>
      </div>
    );
  }


  render(){
    return(
      <div>
        {this.renderRequestsXl(this.props)}
        {this.renderRequestsXs(this.props)}
        {this.renderRequestsMd(this.props)}
        {this.renderRequestsSm(this.props)}
      </div>

    );
  }
}
export default Requests;
