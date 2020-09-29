import React, { Component } from "react";

// Components
import CarouselLeftArrow from "./CarouselLeftArrow";
import CarouselRightArrow from "./CarouselRightArrow";
import CarouselIndicator from "./CarouselIndicator";
import CarouselSlide from "./CarouselSlide";
import Swiper from "./Swiper";
//Carousel component

class Carousel extends Component {
  constructor(props) {
    super(props);

    this.goToSlide = this.goToSlide.bind(this);
    this.goToPrevSlide = this.goToPrevSlide.bind(this);
    this.goToNextSlide = this.goToNextSlide.bind(this);

    this.state = {
      activeIndex: 0,
    };
  }

  // Arrow functionality

  goToSlide(index) {
    this.setState({
      activeIndex: index,
    });
  }

  goToPrevSlide() {
    let index = this.state.activeIndex;
    let { slides } = this.props;
    let slidesLength = slides.length;

    if (index < 1) {
      index = slidesLength;
    }

    --index;

    this.setState({
      activeIndex: index,
    });
  }

  goToNextSlide() {
    let index = this.state.activeIndex;
    let { slides } = this.props;
    let slidesLength = slides.length - 1;

    if (index === slidesLength) {
      index = -1;
    }

    ++index;

    this.setState({
      activeIndex: index,
    });
  }

  preventDragHandler = (e) => {
    e.preventDefault();
  };

  render() {
    return (
      <div className="carousel">
        <CarouselLeftArrow onClick={(e) => this.goToPrevSlide(e)} />
        <Swiper
          onSwipeRight={this.goToNextSlide}
          onSwipeLeft={this.goToPrevSlide}
        >
          <ul className="carousel__slides">
            {this.props.slides.map((slide, index) => (
              <CarouselSlide
                key={index}
                index={index}
                activeIndex={this.state.activeIndex}
                slide={slide}
              />
            ))}
          </ul>
        </Swiper>
        <CarouselRightArrow onClick={(e) => this.goToNextSlide(e)} />

        <ul className="carousel__indicators">
          {this.props.slides.map((slide, index) => (
            <CarouselIndicator
              key={index}
              index={index}
              activeIndex={this.state.activeIndex}
              onClick={(e) => this.goToSlide(index)}
            />
          ))}
        </ul>
      </div>
    );
  }
}

export default Carousel;
