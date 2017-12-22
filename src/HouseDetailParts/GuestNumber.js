import React from 'react';

class GuestNumber extends React.Component{
  constructor(props){
    super(props);
    this.state={
      number:0,
    };
}
renderAdd(){
const Guest=this.state.number;
const NewGuest= Guest + 1;
this.setState({number:NewGuest});
}
renderSub(){
  if(this.state.number > 1){
const Guest=this.state.number;
const NewGuest= Guest - 1;
this.setState({number:NewGuest});
}
else{
this.setState({number:1});
}
}
render(){
  return(
    <div>
      <div className='add-circle' onClick={this.renderAdd.bind(this)} align='center'>
      +
      </div>
      <div id='guest-number' align='center'>
      {this.state.number}
      </div>
      <div className='sub-circle' onClick={this.renderSub.bind(this)} align='center'>
      -
      </div>
    </div>
  );
}
}
export default GuestNumber;
