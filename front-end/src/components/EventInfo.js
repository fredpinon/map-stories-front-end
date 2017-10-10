import React, {Component} from 'react';
import '../css/EditorPage.css';

import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';

class EventInfo extends Component {

  render() {
    const style = {
      height: 950,
      width: 550,
      margin: 40,
      textAlign: 'center',
    };
    return (
      <div className="EventInfoContainer">
        <Paper style={style} zDepth={3}>
          <TextField hintText="MM:SS" floatingLabelText="Time for event to start"/><br />
          <TextField hintText="Title" floatingLabelText="Title"/><br />
          <TextField hintText="Location (optional)" floatingLabelText="Location"/><br />
          <TextField hintText="Description" floatingLabelText="Description" multiline={true} rows={3} rowsMax={4} wrap={true}/><br />
          <TextField hintText="Tweet (optional)" floatingLabelText="Tweet"/><br />
          <TextField hintText="Image URL (optional)" floatingLabelText="Image URL"/><br />
          <TextField hintText="YouTube URL (optional)" floatingLabelText="YouTubeURL"/><br />
        </Paper>
      </div>
    );
  }
}

export default EventInfo;
