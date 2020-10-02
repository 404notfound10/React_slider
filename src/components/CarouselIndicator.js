import React, { Component } from "react";

class CarouselIndicator extends Component {
  render() {
    const { index, activeIndex, onClick } = this.props;
    return (
      <li>
        <a
          className={
            index == activeIndex
              ? "carousel__indicator carousel__indicator--active"
              : "carousel__indicator"
          }
          onClick={onClick}
        />
      </li>
    );
  }
}

export default CarouselIndicator;
