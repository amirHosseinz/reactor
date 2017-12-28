import React from 'react';

class UserProfile extends React.Component{
  constructor(props){
    super(props);
    this.state={
      token:null,
      role:null,
      ProfileInfo:null,
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
    var request = new Request('https://www.trypinn.com/auth/api/user/get_info/',{ //
      method: 'POST',
      headers: new Headers({'Accept': 'application/json','Content-Type': 'application/json',
      'Authorization': 'Token '+ this.state.token,})
    });
   fetch(request)
   .then((response) => {
     return response.json();
   })
   .then((profile) => {
     console.log('salam injam man azizam ^_^');
     console.log(profile);
     this.renderData(profile);
   });
  }
  renderData(profile){
    this.setState({ProfileInfo:profile});
  }
  renderUserProfile(){
    if (this.state.ProfileInfo!== null){
      return(
        <div className='profile-container'>
        <div className='username'>
        {this.state.ProfileInfo.user.first_name}
        {this.state.ProfileInfo.user.last_name}
        </div>
        <div className='user-mail'>
        {this.state.ProfileInfo.user.email}
        </div>
        <div className='user-cell-phone'>
        {this.state.ProfileInfo.user.cell_phone}
        </div>
        <img className='user-profile-picture' src={this.state.ProfileInfo.user.profile_picture} alt='user-profile-picture'/>
        </div>
      );
}
}
  render(){
    return(
      <div>
        {this.renderUserProfile()}
      </div>

    );
  }
}
export default UserProfile;
