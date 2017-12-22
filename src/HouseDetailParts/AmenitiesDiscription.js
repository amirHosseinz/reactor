import React from 'react';

class AmenitiesDiscription extends React.Component{
  render(){
    return(
      <div className="main-amanities row">
        <div className='main-amanities-item col-md-3'>
            <img src={require('./facilities/baths.png')}  className="main-amanities-icon" alt = "" />
            <p className='aminities-text'>حمام {this.props.homeData.bath_room_number} </p>
        </div>
        <div className='main-amanities-item col-md-3'>
            <img src={require('./facilities/beds.png')}  className="main-amanities-icon" alt = "" />
            <p className='aminities-text'>تخت {this.props.homeData.beds_number} </p>
        </div>
        <div className='main-amanities-item col-md-3'>
            <img src={require('./facilities/rooms.png')}  className="main-amanities-icon" alt = "" />
            <p className='aminities-text'>اتاق {this.props.homeData.rooms_number} </p>
        </div>
        <div className='main-amanities-item col-md-3'>
           <img src={require('./facilities/persons.png')}  className="main-amanities-icon" alt = "" />
           <p className='aminities-text'>مهمان {this.props.homeData.capacity} </p>
        </div>
      </div>
    );
  }
}
export default AmenitiesDiscription;
