import React from 'react';
import Darmaneh from './Partners/Darmaneh.js';


class Partners extends React.Component{

  renderSelectedPartner(){
    console.log(window.location.href.split("/")[window.location.href.split("/").length-1]);
    switch(window.location.href.split("/")[window.location.href.split("/").length-1] ){
      case 'darmaneh':{
        return (
          <Darmaneh />
        );
      }
    }
  }
  render(){
    return(
      <div>
        {this.renderSelectedPartner()}
      </div>
    );
  };
}

export default Partners;
