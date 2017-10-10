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
    for (let key in this.props.page) {
      if (Array.isArray(this.props.page[key])) delete this.props.page[key]
    }
    console.log(this.props.page);
    if (Object.keys(this.props.page).length === 0) {
      console.log('Default results');
      return <StoryList stories={this.props.stories}/>
    } else {
      console.log('Search results');
      const stories = this.props.page.searchResult.entities.stories
      return <StoryList className="Searched" stories={stories}/>
    }

  }

  render() {
    return (
      <div className="HomePage">
        {this.renderSearch()}
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
