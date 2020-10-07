import React, { Component } from "react";
import Carousel from "./Carousel";
import "../css/styles.scss";
//Carousel slide content
//Image component
import firstImage from "../img/1.jpg";
import secondImage from "../img/2.jpg";
import thirdImage from "../img/3.jpg";
import fourthImage from "../img/4.jpg";

class App extends Component {
  render() {
    return (
      <div>
        <Carousel>
          <img className="carousel-slides__image " src={firstImage} />
          <img className="carousel-slides__image " src={secondImage} />
          <img className="carousel-slides__image " src={thirdImage} />
          <div>
            <img className="carousel-slides__image " src={fourthImage} />
            <p>Text</p>
          </div>
        </Carousel>
      </div>
    );
  }
}

export default App;
