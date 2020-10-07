import React, { Component } from "react";

// Component for carousel slide
class CarouselSlide extends Component {
  render() {
    const { index, activeIndex, slide } = this.props;
    return (
      <div
        className={
          index == activeIndex
            ? "carousel__slide carousel__slide--active"
            : "carousel__slide"
        }
      >
        {slide}
      </div>
    );
  }
}
export default CarouselSlide;
