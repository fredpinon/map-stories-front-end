import React, {Component} from 'react';
import '../css/EditorPage.css';
import { editStory } from '../actions';
import { connect } from 'react-redux';
import uuid from 'uuid/v4';

import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

import AWS from 'aws-sdk';
const albumBucketName = 'map-story';
const bucketRegion = 'eu-west-1';
const IdentityPoolId = 'eu-west-1:888bfed2-3d00-4100-a4d9-8011c6df4837';


AWS.config.update({
  region: bucketRegion,
  credentials: new AWS.CognitoIdentityCredentials({
    IdentityPoolId: IdentityPoolId
  })
});

const s3 = new AWS.S3({
  apiVersion: '2006-03-01',
  params: {Bucket: albumBucketName}
});


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

  optionalInputOrLink = (type) => {
    const styles = {
      button: {
        margin: 12,
      },
      inputForm: {
        cursor: 'pointer',
        position: 'absolute',
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        width: '100%',
        opacity: 0,
      },
    };
    if (type === 'image' || type === 'video' || type === 'audio') {
      return (
        <div>
          <FlatButton label={`Choose your ${type}`} style={styles.button}>
            <input
              id="files"
              type="file"
              ref={type}
              style={styles.inputForm}
              onChange={this.handleAWSPath}
            />
          </FlatButton>
          <TextField  hintText="url"
                      floatingLabelText="or just paste URL"
                      fullWidth={true}
          />
        </div>
      )
    }
  }

  handleAWSPath = (event) => {
    console.log("its happening");
    console.log(event.target.files);
    let location;
    const files = event.target.files;
    if (!files.length) {
      return alert('Please choose a file to upload first.');
    }
    const file = files[0];
    const fileName = uuid();
    const albumPhotosKey = 'event-image/';
    const photoKey = albumPhotosKey + fileName;
    console.log({
      photoKey,
      file,
    });
    s3.upload({
      Key: photoKey,
      Body: file,
      ACL: 'public-read'
    }, (err, data) => {
      if (err) {
        console.log(err);
        return console.error('There was an error uploading your image: ', err.message);
      }
      console.log('Successfully uploaded image.', data.Location, this.state);
    });
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
          {this.optionalInputOrLink(el.type)}
          <Divider style={{
            width: '112%',
            marginLeft: -30,
            marginTop: 60,
          }} />
        </div>
      )
    })

    const style = {marginTop: 50}

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
        </Paper>
      </div>
    );
  }
}

export default EventInfo;

