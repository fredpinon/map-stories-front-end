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
import Loader from '../components/Loader';

class UserPage extends Component {

  state = {
    open: false,
    disabled: true,
    renderEditor: false,
    loading: true,
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

  componentDidMount() {
    const timeStamps = [1000, 2000, 2500, 3000];
    const wait = timeStamps[Math.floor(Math.random()*timeStamps.length)];
    setTimeout(() => {
      this.setState({
        loading: false,
      })
    }, wait)
  }

  toggleDisabled = () => {
    if (this.titleField.input.value !== '' && this.taglineField.input.value !== '') this.setState({disabled: false});
  }

  renderComponent = () => {
    const ownStories = this.props.page.results
    .reduce((accum, el) => {
      accum[el] = this.props.stories[el]
      return accum;
    },{});
    // const disabled = (this.titleField !== undefined && this.taglineField !== undefined) ? false : true;
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
    return this.state.loading ? (
      <Loader text="loading your stories"/>
    ) : (
      <div>
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
        {this.props.page.results.length === 0
        ?
        <div className="NoUserStories">
          You have no stories yet. Create a new story.
        </div>
        :
        <StoryList stories={ownStories} renderEditor={this.state.renderEditor}/>
        }
      </div>
    )
  }

  render() {
    console.log(this.props.page);
    return (
      <div className="UserPage">
        {this.renderComponent()}
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
