import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class Clock extends React.Component{
  constructor (){
    super();
    this.state={clock:0};
  }
  componentDidMount(){
    this.state.clock=setInterval(this.tick.bind(this),1000);
  }
  componentWillUnmount(){
    clearInterval(this.state.clock);
  }
  tick(){
    this.setState({clock:this.state.clock});
  }
  render(){
  var  time = new Date();
  var hour = time.getHours();
  hour = hour % 12;
  var minute = time.getMinutes();
  var second = time.getSeconds();
  var hour_angle = (hour * 60 + minute) / (12 * 60) * (360);
  var minute_angle = (minute * 6 + second/3600*360);
  var second_angle = second*6;
  var hour_rotate="rotate("+hour_angle+"deg)";
  var minute_rotate="rotate("+minute_angle+"deg)";
  var second_rotate="rotate("+second_angle+"deg)";
  var position={position:"absolute",left:(window.innerWidth - 400) / 2 + "px",top:(window.innerHeight - 400) / 2 + "px"};

    return <div id="clock" style={position}>
    <img className="clock" src="images/clock-face.png"/>
    <img id="hour_clock_hand" style={{transform: hour_rotate}} className="clock" src="images/hour-clock-hand.png"/>
    <img id="minute_clock_hand" style={{transform: minute_rotate}} className="clock" src="images/minute-clock-hand.png"/>
    <img id="second_clock_hand"  style={{transform: second_rotate}} className="clock" src="images/second-clock-hand.png"/>
    </div>
  }
}
ReactDOM.render(
<Clock />,
document.getElementById('root')
);
