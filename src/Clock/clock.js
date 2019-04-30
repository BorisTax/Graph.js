import React from 'react';
import './clock.css';

export default class Clock extends React.Component{
  constructor (){
    super();
    this.state={clock:0};
  }
  componentDidMount(){
    this.setState({clock:setInterval(this.tick.bind(this),1000)});
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
    <div id="main_clock" className="clock"/>
    <div id="hour_clock_hand" style={{transform: hour_rotate}} className="clock"/>
    <div id="minute_clock_hand" style={{transform: minute_rotate}} className="clock"/>
    <div id="second_clock_hand"  style={{transform: second_rotate}} className="clock"/>
    </div>
  }
}
