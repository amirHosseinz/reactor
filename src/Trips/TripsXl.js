import React from 'react';
import {ListGroup, ListGroupItem} from 'react-bootstrap';
import { Image } from 'semantic-ui-react';
import './Trips.css';


class TripsXl extends React.Component{
  constructor(props){
    super(props);
    this.state={
      token:null,
      selected:0,
      role:null,
      tripList:null,
    };
  }

  componentWillMount() {
      this.setState({token:this.getRelevantToken()},()=>{this.setSearchParams(this.getRole())});
  }
  getRelevantToken(){
    return localStorage['token'];
  }
  getRole(){
    return 'guest';
  }
  setSearchParams(person_role){
    this.setState({role :person_role } ,()=>this.getDataFromServer());
  }
  getDataFromServer(){
    var request = new Request('https://www.trypinn.com/api/reservations/list/',{
      method: 'POST',
      body: JSON.stringify({
        role:this.state.role,
    }),
      headers: new Headers({'Accept': 'application/json','Content-Type': 'application/json',
      'Authorization': 'Token '+ this.state.token,})
    });
   fetch(request)
   .then((response) => {
     return response.json();
   })
   .then((trips) => {
     this.renderData(trips);
     if(trips.reserve_list.length>0){
       this.showTripItemClick(trips.reserve_list[0]);
     }
     else{
       this.showTripItemClick({status:'no-house'});
     }
   });
  }
  renderData(trips){
    this.setState({tripList:trips});
  }
  showTripItemClick(item){
    this.setState({selected:item.id},()=>{this.props.changeTripDetail(item)});
  }
  renderTrips(){
    if (this.state.tripList!== null){
      var reserve_list = this.state.tripList.reserve_list;
      if(reserve_list.length>0){
        var list = reserve_list.map((item) => {
          return (
            <div  dir="rtl"
                  className={(this.state.selected===item.id)?"trips-item-selected":"trips-item-not-selected"}
                  key={item.id} onClick={() =>{
                  this.showTripItemClick(item)
            }}>
              <div>
                  <ListGroupItem className="trips-scroll-list">
                    <div className="trips-item-preview">
                      <img
                      src={"https://www.trypinn.com/"+item.room.preview}
                      alt=""
                      height="78px;" width="80px"/>
                      <div>
                        <div className="trips-item-title">
                          {item.room.title}
                        </div>
                      <p className="trips-item-city"> {item.room.address} </p>
                      </div>
                    </div>
                  </ListGroupItem>
              </div>

            </div>
          );
        });
        return(
          <div className="trips-main-container">
            <ListGroup>{list}</ListGroup>
          </div>
        );
      }
  }}
  render(){
    return(
      <div>
        {this.renderTrips()}
      </div>
    );
  }
}

export default TripsXl;
