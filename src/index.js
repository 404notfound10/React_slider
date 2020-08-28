import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import './css/styles.scss';

// Components
import CarouselLeftArrow from './components/CarouselLeftArrow';
import CarouselRightArrow from './components/CarouselRightArrow';
import CarouselIndicator from './components/CarouselIndicator';
import CarouselSlide from './components/CarouselSlide';
import CarouselData from './components/CarouselData';

//Carousel component

class Carousel extends Component {
  
  constructor(props) {
    super(props);

    this.goToSlide = this.goToSlide.bind(this);
    this.goToPrevSlide = this.goToPrevSlide.bind(this);
    this.goToNextSlide = this.goToNextSlide.bind(this);

    this.state = {
      activeIndex: 0
    };
  }

  // Arrow functionality 

  goToSlide(index) {
    this.setState({
      activeIndex: index
    });
  }

  goToPrevSlide(e) {
    e.preventDefault();

    let index = this.state.activeIndex;
    let { slides } = this.props;
    let slidesLength = slides.length;

    if (index < 1) {
      index = slidesLength;
    }

    --index;

    this.setState({
      activeIndex: index
    });
  }

  goToNextSlide(e) {
    e.preventDefault();

    let index = this.state.activeIndex;
    let { slides } = this.props;
    let slidesLength = slides.length - 1;

    if (index === slidesLength) {
      index = -1;
    }

    ++index;

    this.setState({
      activeIndex: index
    });
  }

  render() 
  {
    return (

      <div className="carousel">
        <CarouselLeftArrow onClick={e => this.goToPrevSlide(e)} />

        <ul className="carousel__slides">
          {this.props.slides.map((slide, index) =>
            <CarouselSlide
              key={index}
              index={index}
              activeIndex={this.state.activeIndex}
              slide={slide}
           />
          )}
        </ul>

        <CarouselRightArrow onClick={e => this.goToNextSlide(e)} />

        <ul className="carousel__indicators">
          {this.props.slides.map((slide, index) =>
            <CarouselIndicator
              key={index}
              index={index}
              activeIndex={this.state.activeIndex}
              onClick={e => this.goToSlide(index)}
            />
          )}
        </ul>
      </div>
    );
  }
}

ReactDOM.render(
  <Carousel slides={CarouselData} />,
  document.querySelector(".carousel-container")
);