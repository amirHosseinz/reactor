import React from 'react';

class RequestItem extends React.Component{
  constructor(props){
    super(props);
    this.state ={
    };
  }

  render(){
    return(
      <div>{console.log(this.props.requestDetail)}</div>
    );
  }
}

export default RequestItem;
