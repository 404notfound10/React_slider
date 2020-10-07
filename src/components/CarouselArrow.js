import React, { Component } from "react";

export default class CarouselArrow extends Component {
  render() {
    const { direction, onClick } = this.props;
    return (
      <div className="carousel__arrow">
        <img
          src={require("../img/arrow.png")}
          className={
            direction == "left"
              ? "carousel__arrow carousel__arrow--left"
              : "carousel__arrow carousel__arrow--right"
          }
          onClick={onClick}
        />
      </div>
    );
  }
}
