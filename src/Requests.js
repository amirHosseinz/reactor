import React from 'react';


class Requests extends React.Component{
  constructor(props){
    super(props);
    this.state={
      token:null,
      role:null,
      requestList:null,
    };
  }
  componentWillMount() {
      this.setState({token:this.getRelevantToken()},()=>{this.setSearchParams(this.getRole())});
  }
  getRelevantToken(){
    if(localStorage['isLoggedIn']==='true'){
      return localStorage['token'];
    }
    else{
      return localStorage['token'];
    }
  }
  getRole(){
    return 'guest';
  }

  setSearchParams(person_role){
    this.setState({role :person_role},()=>this.getDataFromServer())
  }
  getDataFromServer(){
    var request = new Request('https://www.trypinn.com/api/request/list/',{
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
   .then((request_list) => {
     this.renderData(request_list);
   });
  }
  renderData(request_list){
    this.setState({requestList:request_list});
  }

  showRequestItemClick(item){
    this.props.changeRequestDetail(item);
  }

  renderRequests(){
      if(this.state.requestList!==null){
        var request_list = this.state.requestList.request_list;
        var list = request_list.map((item)=>
        <button key={item.id} onClick={() =>{
          this.showRequestItemClick(item)
        }}>
      <li>
      <div className="preview">
      <img
      src={"https://www.trypinn.com/"+item.room.preview}
      alt=""
      height="50" width="50"/>
      </div>
      <div className="title">
      {item.room.title}
      </div>
      <div className="host_name">
      <p>{item.room.owner.first_name} {item.room.owner.last_name}</p>
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
        <div>
          {this.renderRequests()}
        </div>
      </div>
    );
  }
}
export default Requests;
