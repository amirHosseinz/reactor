import React from 'react';
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
    var request = new Request('https://www.trypinn.com/api/v1/reservations/list/',{
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
     console.log(trips);
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
          if(item.room ===null)
            var data = item.eco_room;
          else
            var data = item.room;

          return (
            <div  dir="rtl"
                  className={(this.state.selected===item.id)?"trips-item-selected":"trips-item-not-selected"}
                  key={item.id} onClick={() =>{
                  this.showTripItemClick(item)
            }}>
                <div className="trips-item-preview">
                  <img
                  className="trips-item-image"
                  src={"https://www.trypinn.com/"+data.preview}
                  alt=""
                  height="60px;" width="60px"/>
                  <div>
                    <div className="trips-item-title">
                      {data.title}
                    </div>
                  <p className="trips-item-city"> {data.address} </p>
                  </div>
                </div>
              </div>
          );
        });
        return(
          <div className="trips-main-container">
            <p className="trips-title">
              سفر‌ها
            </p>
            <hr className="trips-divider"/>
            {list}
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
