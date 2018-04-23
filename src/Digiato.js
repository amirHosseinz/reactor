import React from 'react';
import {Redirect} from 'react-router-dom';
import MetaTags from 'react-meta-tags';
import ReactGA from 'react-ga';
ReactGA.initialize('UA-115538071-1');
ReactGA.pageview(window.location.pathname);


class Digiato extends React.Component {
  render() {
    ReactGA.event({category: 'User',action: 'visited website from Digiato'});
    return (
      <div className="visible-xs hidden-xl">
        <MetaTags>
          <meta name="googlebot" content="noindex" />
        </MetaTags>
        <Redirect to="/" push={false}/>
      </div>
    );
  }
}

export default Digiato;
