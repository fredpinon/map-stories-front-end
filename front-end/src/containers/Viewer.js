import React, {Component} from 'react';
import '../css/Viewer.css';

import { connect } from 'react-redux';
import { fetchSingleStory } from '../actions';

class Viewer extends Component {

  componentWillMount() {
    this.props.loadStory('storyId');
  }

  render() {
    return (
      <div className="Viewer">
        I am the viewer
      </div>
    );
  }
}

const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch) => ({
  loadStory: (storyId) => dispatch(fetchSingleStory(storyId))
});

export default connect(mapStateToProps, mapDispatchToProps)(Viewer);
