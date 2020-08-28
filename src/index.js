import React from 'react';
import ReactDOM from 'react-dom';
import './css/styles.scss';

// Carousel component
import Carousel from './components/Carousel';

// Carousel slide data
import CarouselData from './components/CarouselData';



ReactDOM.render(
  <Carousel slides={CarouselData} />,
  document.querySelector(".carousel-container")
);