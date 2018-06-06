import React from 'react';
import './UserProfile.css';
import {Link} from 'react-router-dom';
import Modal from 'react-modal';
import {UserProfileUploadPhotoModal} from '../Styles.js';
import Dropzone from 'react-dropzone';
import {SyncLoader , ClipLoader} from 'react-spinners';
import Fade from 'react-reveal';
import ScrollArea from 'react-scrollbar';
import {productionURL} from'../Data.js';
import BookmarkList from '../UserProfileParts/BookmarkList.js';
import EditPassword from '../UserProfileParts/EditPassword.js';
import FinanceAccount from '../UserProfileParts/FinanceAccount.js';
import EditProfile from '../UserProfileParts/EditProfile.js';
import LinkTab from '../UserProfileParts/LinkTab.js';
import {Route, Redirect} from 'react-router-dom';


class UserProfileMd extends React.Component{
  constructor(props){
    super(props);
    this.state={
      ImgHint:false,
      token:null,
      role:null,
      profileInfo:null,
      selectedPanel:'bookmark-list',
      lastName:'',
      loading:false,
      cellPhone:'',
      showUploadPhotoModal:false,
    };
  }

  componentWillMount() {
      // this.setState({token:this.getRelevantToken()},()=>{this.setSearchParams(this.getRole())});
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
    var request = new Request(productionURL + 'auth/api/user/get_info/',{ //
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
      profilePicture : "https://www.trypinn.com/" + profile.user.profile_picture,});
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

  handleChangeProfilePicture(){
    var fd = new FormData();
    fd.append('profile_picture' , this.state.profilePictureFile);
    var request = new Request(productionURL + 'auth/api/user/edit/',{
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
              <img className="user-profile-profile-picture" height="200px" width="200px" src={'https://www.trypinn.com/'+this.state.profileInfo.user.profile_picture} />
              {this.renderUploadImageHint()}
            </div>
          );
        }
      }
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
              </div>
        </div>
      );
    }
}
  handleSaveInfo(){
        this.setState({role :this.getRole(),editProfileLoading:true} ,()=>this.changeInfoOnServer());
  }


  renderUserProfileEditSectionVersion2(){
    return(
      <div className={this.state.selectedPanel==='edit-profile'?"user-panel-section-edit-profile-version-md":"user-panel-section-bookmark-version-md"}>
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


    renderLinkTab(){
      return (
        <LinkTab />
      )
    }
    // {this.renderUserProfileDetailsSection()}
    renderFinanceAccount(){
      return(
        <FinanceAccount />
      );
    }

    renderBookmark(){
      return (
        <BookmarkList />
      );
    }

    renderEditProfile() {
      return(
        <EditProfile />
      );
    }

    renderEditPassword() {
      return (
        <EditPassword />
      );
    }

  render(){
    if(localStorage['isLoggedIn']==="true"){
      return(
        <div className="user-profile-main-division">
          {this.renderLinkTab()}
          <Route exact={true} path="/profile/financeaccount" render={()=>{return(this.renderFinanceAccount())}}/>
          <Route exact={true} path="/profile/bookmarklist" render={()=>{return(this.renderBookmark())}}/>
          <Route exact={true} path="/profile/editpassword" render={()=>{return(this.renderEditPassword())}}/>
          <Route exact={true} path="/profile/editprofile" render={()=>{return(this.renderEditProfile())}}/>
        </div>
      );
    }
    else {
      return <Redirect to="/" />
    }
  }
}

export default UserProfileMd;
