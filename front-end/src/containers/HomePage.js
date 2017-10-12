import React, {Component} from 'react';
import '../css/HomePage.css';

import { connect } from 'react-redux';
import { fetchStoriesHomePage } from '../actions';
import StoryList from '../components/StoryList';

class HomePage extends Component {

  componentWillMount() {
    this.props.loadStories();
  }




  render() {
    const publishedStories = Object.keys(this.props.stories)
    .filter(key => this.props.stories[key].published)
    .reduce((accum, el) => {
      accum[el] = this.props.stories[el]
      return accum;
    },{});
    return (
      <div className="HomePage">
        <StoryList stories={this.props.stories}/>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  stories: state.entities.stories,
});

const mapDispatchToProps = (dispatch) => ({
  loadStories: () => dispatch(fetchStoriesHomePage())
});

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
