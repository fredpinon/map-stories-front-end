import React, {Component} from 'react';
import '../css/Viewer.css';

import { connect } from 'react-redux';
import { fetchSingleStory } from '../actions';

class Viewer extends Component {

  componentWillMount() {
    if (!this.props.match.params.storyId) return null;
    this.props.loadStory(this.props.match.params.storyId);
  }

  renderStoryDetails = () => {
    if (!this.props.story) return null;
    return (
      <div className="storyDetails">
        {/*story details go here*/}
      </div>
    )
  }

  render() {

    return (
      <div className="Viewer">
        {this.renderStoryDetails()}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  story: state.entities.story,
});

const mapDispatchToProps = (dispatch) => ({
  loadStory: (storyId) => dispatch(fetchSingleStory(storyId))
});

export default connect(mapStateToProps, mapDispatchToProps)(Viewer);
