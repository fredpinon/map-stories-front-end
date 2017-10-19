import React, {Component} from 'react';
import '../css/TimeLine.css';

import { Slider } from 'antd';
import 'antd/dist/antd.css';

import { connect } from 'react-redux';
import { timer } from '../actions';

class TimeLine extends Component {

  componentDidMount() {
    this.timeLine();
  }

  constructor(props) {
    super(props);

    if(props.events && props.events.length > 0 && typeof props.events[0] === 'object') {
      const times = props.events.map(event => event.startTime);
      const calcMarks = this.calcMarks(times);
      const maxValue = Math.max(...Object.keys(calcMarks))

      this.state = {
        play: this.props.autoplay,
        timeStamp: 0,
        calcMarks,
        maxValue
      };
    }
    else {
      this.state = {
        play: this.props.autoplay,
        timeStamp: 0,
        calcMarks: {},
        maxValue: 0,
      };
    }

    this.passedEvents = []
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.events !== this.props.events) {
      const times = nextProps.events.map(event => event.startTime);
      const calcMarks = this.calcMarks(times);
      const maxValue = Math.max(...Object.keys(calcMarks))
      this.setState({
        calcMarks,
        maxValue
      });
    }
  }

  calcMarks = (timestamps) => {
    if (!timestamps) return {};

    console.log(timestamps);
    const arr = timestamps.map(x => {
      let y = x.split(':');
      return y.length > 2
        ? (parseInt(y[0]) * 3600 + parseInt(y[1]) * 60 + parseInt(y[2])) * 1000
        : (parseInt(y[0]) * 60 + parseInt(y[1])) * 1000;
    });

    return arr.reduce((accum, el, i) => {
      accum[el] = timestamps[i];
      return accum;
    }, {});
  }

  timeLine = () => {
    const intervalTime = 10;
    setInterval(
      () => {
        if (this.state.play && this.state.maxValue) {
            let increment = this.state.timeStamp + intervalTime;
            if (increment > this.state.maxValue) {
              increment = this.state.maxValue;
              this.pause();
            }
            this.setState({timeStamp: increment})
            this.handleTime();
        }
      }, intervalTime);
  }

  play = () => {
    if (this.state.timeStamp < this.state.maxValue) {
      this.setState({play: true});
    }
  }

  pause = () => {
    this.setState({play: false});
  }

  renderPlay() {
    if (!this.state.play) {
      return (
        <div>
          <i id="play" className="material-icons md-36 purple" onClick={this.play}>play_circle_filled</i>
        </div>
      )
    }
    else {
      return (
        <div>
          <i id="pause" className="material-icons md-36 purple" onClick={this.pause}>pause_circle_filled</i>
        </div>
      )
    }
  }

  rewind = () => {
    const marks = Object.keys(this.state.calcMarks[0])
    const points = [];
    marks.forEach(x => {
      if (x < this.state.timeStamp) {
        points.push(parseInt(x))
      }
    })
    if (this.state.timeStamp > 1) {
      this.setState({timeStamp: Math.max( ...points)})
    }
  }

  forward = () => {
    const marks = Object.keys(this.state.calcMarks[0])
    const points = [];
    marks.forEach(x => {
      if (x > this.state.timeStamp + 1) {
        points.push(parseInt(x))
      }
    })
    if (this.state.timeStamp < 99) {
      this.setState({timeStamp: Math.min( ...points)})
    }
  }

  handleTime() {
    let eventTime = []
    const currentTime = this.state.timeStamp;
    const passedEvents = Object.keys(this.state.calcMarks)
    .map(mark => parseInt(mark))
    .filter(mark => mark <= currentTime);
    if (passedEvents.length !== this.passedEvents.length) {
      this.passedEvents = passedEvents.sort((a,b) => b-a);
      this.props.match(this.state.calcMarks[this.passedEvents[0]]);
    }
  }

  handleChange = (event) => {
    this.setState({timeStamp: event});

  }

  render() {
    if (!this.state.calcMarks) return null;

    return (
      <div className="TimeLine">

        <div className="controls">
          <i id="forward" className="material-icons md-36 purple" onClick={this.rewind}>fast_rewind</i>
          { this.renderPlay() }
          <i id="backward" className="material-icons md-36 purple" onClick={this.forward}>fast_forward</i>
        </div>

        <div className="Slider">
          <Slider
            marks={this.state.calcMarks}
            value={this.state.timeStamp}
            onChange={this.handleChange}
            max={this.state.maxValue}
          />
        </div>
      </div>
      );
  }
}


export default TimeLine;
