import React from 'react';

class Header extends React.Component{

  constructor (props) {
    super(props);
  }

  render()
  {
    return (
      <div className='header'>
        <div className='headerchild' >
          <div className='logodiv'>
             <a href="www.tryppin.com"><img src="http://svgshare.com/i/4C0.svg" className="LogoImage"></img></a>
          </div>
          <div>
            <a className='logolink' href="www.tryppin.com">  <p className='logofont'>تریپین</p></a>
          </div>
        </div>
      </div>
    );
  }
}


export default Header;
