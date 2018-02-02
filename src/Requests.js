import React from 'react';
import RequestsXl from './Requests/RequestsXl.js';
import RequestsXs from './Requests/RequestsXs.js';
import RequestsMd from './Requests/RequestsMd.js';
import RequestsSm from './Requests/RequestsSm.js';
class Requests extends React.Component{

  renderRequestsXl(){
    return(
      <div className="hidden-xs hidden-md hidden-sm visible-xl">
        <RequestsXl changeRequestDetail={this.props.changeRequestDetail.bind(this)}/>
      </div>
    );
  }

  renderRequestsXs(){
    return(
      <div className="hidden-xl hidden-md hidden-sm visible-xs">
        <RequestsXs changeRequestDetail={this.props.changeRequestDetail.bind(this)}/>
      </div>
    );
  }

  renderRequestsMd(){
    return(
      <div className="hidden-xs hidden-xl hidden-sm visible-md">
        <RequestsMd changeRequestDetail={this.props.changeRequestDetail.bind(this)}/>
      </div>
    );
  }

  renderRequestsSm(){
    return(
      <div className="hidden-xs hidden-md hidden-xl visible-sm">
        <RequestsSm changeRequestDetail={this.props.changeRequestDetail.bind(this)}/>
      </div>
    );
  }

  render(){
    return(
      <div>
        {this.renderRequestsXl()}
        {this.renderRequestsXs()}
        {this.renderRequestsMd()}
        {this.renderRequestsSm()}
      </div>

    );
  }
}
export default Requests;
