import React, { Component } from 'react';
import Carousel from './Carousel';
import CarouselData from './CarouselData';


class App extends Component {
    render() {
        return (
            <div>
                <Carousel slides={CarouselData} />
            </div>
        );
    }
}

export default App;