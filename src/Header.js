import React from 'react';

class Header extends React.Component{

  constructor (props) {
    super(props);
  }

  render()
  {
    return (
    <div>
      <div className='header  hidden-xs visible-xl'>
        <div className='headerchild'>
          <div className='logodiv'>
             <a href="www.tryppin.com"><img src="http://svgshare.com/i/4C0.svg" className="LogoImage"></img></a>
          </div>
          <div>
            <a className='logolink' href="www.tryppin.com">  <p className='logofont'>تریپین</p></a>
          </div>
        </div>
      </div>
      <div className='header hidden-xl visible-xs'>
        <div className='headermobile'>
          <div className='jafar'>
             <a href="www.tryppin.com"><img src="http://svgshare.com/i/4C0.svg" className="LogoImage-mobile"></img></a>
             <a className='logolink' href="www.tryppin.com">  <p className='logofont-mobile'>تریپین</p></a>
          </div>
        </div>
      </div>
    </div>
    );
  }
}


export default Header;
