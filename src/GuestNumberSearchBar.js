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
    <div className="geust-number-searchbar-container">

      <div className="reserve-number-box-searchbar" >
        <button className="btn-plus-searchbar" onClick={this.renderAdd.bind(this)}>
            <p className="number-inputer-searchbar" >
            +
            </p>
        </button>
        <div className='guest-number-searchbar'>
        <p className="input-number-searchbar row-reverse">
        <span>نفر </span><span>{englishToPersianDigits(this.state.number)}</span>
        </p>
        </div>
        <button className="btn-sub-searchbar" onClick={this.renderSub.bind(this)}>
            <p className="number-inputer-searchbar" >
            -
            </p>
        </button>
      </div>

    </div>
  );
}
}
export default GuestNumberSearchBar;
