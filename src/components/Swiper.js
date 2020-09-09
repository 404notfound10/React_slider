import React, { Component } from 'react';

class Swiper extends Component {
    lastTouch;
    firstTouch;
  constructor(props) {
    super(props);

    this.lastTouch = 0;
    this.firstTouch = 0;

    this.handleTouchStart= this.handleTouchStart.bind(this);
    this.handleTouchMove= this.handleTouchMove.bind(this);
    this.handleTouchEnd= this.handleTouchEnd.bind(this);
    this.handleMovement= this.handleMovement.bind(this);
    
  }
  // swipe 
  handleTouchStart (e) {
    this.firstTouch = e.nativeEvent.touches[0].clientX;
  

  };
  handleTouchMove(e){
     this.lastTouch = e.nativeEvent.touches[0].clientX;
  }
  handleTouchEnd(e){

    const delta = this.lastTouch - this.firstTouch;
   this.handleMovement(delta)
   
  }
  handleMovement(delta){
    if (delta > 0 ){
        this.props.onSwipeLeft();
    } else {
        this.props.onSwipeRight();
    }
   
  }
    render() {
        return (
            <div  
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