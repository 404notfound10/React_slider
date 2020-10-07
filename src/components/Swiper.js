import React, { Component } from "react";

class Swiper extends Component {
  lastTouch;
  firstTouch;

  slideElement;
  dragStartX;
  position;
  dragged;

  constructor(props) {
    super(props);
    // mobile
    this.lastTouch = 0;
    this.firstTouch = 0;
    // desktop
    this.dragStartX = 0;
    this.position = 0;
    this.dragged = false;
    this.slideElement = null;

    // mobile
    this.handleTouchStart = this.handleTouchStart.bind(this);
    this.handleTouchMove = this.handleTouchMove.bind(this);
    this.handleTouchEnd = this.handleTouchEnd.bind(this);

    this.handleMovement = this.handleMovement.bind(this);
    // desktop
    this.onMouseMove = this.onMouseMove.bind(this);
    this.onDragStartMouse = this.onDragStartMouse.bind(this);
    this.onDragEndMouse = this.onDragEndMouse.bind(this);
    this.onDragEnd = this.onDragEnd.bind(this);
    this.updatePosition = this.updatePosition.bind(this);
    this.onSwipedLeft = this.onSwipedLeft.bind(this);
    this.onSwipedRight = this.onSwipedRight.bind(this);
  }
  // desktop swipe functionality
  componentDidMount() {
    window.addEventListener("mouseup", this.onDragEndMouse);
  }

  componentWillUnmount() {
    window.removeEventListener("mouseup", this.onDragEndMouse);
  }

  onDragStartMouse(evt) {
    this.onDragStart(evt.clientX);
    window.addEventListener("mousemove", this.onMouseMove);
  }

  onDragStart(clientX) {
    this.dragged = true;
    this.dragStartX = clientX;
    this.slideElement.className = "carousel__slide--active";
    this.startTime = Date.now();
    requestAnimationFrame(this.updatePosition);
  }

  onDragEndMouse(evt) {
    window.removeEventListener("mousemove", this.onMouseMove);
    this.onDragEnd();
  }

  onDragEnd() {
    if (this.dragged) {
      this.dragged = false;

      const threshold = this.props.threshold || 0.3;
      console.log(this.right);
      console.log(this.slideElement.offsetWidth * threshold);
      console.log(this.slideElement.offsetWidth * 2);
      if (this.left < this.slideElement.offsetWidth * threshold * -1) {
        this.left = -this.slideElement.offsetWidth * 2;
        this.onSwipedLeft();
        this.slideElement.className = "carousel__slide--swiped";
        this.slideElement.style.transform = `translateX(${this.left}px)`;
      } else {
        this.left = 0;
        this.slideElement.className = "carousel__slide--swiped";
        this.slideElement.style.transform = `translateX(${this.left}px)`;
      }
      if (this.right > this.slideElement.offsetWidth * threshold) {
        this.right = this.slideElement.offsetWidth * 2;
        this.onSwipedRight();
        this.slideElement.className = "carousel__slide--swiped";
        this.slideElement.style.transform = `translateX(${this.right}px)`;
      } else {
        this.right = 0;
        this.slideElement.className = "carousel__slide--swiped";
        this.slideElement.style.transform = `translateX(${this.right}px)`;
      }
    }
  }

  onMouseMove(evt) {
    const left = evt.clientX - this.dragStartX;
    const right = evt.clientX - this.dragStartX;
    if (left < 0) {
      this.left = left;
    }
    if (right > 0) {
      this.right = right;
    }
  }

  updatePosition() {
    if (this.dragged) requestAnimationFrame(this.updatePosition);

    const now = Date.now();
    const elapsed = now - this.startTime;

    if (this.dragged && elapsed && this.left < 0) {
      this.slideElement.style.transform = `translateX(${this.left}px)`;
      this.startTime = Date.now();
    }
    if (this.dragged && elapsed && this.right > 0) {
      this.slideElement.style.transform = `translateX(${this.right}px)`;
      this.startTime = Date.now();
    }
  }

  onSwipedLeft() {
    if (this.props.onMouseSwipeLeft) {
      this.props.onMouseSwipeLeft();
    }
  }
  onSwipedRight() {
    if (this.props.onMouseSwipeRight) {
      this.props.onMouseSwipeRight();
    }
  }
  // mobile swipe functionality
  handleTouchStart(e) {
    this.firstTouch = e.nativeEvent.touches[0].clientX;
  }
  handleTouchMove(e) {
    this.lastTouch = e.nativeEvent.touches[0].clientX;
  }
  handleTouchEnd(e) {
    const delta = this.lastTouch - this.firstTouch;
    this.handleMovement(delta);
  }
  handleMovement(delta) {
    if (delta > 0) {
      this.props.onSwipeLeft();
    } else {
      this.props.onSwipeRight();
    }
  }
  render() {
    return (
      // <div
      //   onTouchStart={this.handleTouchStart}
      //   onTouchMove={this.handleTouchMove}
      //   onTouchEnd={this.handleTouchEnd}
      // >
      //   {this.props.children}
      // </div>

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
