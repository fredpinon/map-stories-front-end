import React, {Component} from 'react';
import '../css/EventInfoContainer.css';
import Paper from 'material-ui/Paper';

class EventInfo extends Component {

  render() {
    const style = {
      height: 950,
      width: 550,
      margin: 40,
      textAlign: 'center',
      display: 'inline-block',
    };
    return (
      <div className="EventInfoContainer">
        <Paper style={style} zDepth={3} />
      </div>
    );
  }
}

export default EventInfo;
