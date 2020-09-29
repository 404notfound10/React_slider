import React, { Component } from "react";

// Component for carousel slide
class CarouselSlide extends Component {
  render() {
    return (
      <div className="carousel-item">
        <div>
          <li
            className={
              this.props.index == this.props.activeIndex
                ? "carousel__slide carousel__slide--active"
                : "carousel__slide"
            }
          >
            <img
              className="carousel-slide__image"
              src={this.props.slide.image}
            />
            <p className="carousel-slide__content">
              {this.props.slide.content}
            </p>
            <p>
              <strong className="carousel-slide__author">
                {this.props.slide.author}
              </strong>
              ,{" "}
              <small className="carousel-slide__source">
                {this.props.slide.source}
              </small>
            </p>
          </li>
        </div>
      </div>
    );
  }
}
export default CarouselSlide;
