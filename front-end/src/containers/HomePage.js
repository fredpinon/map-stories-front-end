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
