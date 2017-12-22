import React from 'react';
import Login from './Login.js';
import Modal from 'react-modal';
// import UserPanel from './UserPanel.js';
class Header extends React.Component{
  constructor (props) {
    super(props);
    this.state={
      token: null,
      reloadPage: false,
      isLoggedIn : localStorage['isLoggedIn'],
      loginPanelVisible:false,
      loginPanelVisible2:false,
      hasPassword: null,
      searchParams:{
        phoneNumber: null,
      },
    };
  }
  componentDidMount(){
    this.interval = setInterval(() => this.reloadHeader(), 1000);
  }
  reloadHeader(){
    if (this.state.isLoggedIn!== localStorage['isLoggedIn']){
      this.setState({isLoggedIn:localStorage['isLoggedIn']});
    }
  }
  getUserHasPassword(){
    this.setToken();
  }
  getRelevantToken(){
    console.log(localStorage['isLoggedIn']);
    console.log(localStorage['isLoggedIn']);
    if (localStorage['isLoggedIn']==='true'){
      this.setState({token:localStorage['token']},()=>{this.setSearchParams()});
    }
    else{
      this.setState({token:localStorage['token']},()=>{this.setSearchParams()});
    }
  }
  setToken(){
    this.getRelevantToken();
  }
  setSearchParams(){
    var spar = {phoneNumber : document.getElementById("tel-number").value};
    this.setState({searchParams:spar},()=>{this.getDataFromServer()})
  }
    getDataFromServer(){
      var request = new Request('https://www.trypinn.com/auth/api/user/check_account/', {
        method: 'POST',
        body: JSON.stringify({
          cell_phone : this.state.searchParams.phoneNumber,

      }),
        headers: new Headers({'Accept': 'application/json','Content-Type': 'application/json',
        'Authorization': 'Token '+this.state.token,})
      });
     fetch(request)
     .then((response) => {
       return response.json();
     })
     .then((loginStatus) => {
       this.setState({loginPanelVisible2 : true});
       this.setState({loginPanelVisible: false});
       localStorage['phone-number'] = this.state.searchParams.phoneNumber;
       this.setState({hasPassword: loginStatus.has_pass});
     });
  }
  renderLoginButton(){
    if (this.state.isLoggedIn==='false' || this.state.isLoggedIn===undefined){
      return(
        <div>
          <button onClick={this.handleLoginButton.bind(this)}>Login</button>
        </div>
      );
    }
  }
  handleSignOutButton(){
    localStorage['token']='';
    localStorage['isLoggedIn']='false';
    console.log(this.state.isLoggedIn);
    window.location.reload(true);
  }
  renderUserButton(){
    if (this.state.isLoggedIn==='true'){
      return(
        <div>
          <button onClick={this.handleUserButton.bind(this)}>Panel</button>
          <button onClick={this.handleSignOutButton.bind(this)}>Sign Out</button>
        </div>
      );
    }
  }
  handleLoginButton(){
    this.setState({loginPanelVisible:true});
  }
  handleUserButton(){
    if (window.location.pathname !== '/dashboard'){
      window.open('/dashboard');
    }
    else {
      window.location.href = '/dashboard';
    }
  }
  renderLoginPanel(){
    return(
      <div>
        <Modal isOpen={this.state.loginPanelVisible}
          ariaHideApp={false}
        onRequestClose={()=>{this.setState({loginPanelVisible:false})}}>
          <p> شماره تلفن همراه خود را وارد کنید </p>
          <input
            id="tel-number"
            type="text">
            </input>
            <button onClick = {this.getUserHasPassword.bind(this)}>
              ورود/ثبت نام
            </button>
        </Modal>
        <Modal isOpen={this.state.loginPanelVisible2}
          ariaHideApp={false}
          onRequestClose={()=>{this.setState({loginPanelVisible2:false})}}>
          <Login loginStatus={this.state.hasPassword} />
        </Modal>
      </div>
    );
  }
  render()
  {
    return (
      <div className='header hidden-xs visible-xl'>
        <div className='headerchild'>
          <div className='logodiv'>
             <a href="www.tryppin.com"><img src="http://svgshare.com/i/4C0.svg" className="LogoImage" alt = ''></img></a>
          </div>
          <div>
            <a className='logolink' href="www.tryppin.com">  <p className='logofont'>تریپین</p></a>
          </div>
          <div>
            {this.renderUserButton()}
          </div>
          <div>
            {this.renderLoginButton()}
          </div>
          <div>
            {this.renderLoginPanel()}
          </div>
        </div>
      <div className='header hidden-xl visible-xs'>
        <div className='headermobile'>
          <div className='jafar'>
             <a href="www.tryppin.com"><img src="http://svgshare.com/i/4C0.svg" className="LogoImage-mobile" alt=""></img></a>
             <a className='logolink' href="www.tryppin.com">  <p className='logofont-mobile'>تریپین</p></a>
          </div>
        </div>
      </div>
    </div>
    );
  }
}
export default Header;
