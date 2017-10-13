import React, {Component} from 'react';
import '../css/EditorPage.css';
import { createStory } from '../actions';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Map from '../components/Map';
import EventInfo from '../components/EventInfo';
import RaisedButton from 'material-ui/RaisedButton';

class EditorPage extends Component {

  saveStory = () => {
    this.props.createStory();
  }

  markerAdded = (coordinates) => {
    console.log('from editorpage', coordinates);
  }

  render () {
    return (
      <div className="EditorPage">
        <EventInfo/>
        <Map onMarkerAdded={this.markerAdded} editorPage />
      </div>
    )
  }
}

// const mapStateToProps = (state) => ({
//   story: state.entities.story,
// });

const mapDispatchToProps = (dispatch) => ({
  createStory: (data) => dispatch(createStory(data))
});

export default connect(mapDispatchToProps)(EditorPage);
