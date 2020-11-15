import React, { Component, useState } from "react";
import "../styles/App.css";
class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.offset = new Date(-1*(5*60*1000*60+30*60*1000)).valueOf();
    this.state = {
      time: 0,
      x: 0,
      y: 0,
      timerStr: "00:00:00",
      ballStyle: { top: "0px", left: "0px" },
    };
    this.timerUpdate = this.timerUpdate.bind(this);
    this.startButton = this.startButton.bind(this);
    this.keyPressed = this.keyPressed.bind(this);
  }
  componentDidMount() {}

  componentWillUnmount() {
    clearInterval(this.state.timerId);
    window.removeEventListener("keydown", this.keyPressed);
  }
  startButton() {
    let time = new Date().valueOf();
    let timerId = setInterval(this.timerUpdate, 1 * 999);
    window.addEventListener("keydown", this.keyPressed);
    this.setState({
      time: time,
      timerId: timerId,
    });
  }
  timerUpdate() {
    
    let nt = new Date((new Date().getTime()) - this.state.time + this.offset);
    let [hours,minutes,seconds] = [nt.getHours(),nt.getMinutes(),nt.getSeconds()].map((x)=>(x+"").padStart(2,0))
    let timerStr = `${hours}:${minutes}:${seconds}`;
    this.setState({
      timerStr: timerStr,
    });
  }

  keyPressed({key}) {
    let tempX = this.state.x,
      tempY = this.state.y,
      ALLOWED_KEYS = {
        ArrowUp: () => (tempY = tempY - 5),
        ArrowDown: () => (tempY = tempY + 5),
        ArrowLeft: () => (tempX = tempX - 5),
        ArrowRight: () => (tempX = tempX + 5),
      };

    key in ALLOWED_KEYS && ALLOWED_KEYS[key]();
    let ballStyle = { top: tempY + "px", left: tempX + "px" };
    this.setState({
      x: tempX,
      y: tempY,
      ballStyle: ballStyle,
    });
    tempX == 250 &&
      tempY == 250 &&
      (clearInterval(this.state.timerId) ||
        window.removeEventListener("keydown", this.keyPressed));
  }
  
  render() {
    return (
      <>
        <div className="ball" style={this.state.ballStyle}></div>
        <h3>Hello</h3>
        <button className="start ballProvider" onClick={this.startButton}>
          Start
        </button>
        <div className="heading-timer">{this.state.timerStr}</div>
        <div className="hole"></div>
      </>
    );
  }
}

export default Timer;
