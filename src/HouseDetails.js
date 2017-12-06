import React from 'react';

class HouseDetails extends React.Component {
  constructor(props){
    super(props);
  }
  render() {
    return(
      <div>
        {this.props.setHouseDetail()}
      </div>
    );
  }
}
export default HouseDetails;
