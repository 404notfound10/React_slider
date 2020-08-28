import React, { Component } from 'react';

class CarouselLeftArrow extends Component {
    render() {
      return (
        <a
          href="#"
          className="carousel__arrow carousel__arrow--left"
          onClick={this.props.onClick}
        >
          <img src={require('../img/left.png')}  alt="slide"/>
        </a>
      );
    }
  }

export default CarouselLeftArrow;