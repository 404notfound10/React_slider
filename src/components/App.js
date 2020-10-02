import React, { Component } from "react";
import Carousel from "./Carousel";
import firstImage from "../img/1.jpg";
import secondImage from "../img/2.jpg";
import thirdImage from "../img/3.jpg";
import fourthImage from "../img/4.jpg";

class App extends Component {
  render() {
    return (
      <div>
        <Carousel>
          <img src={firstImage} />
          <img src={secondImage} />
          <img src={thirdImage} />
          <div>
            {" "}
            <p>Text</p>
            <img src={fourthImage} />
          </div>
        </Carousel>
      </div>
    );
  }
}

export default App;
