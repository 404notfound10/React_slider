import React, { Component } from 'react';

class CarouselIndicator extends Component {
    render() {
      return (
        <li>
          <a
            className={
              this.props.index == this.props.activeIndex
                ? "carousel__indicator carousel__indicator--active"
                : "carousel__indicator"
            }
            onClick={this.props.onClick}
          />
        </li>
      );
    }
  }

export default CarouselIndicator;