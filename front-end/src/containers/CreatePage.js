import React, {Component} from 'react';
import '../css/CreatePage.css';

import { createStory } from '../actions';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';

import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import Divider from 'material-ui/Divider';
import RaisedButton from 'material-ui/RaisedButton';

class CreatePage extends Component {

  createStory = () => {
    this.props.createStory({
      title: this.titleField.input.value,
      tagline: this.taglineField.input.value
    });
  }

  render() {
    if(this.props.page.newStoryId !== null) {
      return <Redirect to={`/me/editstory/${this.props.page.newStoryId}`} />
    }

    const style = {marginTop: 50}

    const headerStyle={
      color: "grey",
    }

    return (
      <div className="CreatePage">
        <Paper className="InputHeader" style={headerStyle} zDepth={5}>CREATE STORY</Paper>
        <Paper className="InputInfo" zDepth={3}>
          <TextField hintText="Story Title" floatingLabelText="Story Title" style={{ fontSize: '24px' }}  fullWidth={true} ref={input => this.titleField = input}/><br />
          <TextField hintText="Story Tagline" floatingLabelText="Story Tagline" fullWidth={true} ref={input => this.taglineField = input}/><br />
          <Divider style={{
            width: '112%',
            marginLeft: -30,
            marginTop: 60,
          }} />
          <RaisedButton label="Create" primary={true} style={style} onClick={this.createStory}/>
        </Paper>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  page: state.pages.createStory
})

const mapDispatchToProps = (dispatch) => ({
  createStory: (data) => dispatch(createStory(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CreatePage);
