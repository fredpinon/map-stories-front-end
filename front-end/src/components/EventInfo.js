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
    eventInfo: {

    },
    attachments: []
  };

  constructor (props) {
    super(props);
    if (props.event) {
      this.state.eventInfo = {
        title: props.event.title || '',
        startTime: props.event.startTime || '00:00',
        mapLocation: props.event.mapLocation || '',
        dateAndTime: props.event.dateAndTime || '',
      }
    }
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.event !== this.props.event) {
      this.setState({
        eventInfo: {
          title: nextProps.event.title || '',
          startTime: nextProps.event.startTime || '00:00',
          mapLocation: nextProps.event.mapLocation || '',
          dateAndTime: nextProps.event.dateAndTime || '',
        }
      })
    }
  }

  handleTextChange = (e) => {
    this.setState({
      eventInfo: {
        ...this.state.eventInfo,
        [e.target.name]: e.target.value,
      }
    })
  }

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

  saveEvent = () => {
    const eventInfo = {
      title: this.state.eventInfo.title,
      startTime: this.state.eventInfo.startTime,
      mapLocation: this.state.eventInfo.mapLocation,
      dateAndTime: this.state.eventInfo.dateAndTime,
    }
    if (this.props.event.id) eventInfo.id = this.props.event.id
    this.props.onEventEdit(eventInfo);
  }

  deleteEvent = () => {
    const eventInfo = { id: '1' };
    // this.props.goPrev(true)
    this.props.onEventDelete(eventInfo.id)
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
            width: '140%',
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
    const headerStyle={ color: "grey" }
    const title = this.props.event.id
      ? `EDIT EVENT ${this.props.eventIndex+1}/${this.props.totalEvents}`
      : 'ADD EVENT';
    return (
      <div className="EventInfoContainer">
        <Paper className="InputHeader" style={headerStyle} zDepth={5}>{title}</Paper>
        <Paper className="InputInfo" zDepth={3}>
          <TextField
            hintText="Event Title"
            floatingLabelText="Event Title"
            style={{ fontSize: '24px' }}
            fullWidth
            name="title"
            onChange={this.handleTextChange}
            value={this.state.eventInfo.title}
          /><br />
          <TextField
            hintText="MM:SS"
            floatingLabelText="Time for event to start"
            fullWidth
            name="startTime"
            onChange={this.handleTextChange}
            value={this.state.eventInfo.startTime}
          /><br />
          <TextField hintText="Map Location"
            floatingLabelText="Map Location"
            fullWidth
            name="mapLocation"
            onChange={this.handleTextChange}
            value={this.state.eventInfo.mapLocation}
          /><br />
          <TextField hintText="Date & Time (optional)"
            floatingLabelText="Date & Time"
            fullWidth
            name="dateAndTime"
            onChange={this.handleTextChange}
            value={this.state.eventInfo.dateAndTime}
          /><br />
          <Divider className="Divider" style={{
            width: '140%',
            marginLeft: -30,
            marginTop: 60,
          }} />
          {attachments}
          <FlatButton className="AddAttachment" label="+ Add Attachment" primary={true} style={style} onClick={this.addAttachment}/>
          <Divider style={{
            width: '140%',
            marginLeft: -30,
            marginTop: 60,
          }} />
          <div className="saveButtons">
            <div className="nextPrev">
              {this.props.showNext ? <FlatButton className="Next" label="Next" primary={true} style={style2} onClick={this.props.goNext}/> : null}
              {this.props.showPrev ? <FlatButton className="Prev" label="Prev" primary={true} style={style2} onClick={this.props.goPrev} /> : null }
            </div>
            <div className="saveDelete">
              <FlatButton className="Delete" label="Delete" primary={true} style={style2} onClick={this.deleteEvent}/>
              <FlatButton className="Save" label="Save" primary={true} style={style2} onClick={this.saveEvent}/>
            </div>
        </div>
        </Paper>
      </div>
    );
  }
}

export default EventInfo;
