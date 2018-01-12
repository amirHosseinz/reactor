import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import ReactStars from 'react-stars'

class MainStarRating extends React.Component{
  render() {
    return (
      <div className="rating">
      <ReactStars
        count={5}
        size={18}
        value={this.props.value}
        edit={false}
        color2={'#ffd700'} />
      </div>
    );
  }
}

export default MainStarRating;
