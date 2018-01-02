import React from 'react';

class BecomeHost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
         token:null,
          role:null,
          firstName:'',
          lastName:'',
          cellPhone:'',
          email:'',
          city:'',};

  }

  getRelevantToken(){
    return localStorage['token'];
  }

  handleSaveInfo(){
        this.setState({role :this.getRole()} ,()=>this.changeInfOnServer());
  }
  changeInfOnServer(){
    var request = new Request('https://www.trypinn.com/auth/api/user/edit/',{ //
      method: 'POST',
      body: JSON.stringify(
        {
          first_name:this.state.firstName,
          last_name:this.state.lastName,
          cell_phone:this.state.cellPhone,
          email:this.state.email,
          national_id:this.state.city,
        }
      ),
      headers: new Headers({'Accept': 'application/json','Content-Type': 'application/json',
      'Authorization': 'Token '+this.state.token,})
    });
   fetch(request)
   .then((response) => {
     return response.json();
   })
   .then((response) => {
     localStorage['user-first-name']=this.state.firstName;
     localStorage['user-last-name']=this.state.lastName;
     window.location.reload();
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
    this.setState({nationalId:event.target.value});
  }

  render() {
    return (
      <div>

      <div className="profile-container-margined">
        <div className="profile_dynamic_edit col-md-9">
          <div className="edit-profile-xl row">
      <form onSubmit={this.handleSubmit}>
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
   <button className="save-edit" color="blue" onClick={this.handleSaveInfo.bind(this)}> ذخیره </button>
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
