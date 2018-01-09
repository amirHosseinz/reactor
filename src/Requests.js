import React from 'react';
import { Divider,Button } from 'semantic-ui-react';
import {ListGroup, ListGroupItem} from 'react-bootstrap';
import 'react-virtualized/styles.css'
import { Column, Table } from 'react-virtualized'
import AutoSizer from 'react-virtualized/dist/commonjs/AutoSizer'
import List from 'react-virtualized/dist/commonjs/List'


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
        <div
          className="userpanel-item-list"
          key={item.id} onClick={() =>{
          this.showRequestItemClick(item)
          }}>
            <ListGroupItem className="scroll-list-requests">
              <div className="preview">
                <img
                src={"https://www.trypinn.com/"+item.room.preview}
                alt=""
                height="100%" width="80px"/>
              </div>
              <div className="title">
                {item.room.title}
              </div>
              <div className="host_name">
                <p>{item.room.owner.first_name} {item.room.owner.last_name}</p>
              </div>
              <Divider/>
            </ListGroupItem>
      </div>
    );
      return(
       <ListGroup>{list}</ListGroup>
         );
      }
  }
  render(){
    return(
      <div dir="rtl" >
          {this.renderRequests()}
      </div>
    );
  }
}
export default Requests;
