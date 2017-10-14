import React, {Component} from 'react';
import '../css/HomePage.css';

import { connect } from 'react-redux';
import { fetchStoriesHomePage } from '../actions';
import StoryList from '../components/StoryList';

class HomePage extends Component {

  componentWillMount() {
    this.props.loadStories();
  }

  renderSearch() {
    const storiesRes = this.props.page.searchResults;
    const stories = this.props.stories;
    if (this.props.page.searchResults.length > 0) {
      let searched = {};
      storiesRes.forEach((el, i) => searched[i] = stories[el]);
      return <StoryList className="Searched" stories={searched}/>;
    } else return null;
  }

  render() {
    return (
      <div className="HomePage">
        {this.props.page.searchResults.length === 0
          ?
          <StoryList stories={this.props.stories}/>
          :
          this.renderSearch()}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  stories: state.entities.stories,
  page: state.pages.storiesList
});

const mapDispatchToProps = (dispatch) => ({
  loadStories: () => dispatch(fetchStoriesHomePage())
});

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
