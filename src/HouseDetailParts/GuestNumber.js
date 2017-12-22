import React from 'react';
import { englishToPersianDigits } from '../tools/EnglishToPersianDigits';


class GuestNumber extends React.Component{
  constructor(props){
    super(props);
    this.state={
      number:1,
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
    <div className="number-zone">

      <div className="reserve-number-box" >
        <button className="btn-plus" onClick={this.renderAdd.bind(this)}>
            <p className="number-inputer" >
            +
            </p>
        </button>
        <div id='guest-number'>
        <p className="imput-number">
        {englishToPersianDigits(this.state.number)}
        </p>
        </div>
        <button className="btn-sub" onClick={this.renderSub.bind(this)}>
            <p className="number-inputer" >
            -
            </p>
        </button>
      </div>

    </div>
  );
}
}
export default GuestNumber;
