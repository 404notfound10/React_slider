import React, { Component } from "react";

// Component for carousel slide
class CarouselSlide extends Component {
  render() {
    const { index, key, activeIndex, slide } = this.props;
    return (
      <div
        className="carousel-item"
        className={
          index == activeIndex
            ? "carousel__slide carousel__slide--active"
            : "carousel__slide"
        }
      >
        <div>{slide}</div>
      </div>
    );
  }
}
export default CarouselSlide;
