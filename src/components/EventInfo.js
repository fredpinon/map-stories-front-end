import React, {Component} from 'react';
import { connect } from 'react-redux';
import { showError } from '../actions';
import uuid from 'uuid/v4';
import { Player, BigPlayButton } from 'video-react';
import "../../node_modules/video-react/dist/video-react.css";
import ReactPlayer from 'react-player';

import '../css/EditorPage.css';

import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import LinearProgress from 'material-ui/LinearProgress';
// import AWS from 'aws-sdk';

// import Credentials from '../credentials';

// const albumBucketName = 'map-story-photos';
// const bucketRegion = 'eu-west-2';
// const IdentityPoolId = 'eu-west-2_BdiEgKqXz';

// AWS.config.update({
//   region: bucketRegion,
//   accessKeyId: Credentials.AWS_ACCESS_KEY_ID,
//   secretAccessKey: Credentials.AWS_ACCESS_KEY_SECRET,
// });
//
// const s3 = new AWS.S3();

// s3.createBucket({Bucket:albumBucketName}, (err,data)=> {
//   if (err) {
//     console.log(err);
//   } else {
//     const params = {Bucket: albumBucketName, Key:'5', Body: 'Hello!'};
//
//     s3.putObject(params, (err, data) => {
//       if (err) {
//         console.log(err)
//       } else {
//         console.log("Successfully uploaded data to myBucket/myKey");
//       }
//     })
//   }
// })
//
// s3.listBuckets({}, (err, data) => {
//   if (err) console.error(err);
//   else console.log(data);
// })

// var myCredentials = new AWS.CognitoIdentityCredentials({IdentityPoolId:IdentityPoolId});
// var myConfig = new AWS.Config({
//   credentials: myCredentials,
//   region: 'eu-west-2'
// });
//
// const s3 = new AWS.S3({
//   apiVersion: '2006-03-01',
//   params: {Bucket: albumBucketName}
// });
//
// const params = {Bucket:albumBucketName, Body:'Hello', Key:'1'};
// s3.putObject(params, (err, data) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log("Succesful upload");
//   }
// })

// console.log(s3.listObjects());
// const obj = s3.bucket(albumBucketName).object("hi")
// console.log("onj", obj);
// console.log("where am i?", s3.getBucketLocation());

class EventInfo extends Component {
  state = {
    eventInfo: {

    },
    attachments: [],
    uploadState: {
      uploading: false,
      index: null
    }
  };

