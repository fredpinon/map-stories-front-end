import React, {Component} from 'react';
import '../css/UserPage.css';

import { connect } from 'react-redux';
import { fetchStoriesUserPage } from '../actions';

import StoryList from '../components/StoryList';

class UserPage extends Component {

  componentWillMount() {
    this.props.loadStories();
  }

  render() {
    return (
      <div className="UserPage">
        <StoryList stories={this.props.stories}/>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  stories: state.entities.stories,
});

const mapDispatchToProps = (dispatch) => ({
  loadStories: () => dispatch(fetchStoriesUserPage())
});

export default connect(mapStateToProps, mapDispatchToProps)(UserPage);
