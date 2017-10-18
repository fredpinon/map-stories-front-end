import React, {Component} from 'react';
import '../css/UserPage.css';

import { connect } from 'react-redux';
import { fetchStoriesUserPage, createStory } from '../actions';

import ContentAdd from 'material-ui/svg-icons/content/add';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

import StoryList from '../components/StoryList';

class UserPage extends Component {

 state = {
    open: false,
    disabled: true,
    renderEditor: false
  };

 handleOpen = () => this.setState({open: true});

 handleClose = () => {
    this.setState({
      open: false,
      disabled: true,
    });
  };

 createStory = () => {
    this.props.createStory({
      title: this.titleField.input.value,
      tagline: this.taglineField.input.value,
      email: this.props.user.email,
    });
    this.setState({open: false});
  }

 componentWillMount() {
    this.props.loadStories();
  }

 toggleDisabled = () => {
    if (this.titleField.input.value !== '' && this.taglineField.input.value !== '') this.setState({disabled: false});
  }

 render() {
    const ownStories = this.props.page.results
    .reduce((accum, el) => {
      accum[el] = this.props.stories[el]
      return accum;
    },{});
    const disabled = (this.titleField !== undefined && this.taglineField !== undefined) ? false : true;
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={this.handleClose}
      />,
      <FlatButton
        label="Create"
        primary={true}
        disabled={this.state.disabled}
        onClick={this.createStory}
      />,
    ];
    const style = {
      margin: 20,
    }
    return (
      <div className="UserPage">
        <FloatingActionButton className="AddStoryButton" style={style} onClick={this.handleOpen}>
          <ContentAdd />
        </FloatingActionButton>
        <Dialog
        title="CREATE NEW STORY"
        actions={actions}
        modal={true}
        open={this.state.open}
        >
        Add a title and tagline for your new story
        <TextField
          hintText="Story Title"
          floatingLabelText="Story Title"
          style={{ fontSize: '24px' }}
          fullWidth={true}
          ref={input => this.titleField = input}
          onKeyPress={this.toggleDisabled}/><br />
        <TextField
          hintText="Story Tagline"
          floatingLabelText="Story Tagline"
          fullWidth={true}
          ref={input => this.taglineField = input}
          onKeyPress={this.toggleDisabled}/><br />
        </Dialog>
        <StoryList stories={ownStories} renderEditor={this.state.renderEditor}/>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  stories: state.entities.stories,
  page: state.pages.editorStoriesPage,
  user: state.authentication
});

const mapDispatchToProps = (dispatch) => ({
  loadStories: () => dispatch(fetchStoriesUserPage()),
  createStory: (data) => dispatch(createStory(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(UserPage);
