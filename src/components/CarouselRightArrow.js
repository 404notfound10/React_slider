import React, { Component } from 'react';

class CarouselRightArrow extends Component {
    render() {
      return (
        <a
          href="#"
          className="carousel__arrow carousel__arrow--right"
          onClick={this.props.onClick}
        >
          <img src={require('../img/right.png')}  alt="slide"/>
        </a>
      );
    }
  }

export default CarouselRightArrow;