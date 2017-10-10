import React, {Component} from 'react';
import '../css/EditorPage.css';

import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';
import FlatButton from 'material-ui/FlatButton';


class EventInfo extends Component {

  state = {
    value: null,
  };

  handleChange = (event, index, value) => {
    this.setState({value});
  }

  renderInputField = () => {
    if (!this.state.value) return null;
    return <TextField hintText="Add..." floatingLabelText="Add..." fullWidth={true}/>
  }

  render() {
    return (
      <div className="EventInfoContainer">
        <Paper className="InputInfo" zDepth={3}>
          <TextField hintText="MM:SS" floatingLabelText="Time for event to start" fullWidth={true}/><br />
          <TextField hintText="Event Title" floatingLabelText="Event Title" style={{ fontSize: '24px' }}  fullWidth={true}/><br />
          <TextField hintText="Date & Time (optional)" floatingLabelText="Date & Time" fullWidth={true}/><br />
          <TextField hintText="Map Location" floatingLabelText="Map Location" fullWidth={true}/><br />
          <Divider style={{
            width: '112%',
            marginLeft: -30,
            marginTop: 60,
          }} />
          <SelectField
          floatingLabelText="Attachment"
          value={this.state.value}
          onChange={this.handleChange}
          fullWidth={true}>
          <MenuItem value={1} primaryText="Text" />
          <MenuItem value={2} primaryText="Image URL" />
          <MenuItem value={3} primaryText="Video URL" />
          <MenuItem value={4} primaryText="Audio URL" />
        </SelectField>
        <br />
        {this.renderInputField()}
        <FlatButton className="AddAttachment" label="+ Add Another Attachment" primary={true} />
        </Paper>
      </div>
    );
  }
}

export default EventInfo;
