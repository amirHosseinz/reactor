import React from 'react';
import { englishToPersianDigits } from './tools/EnglishToPersianDigits';
import { Divider,Button,Input } from 'semantic-ui-react';

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
            <div className="host-photo">
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
              <div className="userprofilebox">
                <div className='username_offical'>
                    <p>{this.state.ProfileInfo.user.first_name} {this.state.ProfileInfo.user.last_name}</p>
                </div>
              </div>

              <div className="profile_after_username">
                <Divider />

              </div>
        </div>
      );
    }
}

  render(){
    return(
      <div>
          <div className="profile-container-margined">
            <div className="profile_dynamic_edit col-md-9">
              <div className="edit-profile-xl row">
                  <p className="dashboard-header"> ویرایش حساب کاربری </p>
              </div>
              <div className="edit-profile-xl-inputs" dir="rtl">
              <div className="edit-prof-row1 row">
                  <div className="col-md-4">
                    <p className="profile-labels">نام:</p>
                    <input className="first_name_edit input-sm form-control" placeholder="نام"/>
                  </div>
                <div className="col-md-4">
                  <p className="profile-labels">نام خانوادگی:</p>
                  <input className="last_name_edit input-sm form-control"  placeholder="نام خانوادگی"/>
                </div>
                <div className="col-md-4">
                  <p className="profile-labels">کد ملی:</p>
                  <input className="last_name_edit input-sm form-control" placeholder="کد ملی"/>
                </div>
              </div>
              <div className="edit-prof-row1 row">

                <div className="col-md-4">
                  <p className="profile-labels">شماره همراه: </p>
                  <input className="last_name_edit input-sm form-control"  placeholder="شماره تلفن همراه"/>
                </div>
                <div className="col-md-4">
                  <p className="profile-labels">ایمیل:</p>
                  <input className="last_name_edit input-sm form-control"  placeholder="ایمیل"/>
                </div>
                <div className="col-md-4">
                </div>
              </div>
              <div className="edit-prof-row1 row">

                <div className="col-md-4">
                  <p className="profile-labels">رمز عبور : </p>
                  <input className="last_name_edit input-sm form-control" type="password" placeholder="رمز عبور"/>
                </div>
                <div className="col-md-4">
                  <p className="profile-labels">تکرار رمز عبور:</p>
                  <input className="last_name_edit input-sm form-control" type="password" placeholder="تکرار رمز عبور"/>
                </div>
                <div className="col-md-4">
                </div>
              </div>

              <div className="row">
                <div className="col-md-12">
                  <Button className="save-edit" color="blue"> ذخیره </Button>
                </div>
              </div>
              </div>
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
