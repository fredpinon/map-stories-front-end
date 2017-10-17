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

  state = {
    play: true,
    timeStamps: this.props.times,
    timeStamp: 0
  }

  timeLine = () => {
    const ratio = 1 / ((Math.max(...this.calcMarks(this.state.timeStamps)[1]) ) *60 / 100)
    console.log((Math.max(...this.calcMarks(this.state.timeStamps)[1])));

    setInterval(
      () => {
        if (!this.state.play) {
            // console.log('hello');
            let increment = this.state.timeStamp + ratio;
            // console.log(this.state.timeStamp + ratio);
            if (increment > 100) {
              increment = Math.floor(increment);
              this.Pause();
            }
            this.setState({timeStamp: increment})
            // console.log(this.state.timeStamp);
        }
        this.handleTime();
      }, 1000)
  }

  Play = () => {
    if (this.state.timeStamp < 100) {
      this.setState({play: false});
    }
    // console.log(this.state.play);
  }

  Pause = () => {
    this.setState({play: true});
  }

  renderPlay() {
    if (this.state.play) {
      return (
        <div>
          <i id="play" className="material-icons md-36 purple" onClick={this.Play}>play_circle_filled</i>
        </div>
      )
    }
    else {
      return (
        <div>
          <i id="pause" className="material-icons md-36 purple" onClick={this.Pause}>pause_circle_filled</i>
        </div>
      )
    }
  }

  Rewind = () => {
    console.log('Rewind');
    const marks = Object.keys(this.calcMarks(this.state.timeStamps)[0])
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

  Forward = () => {
    console.log('Forward');

    const marks = Object.keys(this.calcMarks(this.state.timeStamps)[0])
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
    let eventTime
    let allEvents = []
    let currentTime = this.state.timeStamp/100 * Math.max(...this.calcMarks(this.state.timeStamps)[1]) * 60

    //  Math.round(
    //
    // *10)/10
    // console.log('Current time:', currentTime);

    this.props.times.forEach(x => {
      let z = x.split(':');
      z.length > 2 ? allEvents.push(parseInt(z[0]) * 60 +   parseInt(z[1]) + (parseInt(z[2])/60)) : allEvents.push(parseInt(z[0]) + (parseInt(z[1])/60))
    })

    if (currentTime > 0) {
      let passedEvents = [];
      allEvents.forEach(x => {
        if (x < currentTime/60) passedEvents.push(x)

      })
      if (passedEvents.length > 0) {
        // console.log('These are the passedEvents:', Math.max(...passedEvents));
        this.props.match(Math.max(...passedEvents))
      }
    }

  }


  calcMarks = (marks) => {
    let arr = []
    let Marks = {}
    marks.forEach(x => {
      let y = x.split(':');
      y.length > 2 ? arr.push(parseInt(y[0]) * 60 +   parseInt(y[1]) + (parseInt(y[2])/60)) : arr.push(parseInt(y[0]) + (parseInt(y[1])/60))
    })
    const ratio = 100 / Math.max(...arr);

      for (let i = 0; i < arr.length; i++) {
        Marks[arr[i] * ratio] = marks[i]
      }
    return [Marks, arr];
  }

  handleChange = (event) => {
    this.setState({timeStamp: event});

  }



  render() {
    return (
      <div className="TimeLine">

        <div className="controls">
          <i id="forward" className="material-icons md-36 purple" onClick={this.Rewind}>fast_rewind</i>
          { this.renderPlay() }
          <i id="backward" className="material-icons md-36 purple" onClick={this.Forward}>fast_forward</i>
        </div>

        <div className="Slider">
          <Slider marks={this.calcMarks(this.state.timeStamps)[0]}  value={this.state.timeStamp} onChange={this.handleChange}/>
        </div>
      </div>
      );
  }
}

const mapStateToProps = (state) => ({

});

const mapDispatchToProps = (dispatch) => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(TimeLine);
