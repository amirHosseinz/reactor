import React from 'react';
import RequestItemMd from './RequestItem/RequestItemMd';
import RequestItemSm from './RequestItem/RequestItemSm';
import RequestItemXl from './RequestItem/RequestItemXl';
import RequestItemXs from './RequestItem/RequestItemXs';

// moment.loadPersian({usePersianDigits:true , dialect:'persian-modern'});
class RequestItem extends React.Component{
  constructor(props){
    super(props);
    this.state={
      request:null,
      requestStatus:null,
      totalPrice:null,
    }
  }

  componentWillReceiveProps(nextProps){
    this.setState({
      request:nextProps.requestDetail,requestStatus:nextProps.requestDetail.status,
      totalPrice:nextProps.requestDetail.total_price,
    });
  }
  renderRequestItemXl(props){
    return(
      <div className="hidden-xs hidden-md hidden-sm visible-xl">
        <RequestItemXl {...props} requestDetail={this.state.request} requestStatus={this.state.requestStatus} totalPrice={this.state.totalPrice}/>
      </div>
    );
  }
  renderRequestItemXs(props){
    return(
      <div className="hidden-xl hidden-md hidden-sm visible-xs">
        <RequestItemXs {...props} requestDetail={this.state.request} requestStatus={this.state.requestStatus} totalPrice={this.state.totalPrice}/>
      </div>
    );

  }
  renderRequestItemMd(props){
    return(
      <div className="hidden-xs hidden-xl hidden-sm visible-md">
        <RequestItemMd {...props} requestDetail={this.state.request} requestStatus={this.state.requestStatus} totalPrice={this.state.totalPrice}/>
      </div>
    );
  }

  renderRequestItemSm(props){
    return(
      <div className="hidden-xs hidden-md hidden-xl visible-sm">
        <RequestItemSm {...props} requestDetail={this.state.request} requestStatus={this.state.requestStatus} totalPrice={this.state.totalPrice}/>
      </div>
    );
  }
  render(){
    return(
      <div>
        {this.renderRequestItemMd(this.props)}
        {this.renderRequestItemXs(this.props)}
        {this.renderRequestItemXl(this.props)}
        {this.renderRequestItemSm(this.props)}
      </div>

    );
  }
}

export default RequestItem;
