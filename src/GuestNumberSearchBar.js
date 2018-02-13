import React from 'react';
import { englishToPersianDigits } from './tools/EnglishToPersianDigits';


class GuestNumberSearchBar extends React.Component{
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
    <div className="search-reulsts-guest-number-zone">
      <div className="search-result-guest-number-reserve-number-box" >
        <button className="search-result-guest-number-btn-plus" onClick={this.renderSub.bind(this)}>
            <img src={require('./Images/guest-number-sub.svg')} className='guest-number-sub' alt=""></img>
        </button>
          <div>
            <p className="guest-number-input-number row-reverse">
            <span>{englishToPersianDigits(this.state.number)} </span> <span style={{marginRight:'6px'}}>{'نفر'}</span>
            </p>
          </div>
          <button className="search-result-guest-number-btn-plus" onClick={this.renderAdd.bind(this)}>
            <img src={require('./Images/guest-number-plus.svg')} className='guest-number-plus' alt=""></img>
          </button>
      </div>

    </div>
  );
}
}
export default GuestNumberSearchBar;
