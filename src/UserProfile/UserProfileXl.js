import React from 'react';
import { englishToPersianDigits,persianArabicToEnglishDigits} from '../tools/EnglishToPersianDigits';
import { Divider,Button } from 'semantic-ui-react';
import './UserProfile.css';
import {Link} from 'react-router-dom';
import Modal from 'react-modal';
import {UserProfileUploadPhotoModal} from '../Styles.js';
import {ChangePassSuccessModal} from '../Styles.js';
import {ChangePassFailedModal} from '../Styles.js';
import Dropzone from 'react-dropzone';
import {SyncLoader} from 'react-spinners';
import {parsePrice3digits} from '../tools/ParsePrice3digits.js';


class UserProfileXl extends React.Component{
  constructor(props){
    super(props);
    this.state={
      ImgHint:false,
      token:null,
      role:null,
      selectedPanel:"bookmark-list",
      profileInfo:null,
      firstName:'',
      lastName:'',
      cellPhone:'',
      loading:false,
      showUploadPhotoModal:false,
      oldPassword:'',
      email:'',
      password : '',
      confirmPassword:'',
      bookmarkList:null,
      nationalId:'',
      profilePicture : null,
      profilePictureFile : null,
      openPassConfirmationModal:false,
      passConfirmationModal:'',
      passConfirmation:true,
      passConfirmationErrors:[],
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
   this.getBookmarkListFromServer();
  }
  getBookmarkListFromServer(){
    var request = new Request('https://www.trypinn.com/bookmark/api/list/',{ //
      method: 'POST',
      headers: new Headers({'Accept': 'application/json','Content-Type': 'application/json',
      'Authorization': 'Token '+ this.state.token,})
    });
   fetch(request)
   .then((response) => {
     return response.json();
   })
   .then((list) => {
     // console.log(list);
     this.setState({bookmarkList:list.faved_rooms});
   });
  }
  renderData(profile){
    this.setState({profileInfo:profile,
      profilePicture : "https://www.trypinn.com/" + profile.user.profile_picture,
      firstName:profile.user.first_name,
      lastName:profile.user.last_name,
      cellPhone:profile.user.cell_phone,
      email:profile.user.email,
      nationalId:profile.user.national_id,});
  }
  renderUploadImageHint(){
    if(this.state.ImgHint===false){
      return null;
    }
    if(this.state.ImgHint===true){
      return(
        <div onClick={()=>{this.setState({showUploadPhotoModal:true})}} className="profile-img-hint">
          <img height="100px" width="100px" src={require('../Images/change-avatar-icon.svg')} />
        </div>
      );
    }
  }

  onDrop(files){
    if(files.length>0){
      this.setState({profilePicture:files[0].preview,profilePictureFile:files[0]});
    }
  }

  renderLoadingOrSelect(){
    if(this.state.loading===false){
      return(
        <div className="user-profile-upload-photo-modal-image-selection-button">
          انتخاب تصویر
        </div>
      );
    }
    else{
      return(
        <div className="user-profile-upload-photo-modal-loading-indicator">
          <SyncLoader size={15} color="#26c4df" loading={true}/>
        </div>
      );
    }
  }

  renderUploadPhotoModal(){
    return(
      <Modal isOpen={this.state.showUploadPhotoModal}
             onRequestClose={()=>{this.setState({showUploadPhotoModal:false,profilePicture:"https://www.trypinn.com/" + this.state.profileInfo.user.profile_picture})}}
             style={UserProfileUploadPhotoModal}>
               <div className="user-profile-upload-photo-modal-main-division">
                <div onClick={()=>{this.setState({showUploadPhotoModal:false,profilePicture:"https://www.trypinn.com/" + this.state.profileInfo.user.profile_picture})}} className="close-modal-phone-number">
                </div>
                <p className="user-profile-upload-photo-modal-title">
                  تصویر پروفایل
                </p>
                <hr className="user-profile-upload-photo-modal-divider"/>
               <Dropzone accept="image/*" className="user-profile-upload-photo-modal-drop-zone" multiple={false} onDrop={(files)=>{this.onDrop(files)}}>
                 <div className="user-profile-upload-photo-modal-image-zone">
                  <img className="user-profile-upload-photo-modal-image" src={this.state.profilePicture} alt=""  height="250px" width="250px"/>
                  {this.renderLoadingOrSelect()}
                 </div>
               </Dropzone>
               <p onClick={()=>{this.setState({profilePicture:null})}} className="user-profile-upload-photo-modal-delete-selection">
                حذف تصویر
               </p>
               <div onClick={()=>{this.setState({loading:true},()=>{this.handleChangeProfilePicture()})}} className="user-profile-upload-photo-modal-save-selection">
                ذخیره
               </div>
               </div>
      </Modal>
    );
  }
                 // <ClimbingBoxLoader color={'#12b2ce'} loading={true} />
  handleChangeProfilePicture(){
    var fd = new FormData();
    fd.append('profile_picture' , this.state.profilePictureFile);
    var request = new Request('https://www.trypinn.com/auth/api/user/edit/',{
      method: 'POST',
      body: fd,
      headers: new Headers({'Accept': 'application/json',
      'Authorization': 'Token '+this.state.token,})
    });
   fetch(request)
   .then((response) => {
     return response.json();
   })
   .then((response) => {
     // console.log(response);
     if(response.successful){
       localStorage['user-profile-picture'] = response.user.profile_picture;
       window.location.reload();
     }
   });
  }
  ChangeImgHintState(){
    this.setState({ImgHint: true,});
  }
  ReChangeImgHintState(){
      this.setState({ImgHint: false,});
  }
  renderProfilePhoto(){
      if (this.state.profileInfo !== ''){
        if (this.state.profileInfo.user.profile_picture === null){
          return(
            <div className="user-profile-profile-picture-container" onMouseEnter={this.ChangeImgHintState.bind(this)} onMouseLeave={this.ReChangeImgHintState.bind(this)}>
              <img className="user-profile-profile-picture" src={require('../HouseDetailParts/facilities/prof_avatar_tripinn.svg')} height="200px" width="200px"  alt = "" />
              {this.renderUploadImageHint()}
            </div>
          );
        }
        else{
          return(
            <div className="user-profile-profile-picture-container" onMouseEnter={this.ChangeImgHintState.bind(this)} onMouseLeave={this.ReChangeImgHintState.bind(this)}>
              {this.renderUploadImageHint()}
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
        this.setState({role :this.getRole()} ,()=>this.changeInfoOnServer());
  }

  handleChangePassword(){
    this.setState({role :this.getRole()} ,()=>this.changePasswordOnServer());
  }

  changePasswordOnServer(){
    var request = new Request('https://www.trypinn.com/auth/api/user/edit/edit_password/',{ //
      method: 'POST',
      body: JSON.stringify(
        {
          old_password:this.state.oldPassword,
          password : this.state.password,
          confirm_password : this.state.confirmPassword,
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
     // console.log(response);
     this.setState({passConfirmation:response.successful,passConfirmationErrors:response.errors,openPassConfirmationModal:true})
     this.setState({passConfirmationErrors:response.errors})
   });
  }
  handleChangePassErrors(){
    // console.log(this.state.passConfirmationErrors);
    if (this.state.passConfirmationErrors.indexOf("Your password can't be too similar to your other personal information.") > -1) {
      return(
        <div>
       کلمه عبور شما مشابه دیگر اطلاعات کاربری شماست
        </div>
      );
    }
    else if (this.state.passConfirmationErrors.indexOf("Your password must contain at least 10 characters.") > -1) {
      return(
        <div>
        رمز عبور شما باید بیش از 6 کارکتر باشد
        </div>
      );
    }
    else if (this.state.passConfirmationErrors.indexOf("Your password can't be entirely numeric.") > -1) {
      return(
        <div>
    کلمه عبور شما باید حداقل شامل یک حرف باشد
        </div>
      );
    }
    else if (this.state.passConfirmationErrors.indexOf("invalid_password") > -1) {
      return(
        <div>
    کلمه عبور وارد شده صحیح نمی‌باشد
        </div>
      );
    }
    else if (this.state.passConfirmationErrors.indexOf("not_match") > -1) {
      return(
        <div>
    تکرار کلمه عبور وارد شده صحیح نمی‌باشد
        </div>
      );
    }
    else if (this.state.passConfirmationErrors.indexOf("Your password can't be a commonly used password.") > -1) {
      return(
        <div>
        کلمه عبور وارد شده معتبر نمی‌باشد
        </div>
      );
    }
    else if (this.state.passConfirmationErrors.length===0) {
      return(
        <div>
        لطفا از پر شدن تمام فیلدها اطمینان حاصل نمایید
          </div>
      );
    }
  }
   renderPassConfirmationModal(){
     if(this.state.passConfirmation===true){
     return(
       <Modal isOpen={this.state.openPassConfirmationModal}
             onRequestClose={()=>{this.setState({openPassConfirmationModal:false})}}
              style={ChangePassSuccessModal}>
              <div className='change-pass-success-container'>
              <p>رمز عبور شما با موفقیت تغییر کرد
              <img className='change-pass-success-tick' src={require('../Images/changePassSuccess.svg')} width="40" height="40"/>
              </p>
              </div>
              <button className='change-pass-success-button' onClick={()=>{this.setState({openPassConfirmationModal:false});window.location.reload()}}>
              بستن
              </button>
      </Modal>
    );
  }
  else {
    return(
      <Modal isOpen={this.state.openPassConfirmationModal}
            onRequestClose={()=>{this.setState({openPassConfirmationModal:false})}}
             style={ChangePassFailedModal}>
             <div>
              {this.handleChangePassErrors()}
            </div>

     </Modal>
   );
  }
 }
  changeInfoOnServer(){
    var request=new Request('https://www.trypinn.com/auth/api/user/edit/',{ //
      method: 'POST',
      body: JSON.stringify(
        {
          first_name:this.state.firstName,
          last_name:this.state.lastName,
          cell_phone:persianArabicToEnglishDigits(this.state.cellPhone),
          email:this.state.email,
          national_id:persianArabicToEnglishDigits(this.state.nationalId),
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
  editOldPassoword(event){
    this.setState({oldPassword:event.target.value});
  }


  // <div className="user-profile-in-details-link">
  //  پیام‌ها
  // </div>
  // <div className="user-profile-in-details-link">
  //   مکان‌های مورد علاقه
  // </div>
  renderUserProfileDetailsSection(){
    if(this.state.profileInfo!==null){
      return(
        <div className="user-profile-in-details-main-division">
        {this.renderProfilePhoto()}
          <div className="user-profile-user-name">
          </div>
          <hr className="user-profile-in-details-divider"/>


          <Link to="/dashboard/request">
          <div className="user-profile-in-details-link">
             مشاهده درخواست‌ها
          </div>
          </Link>
          <Link to="/dashboard/trip">
            <div className="user-profile-in-details-link">
              مشاهده سفر‌ها
            </div>
          </Link>
        </div>
      );
    }
  }

  handleUnlike(event,data){
    switch(data.type){
      case "room":{
        var request = new Request('https://www.trypinn.com/bookmark/api/unlike/', {
          method: 'POST',
          body: JSON.stringify({
            room_id : data.id,
        }),
          headers: new Headers({'Accept': 'application/json','Content-Type': 'application/json',
          'Authorization': 'Token '+this.state.token,})
        });
        fetch(request)
        .then((response) => {
          return response.json();
        })
        .then((unlikeResponse) => {
          // console.log(unlikeResponse);
          if(unlikeResponse.successful===true){
            this.getBookmarkListFromServer()
          }
        });
        break;
      }
      case "ecotourism":{
        var request = new Request('https://www.trypinn.com/bookmark/api/unlike/', {
          method: 'POST',
          body: JSON.stringify({
            eco_room_id : data.id,
        }),
          headers: new Headers({'Accept': 'application/json','Content-Type': 'application/json',
          'Authorization': 'Token '+this.state.token,})
        });
        fetch(request)
        .then((response) => {
          return response.json();
        })
        .then((unlikeResponse) => {
          // console.log(unlikeResponse);
          if(unlikeResponse.successful===true){
            this.getBookmarkListFromServer()
          }
        });
        break;
      }
    }
  }
  renderRelevantPanel(){
    if(this.state.selectedPanel==="edit-profile"){
      return(
        <div className="user-profile-edit-main-division">
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
            <span> </span>
            <span className="user-profile-edit-input-paragraph-description">
          (از این شماره برای ورود به اپلیکیشن و سایت سامانه استفاده خواهد شد)
            </span>
          </div>
          <input value={englishToPersianDigits(this.state.cellPhone)} onChange={(event)=>{this.editCellPhone(event)}}className="user-profile-edit-input" />
        </div>
        <div className="user-profile-edit-get-data-zone">
          <div className="user-profile-edit-input-paragraph">
            <span className="user-profile-edit-input-paragraph-title">
              کد ملی
            </span>
            <span> </span>
            <span className="user-profile-edit-input-paragraph-description">
          (ثبت کد ملی صحیح و منطبق با نام و نام خانوادگی برای رزرو ضروری می‌باشد)
            </span>
          </div>
          <input value={englishToPersianDigits(this.state.nationalId)} onChange={(event)=>{this.editNationalId(event)}} className="user-profile-edit-input"/>
        </div>
        <div className="user-profile-edit-get-data-zone">
          <div className="user-profile-edit-input-paragraph">
            <span className="user-profile-edit-input-paragraph-title">
            ایمیل
            </span>
            <span> </span>
            <span className="user-profile-edit-input-paragraph-description">
            (اختیاری)
            </span>
          </div>
          <input value={this.state.email} onChange={(event)=>{this.editEmail(event)}} className="user-profile-edit-input" />
        </div>
        <button onClick={()=>{this.handleSaveInfo()}}className="user-profile-edit-save-changes-button">
                    ذخیره تغییرات
        </button>
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
           رمز عبور فعلی
            </span>
          </div>
          <input type="password" value={this.state.oldPassword} onChange={(event)=>{this.editOldPassoword(event)}} className="user-profile-edit-input-password-section" />
        </div>
        <div className="user-profile-edit-get-data-zone">
          <div className="user-profile-edit-input-paragraph">
            <span className="user-profile-edit-input-paragraph-title-password-section">
              رمز عبور جدید
            </span>
          </div>
          <input type="password" value={this.state.password} onChange={(event)=>{this.editPassword(event)}}className="user-profile-edit-input-password-section"/>
        </div>
        <div className="user-profile-edit-get-data-zone">
          <div className="user-profile-edit-input-paragraph">
            <span className="user-profile-edit-input-paragraph-title-password-section">
               تکرار رمز عبور جدید
            </span>
          </div>
          <input type="password" value={this.state.confirmPassword} onChange={(event)=>{this.editConfirmPassword(event)}}className="user-profile-edit-input-password-section"/>
        </div>
        <button onClick={()=>{this.handleChangePassword()}} className="user-profile-edit-save-changes-button">
                    تغییر رمز عبور
        </button>
        </div>
      );
    }
    if(this.state.selectedPanel==="bookmark-list"){
      if(this.state.bookmarkList!==null){
        if(this.state.bookmarkList.length!==0){
          return(
            <div className="bookmark-list-main-division">
              {this.renderBookmarkList()}
            </div>
          );
        }
        else{
          return(
            <div className="bookmark-list-empty-icon">
              <img className="no-bookmark-icon" src={require("../Images/nobookmark.png")} alt="" />
              <p className="no-bookmark-description"> لیست علاقه‌مندی های شما خالی است</p>
            </div>
          );
        }
      }
    }
  }

    renderBookmarkList(){
      var list =
        this.state.bookmarkList.map((item)=>{
        if(item.room===null){
          var data = item.eco_room;
        }
        else{
          var data = item.room;
        }
        return(
          <div id={data.id}>
            <div className="bookmark-item">
              <div className="bookmark-item-data">
              <img src={"https://www.trypinn.com"+data.preview} alt={data.title} className="bookmark-item-preview"/>
              <div className="bookmark-item-description">
                <a href={"/"+ (data.type==="room"?"rooms/":"ecotourism/") + data.id } target="_blank" className = "bookmark-item-link">
                  <p className="bookmark-item-title">
                    {data.title}
                  </p>
                </a>
                {this.renderRelevantRoom(data)}
                <p className="bookmark-item-type">
                  {data.address}
                </p>
                <div className="bookmark-item-bottom-section">
                <p onClick={(event)=>{this.handleUnlike(event,data)}} className="bookmark-item-delete-button">
                  حذف از لیست
                </p>
                <p className="bookmark-item-price-details">
                <span className="bookmark-item-price">
                   {englishToPersianDigits(parsePrice3digits(data.price))} تومان
                </span>
                <span className="bookmark-item-price-description">
                {data.type==="room"?"/ هر شب عادی"  : "/ هر نفر هر شب"}
                </span>
                </p>
                </div>
              </div>
              </div>
            </div>
            <hr className="bookmark-item-divider"/>
          </div>
      );
      }
    );
    return <div className="bookmark-list-container"> {list} </div>;
    }
    getRoomType(data){
      switch(data.room_type){
        case "HOUSE":
          return 'خانه';
        case "SUITE":
          return 'سوییت';
        case "VILLA":
          return 'ویلای';
        case "APT":
          return 'آپارتمان';
        default:
          return null;
      }
    }
    getServiceType(data){
      switch(data.service_type){
        case "ENTIRE_HOME":
          return ' دربست ';
        case "PRIVATE_ROOM":
          return ' اتاق اختصاصی';
        case "SHARED_ROOM":
          return ' اتاق مشترک';
        default :
          return null;
      }
    }
    renderRelevantRoom(data){
      switch(data.type){
        case 'room':{
          return(
              <p className="bookmark-item-type"> {this.getRoomType(data)} {this.getServiceType(data)}</p>
          );
        }
        case 'ecotourism':{
          return(
              <p className="bookmark-item-type"> اقامتگاه بوم‌گردی</p>
          );
        }
      }
    }
  renderUserProfileEditSectionVersion2(){
    return(
      <div className={this.state.selectedPanel==='edit-profile'?"user-panel-section-edit-profile-version":"user-panel-section-bookmark-version"}>
        <div className="user-panel-section-header">
          <div onClick={()=>{this.setState({selectedPanel:"bookmark-list"});this.getBookmarkListFromServer()}} className={this.state.selectedPanel==="bookmark-list"? "user-panel-section-header-button-selected":"user-panel-section-header-button"}>
            <p className="user-panel-section-header-title">
              لیست علاقه‌مندی‌ها
            </p>
          </div>
          <div className="user-panel-section-vertical-line"></div>
          <div onClick={()=>{this.setState({selectedPanel:"edit-profile"})}} className={this.state.selectedPanel==="edit-profile"? "user-panel-section-header-button-selected":"user-panel-section-header-button"}>
            <p className="user-panel-section-header-title">
              ویرایش پروفایل
            </p>
          </div>
        </div>
        {this.renderRelevantPanel()}
      </div>
    );
  }
  render(){
    return(
      <div className="user-profile-main-division">
        {this.renderUploadPhotoModal()}
        {this.renderUserProfileDetailsSection()}
        {this.renderUserProfileEditSectionVersion2()}
        {this.renderPassConfirmationModal()}

      </div>
    );
  }
}

export default UserProfileXl;
