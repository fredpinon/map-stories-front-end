import React, {Component} from 'react';
import { connect } from 'react-redux';
import { editStory } from '../actions';
import uuid from 'uuid/v4';
import { Player, BigPlayButton
} from 'video-react';
import "../../node_modules/video-react/dist/video-react.css";
import ReactPlayer from 'react-player';

import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import '../css/EditorPage.css';

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


  changeAttachmentProperty = (index, key, value) => {
    const attachments = this.state.attachments.slice();
    attachments.splice(index, 1, {
      ...this.state.attachments[index],
      [key]: value,
    });
    this.setState({
      attachments
    });
  }

  addAttachment = (url) => {
    this.setState({
      attachments: this.state.attachments.concat([{
        type: '',
      }])
    })
  }

  saveEvent = () => {
    const eventInfo = {};
    this.props.onEventSave(eventInfo);
  }


  restrictInputType = (type) => {
    switch (type) {
      case 'image':
        return "image/*"
      break;
      case 'video':
        return "video/*"
      break;
      case 'audio':
        return "audio/*"
      break;
    }
  }

  optionalInputOrLink = (type, index) => {
    const styles = {
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
          <RaisedButton
            label={`Choose your ${type}`}
            style={styles.button}
            ripplecolor="#673AB7"
            primary={true}
            fullWidth={true}
            disabled={this.toggleDisable(index)}
          >
            <input
              id="files"
              type="file"
              ref={type}
              style={styles.inputForm}
              onChange={(e) => this.handleAWSPath(e, index, type)}
              accept={this.restrictInputType(type)}
            />
          </RaisedButton>
          <TextField
            hintText="url"
            floatingLabelText="or just paste URL"
            fullWidth={true}
            onKeyPress={(e) => this.handleLinkInput(e, index, type)}
            ref={input => this.eventURLField = input}
            disabled={this.toggleDisable(index)}
          />
          {this.previewInputFile(type, index)}
          {this.renderDeleteAttachmentButton(index)}
        </div>
      )
    }
  }

  handleAWSPath = (event, index, type) => {
    let location;
    const files = event.target.files;
    if (!files.length) {
      return alert('Please choose a file to upload first.');
    }
    const file = files[0];
    const fileNameComponents = file.name.split('.');
    const fileFormat = fileNameComponents[fileNameComponents.length-1];
    const fileName = uuid() + '.' + fileFormat;
    const albumFileKey = 'event-file/';
    const fileKey = albumFileKey + fileName;
    s3.upload({
      Key: fileKey,
      Body: file,
      ACL: 'public-read'
    }, (err, data) => {
      if (err) {
        return console.error('There was an error uploading your file: ', err.message);
      }
      console.log('Successfully uploaded file.', data.Location, this.state);
      this.changeAttachmentProperty(index, type === 'image' ? 'imageUrl' : 'url' , data.Location);
    });
  }

  toggleDisable = (index) => {
    if (this.state.attachments[index].imageUrl) {
      return this.state.attachments[index].imageUrl ? true : false;
    } else {
      return this.state.attachments[index].url ? true : false;
    }
  }

  handleLinkInput = (event, index, type) => {
    if (event.key === 'Enter') {
      switch (type) {
        case 'image':
        if ((/\.(gif|jpg|jpeg|tiff|png)$/i).test(this.eventURLField.input.value)) {
          this.changeAttachmentProperty(index, type === 'image' ? 'imageUrl' : 'url' , this.eventURLField.input.value);
        } else {
          alert('put valid image link')
        }
        break;
        case 'video':
          this.changeAttachmentProperty(index, type === 'image' ? 'imageUrl' : 'url' , this.eventURLField.input.value);
        break;
        case 'audio':
          this.changeAttachmentProperty(index, type === 'image' ? 'imageUrl' : 'url' , this.eventURLField.input.value);
        break;
      }
    }
  }

  previewInputFile = (type, index) => {
    if (this.state.attachments[index].url || this.state.attachments[index].imageUrl ) {
      console.log(this.state.attachments[index]);
      switch (type) {
        case 'image':
          return (
            <div className="previewImage">
              <img src={this.state.attachments[index].imageUrl} />
            </div>
          )
        break;
        case 'video':
        if ((/\.(avi|AVI|wmv|WMV|flv|FLV|mpg|MPG|mp4|MP4)/i).test(this.state.attachments[index].url)) {
          return (
            <div className="previewVideo">
              <Player
                id="player"
              >
                <source src={this.state.attachments[index].url} />
                <BigPlayButton position="center" />
            </Player>
            </div>
          )
        } else {
          return (
            <div className="previewVideo">
              <ReactPlayer url={this.state.attachments[index].url}/>
            </div>
          )
        }
        break;
        case 'audio':
        if ((/\.(wav|mp3)$/i).test(this.state.attachments[index].url)) {
          return (
            <div className="previewAudio">
              <audio controls>
                <source src={this.state.attachments[index].url}  />
              </audio>
            </div>
          )
        } else if ((/soundcloud/i).test(this.state.attachments[index].url)){
          return (
            <div className="previewAudio">
              <ReactPlayer url={this.state.attachments[index].url}/>
            </div>
          )
        }
        break;
      }
    }
  }

  renderDeleteAttachmentButton = (index) => {
    if (this.state.attachments[index].url || this.state.attachments[index].imageUrl) {
      return (
        <div className='deleteAttachmentButton'>
          <FlatButton
            label="Delete attachment"
            primary={true}
            rippleColor="#673AB7"
            onClick={() => this.deleteAttachment(index)}
          />
        </div>
      )
    }
  }

  deleteAttachment = (index) => {
    this.state.attachments.splice(index, 1);
    this.forceUpdate();
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
            onChange={(event, i, value) => this.changeAttachmentProperty(index, 'type', value)}
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
          {this.optionalInputOrLink(el.type, index)}
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
          <FlatButton className="AddAttachment" label="+ Add Attachment" primary={true} style={style} onClick={this.addAttachment} ripplecolor="#673AB7"/>
          <Divider style={{
            width: '112%',
            marginLeft: -30,
            marginTop: 60,
          }} />
          <FlatButton className="Delete" label="Delete" primary={true} style={style2} onClick={this.deleteEvent} ripplecolor="#673AB7"/>
          <FlatButton className="Save" label="Save" primary={true} style={style2} onClick={this.saveEvent} ripplecolor="#673AB7"/>
        </Paper>
      </div>
    );
  }
}

export default EventInfo;

