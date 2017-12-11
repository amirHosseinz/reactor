import React from 'react';
import {Carousel} from'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';


class MainCarousel extends React.Component{
render() {
 const pic=this.props.pic;
  if (pic) {
    const Car = pic.map((pic) =>
    <Carousel.Item key={pic.id}>
    <img width={1000} height={1000} alt={pic} src={"https://www.trypinn.com"+pic.image}/>
    </Carousel.Item>
    );
    return(
      <Carousel controls={false} nextLabel={'Next'}>
      {Car}
    </Carousel>
    );
  } else {
    return null;
  }
}
}
export default MainCarousel;
