import React from 'react';

class BecomeHost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
         token:null,
          firstName:'',
          lastName:'',
          cellPhone:'',
          email:'',
          city:'',
        };

  }

  componentWillMount() {
      this.setState({token:this.getRelevantToken()});
  }

  getRelevantToken(){
    return localStorage['token'];
  }


  changeInfOnServer(){
         console.log('injaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa');
         console.log(this.state);
    var request = new Request('https://www.trypinn.com/host-submit/',{ //
      method: 'POST',
      body: JSON.stringify(
        {
          first_name:this.state.firstName,
          last_name:this.state.lastName,
          phone_no:this.state.cellPhone,
          email:this.state.email,
          city:this.state.city,
        }
      ),
      headers: new Headers({'Accept': 'application/json','Content-Type': 'application/json',
      'Authorization': 'Token '+this.state.token,})
    });
   fetch(request)
   .then((response) => {
     console.log('injaaaaa');
     return response.json();
     console.log('injaaaaa');
   })
   .then((response) => {
     return response;
   });
  }

  editFirstName(event){
    this.setState({firstName : event.target.value});
  }
  editLastName(event){
    this.setState({lastName:event.target.value});
  }
  editEmail(event){
    this.setState({email:event.target.value});
  }
  editCellPhone(event){
    this.setState({cellPhone:event.target.value});
  }
  editCity(event){
    this.setState({city:event.target.value});
  }

  render() {
    return (
      <div>

      <div className="profile-container-margined">
        <div className="profile_dynamic_edit col-md-9">
          <div className="edit-profile-xl row">
      <form>
        <label>
          نام:
          <input type="text" id='your_name' value={this.state.firstName} onChange={this.editFirstName.bind(this)} required  />
        </label>
        <label>
        نام خانوادگی:
        <input type="text" value={this.state.lastName} onChange={this.editLastName.bind(this)} required/>
      </label>
      <label>
     شماره تلفن:
      <input type="text" value={this.state.cellphone} onChange={this.editCellPhone.bind(this)} required />
    </label>
    <label>
     شهر:
    <input type="text" value={this.state.city} onChange={this.editCity.bind(this)} required/>
    </label>
    <label>
  ( ایمیل (اختیاری
    <input type="text" value={this.state.email} onChange={this.editEmail.bind(this)} />
    </label>
    <div>
   <button className="save-edit" color="blue" onClick={this.changeInfOnServer.bind(this)}> ذخیره </button>
    </div>
      </form>
      </div>
      </div>
      </div>
      </div>
    );
  }
}
export default BecomeHost;
