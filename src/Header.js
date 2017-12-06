import React from 'react';

class Header extends React.Component{

  constructor (props) {
    super(props);
  }

  render()
  {
    return (
      <div class='header'>
        <div class='headerchild' >
          <div class='logodiv'>
             <a href="www.tryppin.com"><img src="http://svgshare.com/i/4C0.svg" className="LogoImage"></img></a>
          </div>
          <div>
            <a class='logolink' href="www.tryppin.com">  <p className='logofont'>تریپین</p></a>
          </div>
        </div>
      </div>
    );
  }
}


export default Header;
