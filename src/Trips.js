import React from 'react';

class Trips extends React.Component{
  constructor(props){
    super(props);
    this.state={
      token:null,
      role:null,
      tripList:null,
    };
  }
  getRole(){
    return 'guest';
  }
  handleTripClick(){
    this.setState({token:"460b152177ab02716faa0d7795ff60f12d7cbd9d"},()=>{this.setSearchParams(this.getRole())});
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
   });
  }

  renderData(trips){
    this.setState({tripList:trips});
  }
  showTripItemClick(item){
    this.props.changeTripDetail(item);
  }
  renderTrips(){
    if (this.state.tripList!== null){
      var reserve_list = this.state.tripList.reserve_list;
      var list = reserve_list.map((item)=>
      <button key={item.id} onClick={() =>{
        this.showTripItemClick(item)
      }}>
      <li>
        <div className="preview">
        <img src={"https:/trypinn.com"+ item.room.preview}
        height="50" width="50"
        alt=""/>
        </div>
        <div className="title">
          {item.room.title}
          </div>
          <div className="location">
          {item.room.address}
          </div>
          </li>
      </button>
      );
      return(
        <ul>{list}</ul>
      );
    }
  }
  render(){
    return(
      <div>
        <button onClick={this.handleTripClick.bind(this)}>
          trips
			  </button>
      <div>
        {this.renderTrips()}
      </div>
      </div>

    );
  }
}
export default Trips;
