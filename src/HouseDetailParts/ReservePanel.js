import React from 'react';
import ReservePanelXl from './ReservePanel/ReservePanelXl.js';
import ReservePanelXs from './ReservePanel/ReservePanelXs.js';
import ReservePanelSm from './ReservePanel/ReservePanelSm.js';
import ReservePanelMd from './ReservePanel/ReservePanelMd.js';



class ReservePanel extends React.Component{


  renderReservePanelXl(props){
    return(
      <div className="hidden-xs hidden-md hidden-sm visible-xl">
        <ReservePanelXl {...props}/>
      </div>
    );
  }

  renderReservePanelXs(props){
    return(
      <div className="hidden-xl hidden-md hidden-sm visible-xs">
        <ReservePanelXs {...props}/>
      </div>
    );
  }

  renderReservePanelSm(props){
    return(
      <div className="hidden-xs hidden-md hidden-xl visible-sm">
        <ReservePanelSm {...props}/>
      </div>
    );
  }

  renderReservePanelMd(props){
    return(
      <div className="hidden-xs hidden-xl hidden-sm visible-md">
        <ReservePanelMd {...props}/>
      </div>
    );
  }

  render(){

    return(
      <div>
        {this.renderReservePanelXl(this.props)}
        {this.renderReservePanelXs(this.props)}
        {this.renderReservePanelMd(this.props)}
        {this.renderReservePanelSm(this.props)}
      </div>

    );
  }
}
export default ReservePanel;
