import React from 'react';
import { englishToPersianDigits } from '../tools/EnglishToPersianDigits';
import { Divider,Button } from 'semantic-ui-react';
import './UserProfile.css';

class UserProfileXl extends React.Component{
  constructor(props){
    super(props);
    this.state={
      token:null,
      role:null,
      profileInfo:null,
      firstName:'',
      lastName:'',
      cellPhone:'',
      email:'',
      password : '',
      confirmPassword:'',
      nationalId:'',
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
    this.setState({profileInfo:profile,
      firstName:profile.user.first_name,
      lastName:profile.user.last_name,
      cellPhone:profile.user.cell_phone,
      email:profile.user.email,
      nationalId:profile.user.national_id,});
  }
  renderProfilePhoto(){
      if (this.state.profileInfo !== ''){
        if (this.state.profileInfo.user.profile_picture === null){
          return(
            <div className="profilebox">
              <img src={require('../HouseDetailParts/facilities/prof_avatar_tripinn.svg')}  className="profile-avataricon" alt = "" />
            </div>
          );
        }
        else{
          return(
            <div className="profilebox">
              <img className="profile-avatarimg" src={"https://www.trypinn.com/" +this.state.profileInfo.user.profile_picture} alt=""/>
            </div>
          );
        }
      }
    }
    getRelevantToken(){
       return localStorage['token'];
     }
  renderUserProfile(){
    if (this.state.profileInfo!== null){

      return(
        <div className='profile-container-sts'>

              <div className="profile_photobox">
                {this.renderProfilePhoto()}
              </div>
              <div className="userprofilebox">
                <div className='username_offical'>
                    <p>{this.state.profileInfo.user.first_name} {this.state.profileInfo.user.last_name}</p>
                </div>
              </div>
              <div className="profile_after_username">
                <Divider />
              </div>
        </div>
      );
    }
}
  handleSaveInfo(){
        this.setState({role :this.getRole()} ,()=>this.changeInfOnServer());
  }
  changeInfOnServer(){
    var request = new Request('https://www.trypinn.com/auth/api/user/edit/',{ //
      method: 'POST',
      body: JSON.stringify(
        {
          first_name:document.getElementById('first-name').value,
          last_name:document.getElementById('last-name').value,
          cell_phone:document.getElementById('cell-phone').value,
          email:document.getElementById('email').value,
          national_id:document.getElementById('national-id').value,
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
  editNationalId(event){
    this.setState({nationalId:event.target.value});
  }
  editPassword(event){
    this.setState({password:event.target.value});
  }
  editConfirmPassword(event){
    this.setState({confirmPassword:event.target.value});
  }


  renderUserProfileDetailsSection(){
    if(this.state.profileInfo!==null){
      return(
        <div className="user-profile-in-details-main-division">
          <div className="user-profile-profile-picture">
          </div>
          <div className="user-profile-user-name">
          </div>
          <hr/>
          <div className="user-profile-in-details-link">
          </div>
          <div className="user-profile-in-details-link">
          </div>
          <div className="user-profile-in-details-link">
          </div>
          <div className="user-profile-in-details-link">
          </div>
        </div>
      );
    }
  }
  renderUserProfileEditSection(){
    return(
      <div className="user-profile-edit-main-division">
        <div className="user-profile-edit-main-heading">
        </div>
        <hr />
        <div className="user-profile-edit-secondary-heading`">
          <p className="user-profile-edit-secondary-heading-title">
          </p>
          <p className="user-profile-edit-secondary-heading-description">
          </p>
        </div>
        <div className="user-profile-edit-get-data-zone">
          <div className="user-profile-edit-input-paragraph">
            <span className="user-profile-edit-input-paragraph-title">
            </span>
            <span className="user-profile-edit-input-paragraph-description">
            </span>
          </div>
          <div className="user-profile-edit-input">
          </div>
        </div>
        <div className="user-profile-edit-get-data-zone">
          <div className="user-profile-edit-input-paragraph">
            <span className="user-profile-edit-input-paragraph-title">
            </span>
            <span className="user-profile-edit-input-paragraph-description">
            </span>
          </div>
          <div className="user-profile-edit-input">
          </div>
        </div>
        <div className="user-profile-edit-get-data-zone">
          <div className="user-profile-edit-input-paragraph">
            <span className="user-profile-edit-input-paragraph-title">
            </span>
            <span className="user-profile-edit-input-paragraph-description">
            </span>
          </div>
          <div className="user-profile-edit-input">
          </div>
        </div>
        <div className="user-profile-edit-get-data-zone">
          <div className="user-profile-edit-input-paragraph">
            <span className="user-profile-edit-input-paragraph-title">
            </span>
            <span className="user-profile-edit-input-paragraph-description">
            </span>
          </div>
          <div className="user-profile-edit-input">
          </div>
        </div>
        <div className="user-profile-edit-get-data-zone">
          <div className="user-profile-edit-input-paragraph">
            <span className="user-profile-edit-input-paragraph-title">
            </span>
            <span className="user-profile-edit-input-paragraph-description">
            </span>
          </div>
          <div className="user-profile-edit-input">
          </div>
        </div>
        <hr />
        <div className="user-profile-edit-secondary-heading`">
          <p className="user-profile-edit-secondary-heading-title">
          </p>
          <p className="user-profile-edit-secondary-heading-description">
          </p>
        </div>
        <div className="user-profile-edit-get-data-zone">
          <div className="user-profile-edit-input-paragraph">
            <span className="user-profile-edit-input-paragraph-title">
            </span>
            <span className="user-profile-edit-input-paragraph-description">
            </span>
          </div>
          <div className="user-profile-edit-input">
          </div>
        </div>
        <div className="user-profile-edit-get-data-zone">
          <div className="user-profile-edit-input-paragraph">
            <span className="user-profile-edit-input-paragraph-title">
            </span>
            <span className="user-profile-edit-input-paragraph-description">
            </span>
          </div>
          <div className="user-profile-edit-input">
          </div>
        </div>
        <hr/>
        <div> ذخیره</div>
      </div>
    );
  }


  // <div className="profile-container">
  //     <div className="profile-container-margined">
  //       <div className="profile_dynamic_edit col-md-9">
  //         <div className="edit-profile-xl row">
  //             <p className="dashboard-header"> ویرایش حساب کاربری </p>
  //         </div>
  //         <div className="edit-profile-xl-inputs" dir="rtl">
  //         <div className="edit-prof-row1 row">
  //             <div className="col-md-4">
  //               <label className="profile-description-textarea" for="comment"> نام:</label>
  //               <input id='first-name' onChange={this.editFirstName.bind(this)} className="first-name edit-profle-inp form-control-tripinn"  value={this.state.firstName}/>
  //             </div>
  //           <div className="col-md-4">
  //             <label className="profile-description-textarea" for="comment">  نام خانوادگی:</label>
  //             <input id='last-name'onChange={this.editLastName.bind(this)} className="last-name edit-profle-inp form-control-tripinn"  value={this.state.lastName}/>
  //           </div>
  //           <div className="col-md-4">
  //             <label className="profile-description-textarea" for="comment"> کد ملی:</label>
  //             <input id='national-id' onChange={this.editNationalId.bind(this)} className="national-id edit-profle-inp form-control-tripinn" value={this.state.nationalId}/>
  //           </div>
  //         </div>
  //         <div className="edit-prof-row1 row">
  //
  //           <div className="col-md-4">
  //             <label className="profile-description-textarea" for="comment">  شماره همراه:</label>
  //             <input id='cell-phone' onChange={this.editCellPhone.bind(this)} className="cell-phone edit-profle-inp form-control-tripinn" value={this.state.cellPhone}/>
  //           </div>
  //           <div className="col-md-4">
  //             <label className="profile-description-textarea" for="comment">ایمیل:</label>
  //             <input id='email' onChange={this.editEmail.bind(this)} className="email edit-profle-inp form-control-tripinn"  value={this.state.email}/>
  //           </div>
  //           <div className="col-md-4">
  //           </div>
  //         </div>
  //         <div className="edit-prof-row1 row">
  //           <div className="col-md-4">
  //             <label className="profile-description-textarea" for="comment">رمز عبور:</label>
  //             <input id='password'onChange={this.editPassword.bind(this)} className="password edit-profle-inp form-control-tripinn" type="password"/>
  //           </div>
  //           <div className="col-md-4">
  //             <label className="profile-description-textarea" for="comment">تکرار رمز عبور:</label>
  //             <input id='confirm-password' onChange={this.editConfirmPassword.bind(this)} className=" edit-profle-inp form-control-tripinn" type="password" value={this.state.confirmPassword}/>
  //           </div>
  //           <div className="col-md-4">
  //           </div>
  //         </div>
  //
  //         <div className="row">
  //           <div className="col-md-12">
  //             <Button className="save-edit" color="blue" onClick={this.handleSaveInfo.bind(this)}> ذخیره </Button>
  //           </div>
  //         </div>
  //         </div>
  //       </div>
  //       <div className="profile_static_bar col-md-3">
  //           {this.renderUserProfile()}
  //       </div>
  //     </div>
  // </div>

  render(){
    return(
      <div className="user-profile-main-division">
        {this.renderUserProfileDetailsSection()}
        {this.renderUserProfileEditSection()}
      </div>
    );
  }
}

export default UserProfileXl;
