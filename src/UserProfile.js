import React from 'react';
import { englishToPersianDigits } from './tools/EnglishToPersianDigits';

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
  renderProfilePhoto(){
      if (this.state.ProfileInfo !== ''){
        if (this.state.ProfileInfo.user.profile_picture === null){
          return(
            <div className="profilebox">
              <img src={require('./HouseDetailParts/facilities/prof_avatar_tripinn.svg')}  className="profile-avataricon" alt = "" />
            </div>
          );
        }
        else{
          return(
            <div className="host-photo" style={{justifyContent:"center"}}>
              <img className="profile-avatarimg" src={"https://www.trypinn.com/" +this.state.ProfileInfo.user.profile_picture} alt=""/>
            </div>
          );
        }
      }
    }

  renderUserProfile(){
    if (this.state.ProfileInfo!== null){

      return(
        <div className='profile-container'>


              <div className="profile_photobox">  {this.renderProfilePhoto()}</div>
              <div className='username_offical'>
                {this.state.ProfileInfo.user.first_name}
                <p>  </p>
                <div className="profile-lastname">
                  {this.state.ProfileInfo.user.last_name}
                </div>
              </div>
              <div className='user-cell-phone'>
                <p className="prof_menu_item_rtl">: شماره تلفن</p>
                {englishToPersianDigits(this.state.ProfileInfo.user.cell_phone)}
              </div>
              <div className='user-mail'>
                <p className="prof_menu_item_rtl">: ایمیل </p>
                {this.state.ProfileInfo.user.email}
              </div>
              <div className='user-mail'>
                <p className="prof_menu_item_rtl">: کد ملی </p>
                {englishToPersianDigits(this.state.ProfileInfo.user.national_id)}
              </div>
        </div>
      );
}
}

  render(){
    return(
      <div>
          <div className="profile-container-margined">
            <div className="col-md-9">
            </div>
            <div className="profile_static_bar col-md-3">
                {this.renderUserProfile()}
            </div>
          </div>
      </div>

    );
  }
}
export default UserProfile;
