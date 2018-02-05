import React from 'react';
import MapRendererXl from './MapRenderer/MapRendererXl.js';
import MapRendererXs from './MapRenderer/MapRendererXs.js';
import MapRendererMd from './MapRenderer/MapRendererMd.js';
import MapRendererSm from './MapRenderer/MapRendererSm.js';
export class MapDescription extends React.Component{
  
    renderMapRendererMd(props){
      return(
        <div className="hidden-xs hidden-xl hidden-sm visible-md">
          <MapRendererMd {...props}/>
        </div>
      );
    }

    renderMapRendererSm(props){
      return(
        <div className="hidden-xs hidden-md hidden-xl visible-sm">
          <MapRendererSm {...props}/>
        </div>
      );
    }

    renderMapRendererXl(props){
      return(
        <div className="hidden-xs hidden-md hidden-sm visible-xl">
          <MapRendererXl {...props}/>
        </div>
      );
    }

    renderMapRendererXs(props){
      return(
        <div className="hidden-xl hidden-md hidden-sm visible-xs">
          <MapRendererXs {...props}/>
        </div>
      );
    }

    render(){
      return(
        <div>
          {this.renderMapRendererXl(this.props)}
          {this.renderMapRendererXs(this.props)}
          {this.renderMapRendererMd(this.props)}
          {this.renderMapRendererSm(this.props)}
        </div>
      );
    }
}

export default MapDescription;
