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
                  className={(this.state.selected===item.id)?"userpanel-item-list-selected":"userpanel-item-list-not-selected"}
                  key={item.id} onClick={() =>{
                  this.showTripItemClick(item)
            }}>
              <div>
                  <ListGroupItem className="scroll-list-requests">
                    <div className="preview-x">
                      <img
                      src={"https://www.trypinn.com/"+item.room.preview}
                      alt=""
                      height="78px;" width="80px"/>
                      <div>
                        <div className="request-list-item-title">
                          {item.room.title}
                        </div>
                      <p className="request-list-item-city"> {item.room.address} </p>
                      </div>
                    </div>
                  </ListGroupItem>
              </div>
              <div
                 dir="rtl"
                className="userpanel-item-list-xs hidden-xl visible-xs"
                key={item.id} onClick={() =>{
                this.showTripItemClick(item)
                }}>
                  <div className="scroll-list-requests-xs">
                    <div className="preview-x2">
                      <div className="row-reverse">
                        <img
                        src={"https://www.trypinn.com/"+item.room.preview}
                        alt=""
                        height="55px;" width="55px"/>
                        <br/>
                        <div>
                          <div className="request-list-item-title">
                            {item.room.title}
                          </div>
                          <p className="request-list-item-city">  {item.room.address} </p>
                        </div>
                      </div>
                      <div>
                        <Image className='arrow-ico' src={require('../Images/arrow-down.svg')}/>
                      </div>
                    </div>
                  </div>
                </div>
            </div>
          );
        });

        return(
          <div className="list-of-requests-trips-div">
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
