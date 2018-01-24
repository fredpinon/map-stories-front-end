import React, {Component} from 'react';
import CircularProgress from 'material-ui/CircularProgress';
import '../css/Loader.css';

class Loader extends Component {
  render() {
    return (
      <div className="Loader">
        <CircularProgress />
        <p>{this.props.text}</p>
      </div>
    );
  }
}

export default Loader;
