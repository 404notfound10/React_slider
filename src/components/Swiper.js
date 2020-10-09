import React, { Component } from "react";

class Swiper extends Component {
  slideElement;
  dragStartX;
  dragged;

  constructor(props) {
    super(props);
    this.delta = 0;
    this.dragStartX = 0;
    this.dragged = false;
    this.slideElement = null;

    // mobile
    this.handleTouchStart = this.handleTouchStart.bind(this);
    this.handleTouchMove = this.handleTouchMove.bind(this);
    this.handleTouchEnd = this.handleTouchEnd.bind(this);

    // desktop
    this.onMouseMove = this.onMouseMove.bind(this);
    this.onDragStartMouse = this.onDragStartMouse.bind(this);
    this.onDragEndMouse = this.onDragEndMouse.bind(this);
    this.onDragEnd = this.onDragEnd.bind(this);
    this.updatePosition = this.updatePosition.bind(this);
  }

  componentDidMount() {
    window.addEventListener("mouseup", this.onDragEndMouse);
    window.addEventListener("touchend", this.handleTouchEnd);
  }

  componentWillUnmount() {
    window.removeEventListener("mouseup", this.onDragEndMouse);
    window.removeEventListener("touchend", this.handleTouchEnd);
  }

  // mobile swipe functionality
  handleTouchStart(e) {
    this.onDragStart(e.targetTouches[0].clientX);
    window.addEventListener("touchmove", this.handleTouchMove);
  }

  handleTouchEnd() {
    window.removeEventListener("touchmove", this.handleTouchMove);
    this.onDragEnd();
  }

  handleTouchMove(e) {
    this.onDragMove(e.targetTouches[0].clientX);
  }

  // desktop swipe functionality
  onDragStartMouse(evt) {
    this.onDragStart(evt.clientX);
    window.addEventListener("mousemove", this.onMouseMove);
  }

  onDragEndMouse(evt) {
    window.removeEventListener("mousemove", this.onMouseMove);
    this.onDragEnd();
  }
  onMouseMove(evt) {
    this.onDragMove(evt.clientX);
  }
  onDragStart(clientX) {
    this.delta = 0;

    this.dragged = true;
    this.dragStartX = clientX;
    this.startTime = Date.now();
    this.updatePosition();
  }

  onDragMove(clientX) {
    this.delta = clientX - this.dragStartX;
  }

  onDragEnd() {
    if (this.dragged) {
      this.dragged = false;

      const threshold = this.props.threshold || 0.3;

      if (this.delta < this.slideElement.offsetWidth * threshold * -1) {
        this.props.onSwipeLeft();
      } else if (this.delta > this.slideElement.offsetWidth * threshold) {
        this.props.onSwipeRight();
      }
      this.slideElement.style.transform = `translateX(0px)`;
    }
  }

  updatePosition() {
    if (this.dragged) requestAnimationFrame(this.updatePosition);

    const now = Date.now();
    const elapsed = now - this.startTime;

    if (this.dragged && elapsed) {
      this.slideElement.style.transform = `translateX(${this.delta}px)`;
      this.startTime = Date.now();
    }
  }

  render() {
    return (
      <div
        onClick={this.onClicked}
        ref={(div) => (this.slideElement = div)}
        onMouseDown={this.onDragStartMouse}
        onTouchStart={this.handleTouchStart}
        onTouchMove={this.handleTouchMove}
        onTouchEnd={this.handleTouchEnd}
      >
        {this.props.children}
      </div>
    );
  }
}

export default Swiper;
