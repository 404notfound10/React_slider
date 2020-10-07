import React, { Component } from "react";

// Components
import CarouselIndicator from "./CarouselIndicator";
import CarouselSlide from "./CarouselSlide";
import Swiper from "./Swiper";
import CarouselArrow from "./CarouselArrow";
//Carousel component
class Carousel extends Component {
  constructor(props) {
    super(props);

    this.goToSlide = this.goToSlide.bind(this);
    this.goToPrevSlide = this.goToPrevSlide.bind(this);
    this.goToNextSlide = this.goToNextSlide.bind(this);
    this.slides = React.Children.toArray(this.props.children);

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
    let slidesLength = this.slides.length;

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

    let slidesLength = this.slides.length - 1;

    if (index === slidesLength) {
      index = -1;
    }

    ++index;

    this.setState({
      activeIndex: index,
    });
  }

  render() {
    return (
      <div className="carousel">
        <div className="carousel-container">
          <div className="carousel__arrow">
            <CarouselArrow
              direction="left"
              onClick={() => this.goToPrevSlide()}
            />
          </div>
          <Swiper
            onSwipeRight={this.goToNextSlide}
            onSwipeLeft={this.goToPrevSlide}
            onMouseSwipeLeft={this.goToPrevSlide}
            onMouseSwipeRight={this.goToNextSlide}
          >
            <div className="carousel-item">
              <ul className="carousel__slides">
                {this.slides.map((slide, index) => (
                  <CarouselSlide
                    key={index}
                    index={index}
                    activeIndex={this.state.activeIndex}
                    slide={slide}
                  />
                ))}
              </ul>
            </div>
          </Swiper>
          <div className="carousel__arrow">
            <CarouselArrow
              direction="right"
              onClick={() => this.goToNextSlide()}
            />
          </div>
        </div>

        <ul className="carousel__indicators">
          {this.slides.map((slide, index) => (
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
