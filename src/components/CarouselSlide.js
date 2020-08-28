import React, { Component } from 'react';

  
  
  // Component for carousel slide
  class CarouselSlide extends Component {
    
  // variables for mobile swipe function
      slideElement;
      dragStartX = 0;
      left = 0;
      dragged = false;
      constructor(props) {
       super(props);
       this.slideElement = null;
    
       this.onMouseMove = this.onMouseMove.bind(this);
       this.onTouchMove = this.onTouchMove.bind(this);
       this.onDragStartMouse = this.onDragStartMouse.bind(this);
       this.onDragStartTouch = this.onDragStartTouch.bind(this);
       this.onDragEndMouse = this.onDragEndMouse.bind(this);
       this.onDragEndTouch = this.onDragEndTouch.bind(this);
       this.onDragEnd = this.onDragEnd.bind(this);
       this.updatePosition = this.updatePosition.bind(this);
       this.onSwiped= this.onSwiped.bind(this);
     }
  
  
   // mobile functionality 
  
   componentDidMount() {
     window.addEventListener("mouseup", this.onDragEndMouse);
     window.addEventListener("touchend", this.onDragEndTouch);
   }
  
   componentWillUnmount() {
     window.removeEventListener("mouseup", this.onDragEndMouse);
     window.removeEventListener("touchend", this.onDragEndTouch);
   }
  
   onDragStartMouse(e) {
     this.onDragStart(e.clientX);
     window.addEventListener("mousemove", this.onMouseMove);
   }
  
   onDragStartTouch(e) {
     const touch = e.targetTouches[0];
     this.onDragStart(touch.clientX);
     window.addEventListener("touchmove", this.onTouchMove);
   }
  
   onDragStart(clientX) {
     this.dragged = true;
     this.dragStartX = clientX;
     this.slideElement.className = "carousel__slide--active";
     requestAnimationFrame(this.updatePosition);
   }
   onMouseMove(e) {
     const left = e.clientX - this.dragStartX;
     if (left < 0) {
       this.left = left;
     }
   }
  
   onTouchMove(e) {
     const touch = e.targetTouches[0];
     const left = touch.clientX - this.dragStartX;
     if (left < 0) {
       this.left = left;
     }
   }
   onDragEndMouse(e) {
     window.removeEventListener("mousemove", this.onMouseMove);
     this.onDragEnd();
   }
  
   onDragEndTouch(e) {
     window.removeEventListener("touchmove", this.onTouchMove);
     this.onDragEnd();
   }
   onDragEnd() {
     if (this.dragged) {
       this.dragged = false;
  
       const threshold = this.props.threshold || 0.3;
  
       if (this.left < this.slideElement.offsetWidth * threshold * -1) {
         this.left = -this.slideElement.offsetWidth * 2;
         this.onSwiped();
       } else {
         this.left = 0;
       }
       this.slideElement.className = "carousel__slide--swipe";
  
       this.slideElement.style.transform = `translateX(${this.left}px)`;
     }
   }
   onSwiped() {
     if (this.props.onSwipe) {
       this.props.onSwipe();
     }
   }
   updatePosition() {
     if (this.dragged) requestAnimationFrame(this.updatePosition);
  
     const now = Date.now();
     const elapsed = now - this.startTime;
  
     if (this.dragged && elapsed > this.fpsInterval) {
       this.slideElement.style.transform = `translateX(${this.left}px)`;
  
       const opacity = (Math.abs(this.left) / 100).toFixed(2);
       if (opacity < 1 && opacity.toString() !== this.background.style.opacity) {
         this.background.style.opacity = opacity.toString();
       }
       if (opacity >= 1) {
         this.background.style.opacity = "1";
       }
  
       this.startTime = Date.now();
     }
   }
  
  
    render() {
      return (
        
         <div className='carousel-item'
         ref={div => (this.slideElement = div)}
         onMouseDown={this.onDragStartMouse}
         onTouchStart={this.onDragStartTouch}
         onSwipe={this.onSwiped}
         >
        <div>
        <li
          className={
            this.props.index == this.props.activeIndex
              ? "carousel__slide carousel__slide--active"
              : "carousel__slide"
          }
        >
          <img 
          className ="carousel-slide__image" 
          src={this.props.slide.image}
          />
          
          <p className="carousel-slide__content">{this.props.slide.content}</p>
  
          <p>
            <strong className="carousel-slide__author">
              {this.props.slide.author}
            </strong>,
            {" "}
            <small className="carousel-slide__source">
              {this.props.slide.source}
            </small>
          </p>
        </li>
        </div>
        </div>
      );
    }
  }

export default CarouselSlide;