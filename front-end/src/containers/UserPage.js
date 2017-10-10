import React, {Component} from 'react';
import '../css/UserPage.css';

import { connect } from 'react-redux';
import { fetchStoriesUserPage } from '../actions';
import { Link } from 'react-router-dom';

import ContentAdd from 'material-ui/svg-icons/content/add';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import StoryList from '../components/StoryList';

class UserPage extends Component {

  componentWillMount() {
    this.props.loadStories();
  }

  render() {
    const style = {
      margin: 20,
    }
    const ownStories = Object.keys(this.props.stories)
    .filter(key => this.props.stories[key].editor === 'E-A')
    .reduce((accum, el) => {
      accum[el] = this.props.stories[el]
      return accum;
    },{});
    return (
      <div className="UserPage">
      <Link to={'/me/addstory'}>
          <FloatingActionButton className="AddStoryButton" style={style}>
            <ContentAdd />
          </FloatingActionButton>
        </Link>
        <StoryList stories={ownStories}/>
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
