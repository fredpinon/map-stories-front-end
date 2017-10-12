import React, {Component} from 'react';
import '../css/EditorPage.css';
import { editStory } from '../actions';
import { connect } from 'react-redux';

import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';
import FlatButton from 'material-ui/FlatButton';


class EventInfo extends Component {
  constructor () {
    super()
    this.event = {
      startTime: '',
      title: '',
      dateTime: '',
      location: '',
      attachments: []
    }
  }

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
    console.log(this.event.title.input.value);
  }

  saveEvent = () => {
  const eventInfo = {}

  this.props.onEventSave(eventInfo)
  }

  render() {
    const attachments = this.state.attachments.map((el, index) => {
    let attachmentType = '';
    let attachmentInfo = '';
      return (
        <div className="AddAttachment" key={index}>
          <SelectField
          floatingLabelText="Attachment"
          value={el.type}
          onChange={(event, i, value) => this.selectType(index, value)}
          placeholder='Select a type'
          fullWidth={true}
          ref={input => attachmentType = input}>
            <MenuItem value={''} primaryText="" />
            <MenuItem value={'text'} primaryText="Text" />
            <MenuItem value={'link'} primaryText="Link" />
            <MenuItem value={'image'} primaryText="Image" />
            <MenuItem value={'video'} primaryText="Video" />
            <MenuItem value={'audio'} primaryText="Audio" />
            <MenuItem value={'tweet'} primaryText="Tweet" />
          </SelectField>
          <br />
          <TextField
          hintText="Add text, URL or upload file"
          floatingLabelText="Add..."
          fullWidth={true}
          ref={input => attachmentInfo = input}
          />
          <Divider style={{
            width: '112%',
            marginLeft: -30,
            marginTop: 60,
          }} />
        </div>
      )
    })

    const style = {marginTop: 50}

    const style2 = {
      marginTop: 50,
      float: 'right'
    }

    const headerStyle={
      color: "grey",
    }

    return (
      <div className="EventInfoContainer">
        <Paper className="InputHeader" style={headerStyle} zDepth={5}>ADD EVENT</Paper>
        <Paper className="InputInfo" zDepth={3}>
          <TextField hintText="MM:SS" floatingLabelText="Time for event to start" fullWidth={true} ref={input => this.event.startTime = input}/><br />
          <TextField hintText="Event Title" floatingLabelText="Event Title" style={{ fontSize: '24px' }}  fullWidth={true} ref={input => this.event.title = input}/><br />
          <TextField hintText="Date & Time (optional)" floatingLabelText="Date & Time" fullWidth={true} ref={input => this.event.dateTime = input}/><br />
          <TextField hintText="Map Location" floatingLabelText="Map Location" fullWidth={true} ref={input => this.event.location = input}/><br />
          <Divider style={{
            width: '112%',
            marginLeft: -30,
            marginTop: 60,
          }} />
          {attachments}
          <FlatButton className="AddAttachment" label="+ Add Attachment" primary={true} style={style} onClick={this.addAttachment}/>
          <Divider style={{
            width: '112%',
            marginLeft: -30,
            marginTop: 60,
          }} />
          <FlatButton className="Delete" label="Delete" primary={true} style={style2} onClick={this.deleteEvent}/>
          <FlatButton className="Save" label="Save" primary={true} style={style2} onClick={this.saveEvent}/>
        </Paper>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  // id: ownProps.computedMatch.params.storyId
  // story: state.entities.stories[ownProps.computedMatch.params.storyId],
});

const mapDispatchToProps = (dispatch) => ({
  editStory: (data) => dispatch(editStory(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(EventInfo);
