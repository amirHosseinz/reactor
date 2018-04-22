import React from 'react';
import {Redirect} from 'react-router-dom';
import MetaTags from 'react-meta-tags';


class Social extends React.Component {
  render() {
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
