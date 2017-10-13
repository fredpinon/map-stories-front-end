import React, {Component} from 'react';
import '../css/TimeLine.css';

import { Slider } from 'antd';
import 'antd/dist/antd.css';

import { connect } from 'react-redux';

class TimeLine extends Component {

  componentDidMount() {
    this.timeLine();
  }

  state = {
    play: true,
    timeStamps: ['00:00','05:30', '10:30'],
    timeStamp: 0
  }

  timeLine = () => {
    const ratio = 1 / ((Math.max(...this.calcMarks(this.state.timeStamps)[1]) ) *60 / 100)

    setInterval(
      () => {
        if (!this.state.play) {
            console.log('hello');
            const increment = this.state.timeStamp + ratio;
            console.log(this.state.timeStamp + ratio);
            this.setState({timeStamp: increment})
            console.log(this.state.timeStamp);
        }
      }, 1000)
  }

  Play = () => {
    this.setState({play: false});
    console.log(this.state.play);
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
    this.setState({timeStamp: Math.max( ...points)})
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
    this.setState({timeStamp: Math.min( ...points)})
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
    console.log(this.state.timeStamp);
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
-==
const mapStateToProps = (state) => ({

});

const mapDispatchToProps = (dispatch) => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(TimeLine);
