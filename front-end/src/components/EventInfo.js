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
    attachments: []
  };

  selectType = (index, value) => {
    const attachments = this.state.attachments.slice();
    attachments.splice(index, 1, {
      ...this.state.attachments[index],
      type: value
    });
    this.setState({
      attachments
    });
  }

  addAttachment = () => {
    this.setState({
      attachments: this.state.attachments.concat([{
        type: ''
      }])
    })
  }

  render() {

    const attachments = this.state.attachments.map((el, index) => {
      return (
        <div className="AddAttachment" key={index}>
          <SelectField
          floatingLabelText="Attachment"
          value={el.type}
          onChange={(event, i, value) => this.selectType(index, value)}
          placeholder='Select a type'
          fullWidth={true}>
            <MenuItem value={''} primaryText="" />
            <MenuItem value={'text'} primaryText="Text" />
            <MenuItem value={'image'} primaryText="Image URL" />
            <MenuItem value={'video'} primaryText="Video URL" />
            <MenuItem value={'audio'} primaryText="Audio URL" />
          </SelectField>
          <br />
          <TextField hintText="Add text, URL or upload file" floatingLabelText="Add..." fullWidth={true}/>
        </div>
      )
    })

    const style = {marginTop: 50}

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
          {attachments}
          <FlatButton className="AddAttachment" label="+ Add Attachment" primary={true} style={style} onClick={this.addAttachment}/>
        </Paper>
      </div>
    );
  }
}

export default EventInfo;

// addAttachmentInput = (event, index, value) => {
//   this.setState({value});
// }
//
// renderInputField = () => {
//   if (!this.state.value) return null;
//   return <TextField hintText="Add text, URL or upload file" floatingLabelText="Add..." fullWidth={true}/>
// }

// addAttachment = () => {
//   console.log('hello');
//   return (
//     <div className="AddAttachment">
//       <SelectField
//         floatingLabelText="Attachment"
//         value={this.state.value}
//         onChange={this.addAttachmentInput}
//         fullWidth={true}>
//         <MenuItem value={1} primaryText="" />
//         <MenuItem value={2} primaryText="Text" />
//         <MenuItem value={3} primaryText="Image URL" />
//         <MenuItem value={4} primaryText="Video URL" />
//         <MenuItem value={5} primaryText="Audio URL" />
//       </SelectField>
//       <br />
//       {this.renderInputField()}
//     </div>
//   )
// }
