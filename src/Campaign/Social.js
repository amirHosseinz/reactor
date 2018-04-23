import React from 'react';
import {Redirect} from 'react-router-dom';
import MetaTags from 'react-meta-tags';
import ReactGA from 'react-ga';
ReactGA.initialize('UA-115538071-1');
ReactGA.pageview(window.location.pathname);

class Social extends React.Component {
  render() {
    var Source = window.location.pathname.split('/')[window.location.pathname.split('/').length-1];
    console.log('visited website from ' + Source);
    ReactGA.event({category: 'User',action: 'visited website from ' + Source });
    return (
      <div className="visible-xs hidden-xl">
        <MetaTags>
          <meta name="googlebot" content="noindex" />
        </MetaTags>
        <Redirect to="/" push={true}/>
      </div>
    );
  }
}

export default Social;
