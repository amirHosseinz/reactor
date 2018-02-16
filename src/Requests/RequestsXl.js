import React from 'react';
import { Divider,Button } from 'semantic-ui-react';
import {ListGroup, ListGroupItem} from 'react-bootstrap';
import 'react-virtualized/styles.css'
import { Column, Table } from 'react-virtualized'
import AutoSizer from 'react-virtualized/dist/commonjs/AutoSizer'
import List from 'react-virtualized/dist/commonjs/List'
import {Image} from 'semantic-ui-react';



class RequestsXl extends React.Component{
  constructor(props){
    super(props);
    this.list=[];
    this.state={
      selected:0,
      token:null,
      selectedRequest:'',
      role:null,
      requestList:null,
      firstItem:null,
    };
  }
  componentWillMount() {
      this.setState({token:this.getRelevantToken()},()=>{this.setSearchParams(this.getRole())});
  }

  componentWillReceiveProps(nextProps){
    if(this.props.reRender!==nextProps.reRender){
        this.setSearchParams(this.getRole());
    }
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
        platform:'web',
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
    this.setState({requestList:request_list},()=>{
      console.log(this.state.requestList.request_list);
      if(request_list.request_list.length>0){

        this.showRequestItemClick(request_list.request_list[0],true);
        // this.props.changeHasRequest(true);
      }
      else{

        this.showRequestItemClick({status:'no-house'});
        // this.props.changeHasRequest(false);
      }
    });

  }

  showRequestItemClick(item){
    this.setState({selected:item.id} ,()=>{this.props.changeRequestDetail(item)});
  }

  handleHighlight(event){
    this.setState({selectedRequest:event.target.id});
  }

  renderRequests(){
      if(this.state.requestList!==null){
        var request_list = this.state.requestList.request_list;
        if(request_list.length>0){
          this.list = request_list.map((item)=>  {
            return(
              <div
                dir="rtl"
                className={(this.state.selected===item.id)?"userpanel-item-list-selected":"userpanel-item-list-not-selected"}
                key={item.id} onClick={() =>{
                this.showRequestItemClick(item)
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
                      <p className="request-list-item-city">{item.room.address} </p>
                      </div>
                    </div>
                  </ListGroupItem>
                  </div>
            </div>
            );
          }
      );
        return(
          <div>
            <ListGroup>{this.list}</ListGroup>
          </div>
           );
        }
    }
  }
  render(){
    return(
      <div>
        <div className="list-of-request-div">
            {this.renderRequests()}
        </div>
      </div>
    );
  }
}

export default RequestsXl;
