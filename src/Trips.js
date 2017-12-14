import React from 'react';

class Trips extends React.Component{
  constructor(props){
    super(props);
    this.state={
      token:null,
      role:null,
      requestList:null,
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
     console.log(trips);
     this.renderData(trips);
   });
  }

  renderData(trips){
    this.setState({requestList:trips});
  }
  renderRequests(){
    if (this.state.requestList!== null){
      return (
        <div>
        </div>
      );
    }
  }
  render(){
    return(
      <div>
        <button onClick={this.handleTripClick.bind(this)}>
          trips
			  </button>
      </div>

    );
  }
}

export default Trips;