  constructor (props) {
    super(props);
    if (props.event) {
      this.state.eventInfo = {
        title: props.event.title || '',
        startTime: props.event.startTime || '',
        mapLocation: props.event.mapLocation || '',
        dateAndTime: props.event.dateAndTime || '',
      }
      this.state.attachments = props.event.attachments;
    }
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.event !== this.props.event && nextProps.eventIndex !== this.props.eventIndex) {
      this.setState({
        eventInfo: {
          title: nextProps.event.title || '',
          startTime: nextProps.event.startTime || '',
          mapLocation: nextProps.event.mapLocation || '',
          dateAndTime: nextProps.event.dateAndTime || '',
        },
        attachments: nextProps.event.attachments,
      })
    }
  }

  handleTextChange = (e) => {
    this.setState({
      eventInfo: {
        ...this.state.eventInfo,
        [e.target.name]: e.target.value
      }
    });
  }

  changeAttachmentProperty = (index, key, value) => {
    const attachments = this.state.attachments.slice();
    attachments.splice(index, 1, {
      ...this.state.attachments[index],
      [key]: value,
    });
    this.setState({attachments});
  }

  addAttachment = (url) => {
    this.setState({
      attachments: this.state.attachments.concat([{
        type: '',
      }])
    })
  }

  restrictInputType = (type) => {
    switch (type) {
      case 'image':
        return "image/*";
      case 'video':
        return "video/*";
      default: return;
    }
  }

  handleAWSPath = (event, index, type) => {
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

    fetch(`http://localhost:4000/token/event/${this.props.event._id}`)
    .then(data => data.json())
    .then(data => {

      const body = {
        'bucket': data.fields.bucket,
        'Policy': data.fields.Policy,
        'X-Amz-Algorithm': data.fields['X-Amz-Algorithm'],
        'X-Amz-Credential': data.fields['X-Amz-Credential'],
        'X-Amz-Date': data.fields['X-Amz-Date'],
        'X-Amz-Signature': data.fields['X-Amz-Signature'],
        'key':`event-${this.props.event._id}/testfile.jpg`,
        'file':file
      }

      const formBody = new FormData();

      Object.keys(body).forEach(elem => {
        formBody.append(elem, body[elem])
      })
      const params = {
        method:'POST',
        body:formBody
      }
      return params
      })
      .then(params => {
        fetch("https://s3.eu-west-2.amazonaws.com/map-story-photos", params, (error) => {
          if (error) throw error;
      })
    })

  }

  toggleDisable = (index) => {
    if (this.state.attachments[index].imageUrl) {
      return this.state.attachments[index].imageUrl ? true : false;
    } else if (this.state.attachments[index].url) {
      return this.state.attachments[index].url ? true : false;
    } else if (this.state.attachments[index].text) {
      return this.state.attachments[index].text ? true : false;
    }
  }

  handleLinkInput = (event, index, type) => {
    if (event.key === 'Enter') {
      switch (type) {
        case 'image':
        if ((/\.(gif|jpg|jpeg|tiff|png)$/i).test(this.eventURLField.input.value)) {
          this.changeAttachmentProperty(index, type === 'image' ? 'imageUrl' : 'url' , this.eventURLField.input.value);
        } else {
          this.props.showError('put valid image link');
        }
        break;
        case 'video':
          this.changeAttachmentProperty(index, type === 'image' ? 'imageUrl' : 'url' , this.eventURLField.input.value);
        break;
        case 'link':
          this.changeAttachmentProperty(index, type === 'image' ? 'imageUrl' : 'url' , this.eventURLField.input.value);
        break;
        case 'tweet':
          this.changeAttachmentProperty(index, type === 'image' ? 'imageUrl' : 'url' , this.eventURLField.input.value);
        break;
        case 'text':
          this.changeAttachmentProperty(index, type = 'text', this.eventURLField.input.value);
        break;
        default: return;
      }
    }
  }

  deleteAttachment = (index) => {
    const attachments = this.state.attachments.concat();
    attachments.splice(index, 1)
    this.setState({
      attachments
    });
  }

  saveEvent = () => {
    if (/^(?:(?:([01]?\d|2[0-3]):)?([0-5]?\d):)?([0-5]?\d)$/.test(this.state.eventInfo.startTime)) {
      const eventInfo = {
        title: this.state.eventInfo.title,
        startTime: this.state.eventInfo.startTime,
        mapLocation: this.state.eventInfo.mapLocation,
        dateAndTime: this.state.eventInfo.dateAndTime,
        attachments: this.state.attachments,
      }
      if (this.props.event._id) eventInfo._id = this.props.event._id
      this.props.onEventEdit(eventInfo);
      console.log(this.props.onEventEdit);
      this.setState({
        attachments: []
      })
    } else {
      this.props.showError('Please supply a valid start time in format HH:MM:SS')
    }
  }

  deleteEvent = () => {
    this.props.onEventDelete(this.props.event._id);
  }

  renderPreviewInputFile = (attachment, index) => {
    const { type } = attachment;
    if (this.state.attachments[index].url || this.state.attachments[index].imageUrl ) {
      switch (type) {
        case 'image':
          return (
            <div className="previewImage">
              <img src={this.state.attachments[index].imageUrl} alt="previewImage" />
            </div>
          )
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
              <ReactPlayer
                width={400}
                height={225}
                url={this.state.attachments[index].url}
              />
            </div>
          )
        }
        default: return;
      }
    }
  }

  renderDeleteAttachmentButton = (index) => {
    if (this.state.attachments[index].url || this.state.attachments[index].imageUrl || this.state.attachments[index].text) {
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

  renderSubmitAttachmentButton = (index, type) => {
    switch (type) {
      case 'text':
        if (!this.state.attachments[index].text) {
          return (
            <div className='submitAttachmentButton'>
              <FlatButton
                label="Submit"
                primary={true}
                rippleColor="#673AB7"
                onClick={() => {
                  return this.changeAttachmentProperty(
                  index,
                  type === 'text'
                  ? 'text'
                  : (type === 'image'
                    ? 'imageUrl'
                    : 'url'),
                  type === 'text'
                  ? this.eventURLField.input.refs.input.value
                  : this.eventURLField.input.value)
                }}
              />
            </div>
          )
        }
        break;
        case 'image':
          if (!this.state.attachments[index].imageUrl) {
            return (
              <div className='submitAttachmentButton'>
                <FlatButton
                  label="Submit"
                  primary={true}
                  rippleColor="#673AB7"
                  onClick={() => this.changeAttachmentProperty(index, type === 'text' ? 'text' : (type === 'image' ? 'imageUrl' : 'url') , this.eventURLField.input.value)}
                />
              </div>
            )
          }
          break;
      default:
      if (!this.state.attachments[index].url) {
        return (
          <div className='submitAttachmentButton'>
            <FlatButton
              label="Submit"
              primary={true}
              rippleColor="#673AB7"
              onClick={() => this.changeAttachmentProperty(index, type === 'text' ? 'text' : (type === 'image' ? 'imageUrl' : 'url') , this.eventURLField.input.value)}
            />
          </div>
        )
      }
    }
  }

  renderProgressBar = (index) => {
    if (this.state.attachments[index]) {
      if (!this.state.uploadState.uploading) return null;
      if (this.state.uploadState.index === index) {
        return (
          <LinearProgress
            mode="determinate"
            value={this.state.progressLoaded}
            max={this.state.progressTotal}
          />
        )
      }
    }
  }

  renderAttachmentContent = (attachment, index) => {
    const { type } = attachment;
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
      }
    };
    if (type === 'link' || type === 'tweet') {
      const extraProps = {};
      if(this.toggleDisable(index)) extraProps.value = attachment.url;
      return (
        <div>
          <TextField
            hintText="link"
            floatingLabelText="Paste URL"
            fullWidth={true}
            onKeyPress={(e) => this.handleLinkInput(e, index, type)}
            ref={input => this.eventURLField = input}
            disabled={this.toggleDisable(index)}
            {...extraProps}
          />
          <div className="deleteValidateButtons">
            {this.renderDeleteAttachmentButton(index)}
            {this.renderSubmitAttachmentButton(index, type)}
          </div>
        </div>
      )
    }
    if (type === 'text') {
      const extraProps = {};
      if(this.toggleDisable(index)) extraProps.value = attachment.text;
      return (
        <div>
          <TextField
            hintText="text"
            floatingLabelText="Type text"
            fullWidth={true}
            multiLine={true}
            rows={2}
            rowsMax={4}
            onKeyPress={(e) => this.handleLinkInput(e, index, type)}
            ref={input => this.eventURLField = input}
            disabled={this.toggleDisable(index)}
            {...extraProps}
          />
          <div className="deleteValidateButtons">
            {this.renderDeleteAttachmentButton(index)}
            {this.renderSubmitAttachmentButton(index, type)}
          </div>
        </div>
      )
    }
    if (type === 'image' || type === 'video') {
      const extraProps = {};
      if(this.toggleDisable(index)){
        if(type === 'image') extraProps.value = attachment.imageUrl;
        else extraProps.value = attachment.url;
      }
      return (
        <div>
          <RaisedButton
            label={`Choose your ${type}`}
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
            {...extraProps}
          />
          {this.renderProgressBar(index)}
          {this.renderPreviewInputFile(attachment, index)}
          <div className="deleteValidateButtons">
            {this.renderDeleteAttachmentButton(index)}
            {this.renderSubmitAttachmentButton(index, type)}
          </div>
        </div>
      )
    }
  }

  render() {
    if(!this.state.attachments) return null;

    const attachments = this.state.attachments.map((el, index) => {
      let attachmentType = '';
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
            <MenuItem value={'tweet'} primaryText="Tweet" />
          </SelectField>
          <br />
          {this.renderAttachmentContent(el, index)}
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
      marginTop: 30,
      float: 'right'
    }
    const headerStyle={ color: "grey" }
    const title = this.props.event._id
      ? `EDIT EVENT ${this.props.eventIndex+1}/${this.props.totalEvents}`
      : 'ADD EVENT';
    return (
      <div className="EventInfoContainer">
        <Paper className="InputHeader" style={headerStyle} zDepth={5}>{title}</Paper>
        <Paper className="InputInfo" zDepth={3}>
          <div className="nextPrev">
            <FlatButton
              className="Next"
              label="Next"
              primary={true}
              style={style2}
              rippleColor="#673AB7"
              disabled={!this.props.showNext}
              onClick={this.props.goNext}
            />
            <FlatButton
              className="Prev"
              label="Prev"
              primary={true}
              style={style2}
              rippleColor="#673AB7"
              disabled={!this.props.showPrev}
              onClick={this.props.goPrev}
             />
          </div>
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
            hintText="HH:MM:SS"
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
            <div className="saveDelete">
              <FlatButton className="Delete" label="Delete" primary={true} style={style2} rippleColor="#673AB7" onClick={this.deleteEvent}/>
              <FlatButton className="Save" label="Save" primary={true} style={style2} rippleColor="#673AB7" onClick={this.saveEvent}/>
            </div>
          </div>
        </Paper>
      </div>
    );
  }
}


const mapStateToProps = (state, ownProps) => ({
  // id: ownProps.computedMatch.params.storyId,
  // story: state.entities.stories[ownProps.computedMatch.params.storyId],
});

const mapDispatchToProps = (dispatch) => ({
  showError: (errorMessage) => dispatch(showError(errorMessage)),
  // getToken: () => dispatch(getToken())
  // editStory: (data) => dispatch(editStory(data))

});

export default connect(mapStateToProps, mapDispatchToProps)(EventInfo);
