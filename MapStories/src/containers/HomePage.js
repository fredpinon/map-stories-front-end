import React, {Component} from 'react';
import '../css/HomePage.css';

import { connect } from 'react-redux';
import { fetchStoriesHomePage } from '../actions';
import StoryList from '../components/StoryList';
import Loader from '../components/Loader';

class HomePage extends Component {

  state = {
    loading: true,
  };

  componentWillMount() {
    this.props.loadStories(1);
  }

  componentDidMount() {
    const timeStamps = [1000, 2000];
    const wait = timeStamps[Math.floor(Math.random()*timeStamps.length)];
    setTimeout(() => {
      this.setState({
        loading: false,
      })
    }, wait)
  }

  renderSearch = () => {
    const storiesRes = this.props.page.searchResults;
    const stories = this.props.stories;
    if (this.props.page.searchResults.length > 0) {
      let searched = {};
      storiesRes.forEach((el, i) => searched[i] = stories[el]);
      return <StoryList className="Searched" stories={searched}/>;
    } else return null;
  }

  renderList = () => {
    const searchResultsLength = this.props.page.searchResults.length;
    const publishedStories = this.props.page.pageResults
    .reduce((accum, el) => {
      accum[el] = this.props.stories[el];
      return accum;
    },{});
    return searchResultsLength === 0 ? (
      <StoryList className="Searched" stories={publishedStories}/>
    ) : (
      this.renderSearch()
    )
  }

  renderComponent = () => {
    return this.state.loading ? (
      <Loader text="loading..."/>
    ) : (
      this.props.page.pageResults.length === 0
      ?
        <div className="NoStories">
          No Stories have been published yet.
        </div>
      :
        this.renderList()
    )
  }

  render() {

    return (
      <div className="HomePage">
        {this.renderComponent()}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  stories: state.entities.stories,
  page: state.pages.storiesList
});

const mapDispatchToProps = (dispatch) => ({
  loadStories: (page) => dispatch(fetchStoriesHomePage(page))
});

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
