import React from 'react';
import { englishToPersianDigits } from '../tools/EnglishToPersianDigits';


class GuestNumber extends React.Component{
  constructor(props){
    super(props);
    this.state={
      number:this.props.guestNumber,
    };
  }

renderAdd(){
  const Guest=this.state.number;
  const NewGuest= Guest + 1;
  this.setState({number:NewGuest},()=>{this.props.changeNumberOfGuests(this.state.number)});
 }

renderSub(){
  if(this.state.number > 1){
    const Guest=this.state.number;
    const NewGuest= Guest - 1;
    this.setState({number:NewGuest},()=>{this.props.changeNumberOfGuests(this.state.number)});
    }
    else{
    this.setState({number:1});
  }
}
render(){
  return(
    <div className="number-zone">
      <p className="clickable-p guest-number-close-button"> بستن </p>
      <div className="guest-number-reserve-number-box1" >
        <button className="btn-plus" onClick={this.renderSub.bind(this)}>
            <img src={require('../Images/guest-number-sub.svg')} className='guest-number-sub' alt=""></img>
        </button>
          <div>
            <p className="guest-number-input-number row-reverse">
            <span>{englishToPersianDigits(this.state.number)} </span> <span style={{marginRight:'6px'}}>{'نفر'}</span>
            </p>
          </div>
          <button className="btn-plus" onClick={this.renderAdd.bind(this)}>
            <img src={require('../Images/guest-number-plus.svg')} className='guest-number-plus' alt=""></img>
          </button>
      </div>

    </div>
  );
}
}
export default GuestNumber;
