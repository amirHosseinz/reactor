import React from 'react';
import { englishToPersianDigits } from '../tools/EnglishToPersianDigits';
import { Divider,Button } from 'semantic-ui-react';
import './UserProfile.css';
import {Link} from 'react-router-dom';

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
            <div className="user-profile-profile-picture-container">
              <img className="user-profile-profile-picture" src={require('../HouseDetailParts/facilities/prof_avatar_tripinn.svg')} height="200px" width="200px"  alt = "" />
            </div>
          );
        }
        else{
          return(
            <div className="user-profile-profile-picture-container" >
              <img className="user-profile-profile-picture" height="200px" width="200px" src={'https://www.trypinn.com/'+this.state.profileInfo.user.profile_picture} />
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
          first_name:this.state.firstName,
          last_name:this.state.lastName,
          cell_phone:this.state.cellPhone,
          email:this.state.email,
          national_id:this.state.nationalId,
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
        {this.renderProfilePhoto()}
          <div className="user-profile-user-name">
          </div>
          <hr className="user-profile-in-details-divider"/>
          <div className="user-profile-in-details-link">
            پیام ها
          </div>
          <Link to="/dashboard/request">
          <div className="user-profile-in-details-link">
            مشاهده درخواست ها
          </div>
          </Link>
          <Link to="/dashboard/trip">
            <div className="user-profile-in-details-link">
              مشاهده سفر‌ها
            </div>
          </Link>
          <div className="user-profile-in-details-link">
            مکان های مورد علاقه
          </div>
        </div>
      );
    }
  }
  renderUserProfileEditSection(){
    return(
      <div className="user-profile-edit-main-division">
        <div className="user-profile-edit-main-heading">
          ویرایش حساب کاربری
        </div>
        <hr className="user-profile-edit-divider"/>
        <div className="user-profile-edit-secondary-heading`">
          <p className="user-profile-edit-secondary-heading-title">
            مشخصات کاربری
          </p>
          <p className="user-profile-edit-secondary-heading-description">
           بر اساس قوانین، اطلاعات مندرج شما در این سامانه محفوظ خواهد ماند.
          </p>
        </div>
        <div className="user-profile-edit-get-data-zone">
          <div className="user-profile-edit-input-paragraph">
            <span className="user-profile-edit-input-paragraph-title">
            نام
            </span>
          </div>
          <input value={this.state.firstName} onChange={(event)=>{this.editFirstName(event)}} className="user-profile-edit-input"/>
        </div>
        <div className="user-profile-edit-get-data-zone">
          <div className="user-profile-edit-input-paragraph">
            <span className="user-profile-edit-input-paragraph-title">
             نام خانوادگی
            </span>
            <span className="user-profile-edit-input-paragraph-description">
            </span>
          </div>
          <input value={this.state.lastName} onChange={(event)=>{this.editLastName(event)}}className="user-profile-edit-input" />
        </div>
        <div className="user-profile-edit-get-data-zone">
          <div className="user-profile-edit-input-paragraph">
            <span className="user-profile-edit-input-paragraph-title">
               شماره همراه
            </span>
            <span className="user-profile-edit-input-paragraph-description">
          (از این شماره برای ورود به اپلیکیشن و سایت سامانه استفاده خواهد شد)
            </span>
          </div>
          <input value={this.state.cellPhone} onChange={(event)=>{this.editCellPhone(event)}}className="user-profile-edit-input" />
        </div>
        <div className="user-profile-edit-get-data-zone">
          <div className="user-profile-edit-input-paragraph">
            <span className="user-profile-edit-input-paragraph-title">
              کُد ملی
            </span>
            <span className="user-profile-edit-input-paragraph-description">
          (ثبت کد ملی صحیح و منطبق با نام و نام خانوادگی برای رزرو ضروری می‌باشد)
            </span>
          </div>
          <input value={this.state.nationalId} onChange={(event)=>{this.editNationalId(event)}} className="user-profile-edit-input"/>
        </div>
        <div className="user-profile-edit-get-data-zone">
          <div className="user-profile-edit-input-paragraph">
            <span className="user-profile-edit-input-paragraph-title">
            ایمیل
            </span>
            <span className="user-profile-edit-input-paragraph-description">
            (اختیاری)
            </span>
          </div>
          <input value={this.state.email} onChange={(event)=>{this.editEmail(event)}} className="user-profile-edit-input" />
        </div>
        <hr className="user-profile-edit-divider"/>
        <div className="user-profile-edit-secondary-heading">
          <p className="user-profile-edit-secondary-heading-title">
            رمز عبور
          </p>
          <p className="user-profile-edit-secondary-heading-description">
            در صورت نیاز به تغییر رمز عبور، این بخش را ویرایش کنید. در غیر اینصورت رمز عبور سابق شما ثبت شده می‌ماند.
          </p>
        </div>
        <div className="user-profile-edit-get-data-zone">
          <div className="user-profile-edit-input-paragraph">
            <span className="user-profile-edit-input-paragraph-title-password-section">
           رمز عبور:
            </span>
          </div>
          <input value={this.state.password} onChange={(event)=>{this.editPassword(event)}} className="user-profile-edit-input-password-section" />
        </div>
        <div className="user-profile-edit-get-data-zone">
          <div className="user-profile-edit-input-paragraph">
            <span className="user-profile-edit-input-paragraph-title-password-section">
             تکرار رمز عبور:
            </span>
          </div>
          <input value={this.state.confirmPassword} onChange={(event)=>{this.editConfirmPassword(event)}}className="user-profile-edit-input-password-section"/>
        </div>
        <hr className="user-profile-edit-divider"/>
        <button onClick={()=>{this.handleSaveInfo()}}className="user-profile-edit-save-changes-button">
                    ذخیره تغییرات
        </button>
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
