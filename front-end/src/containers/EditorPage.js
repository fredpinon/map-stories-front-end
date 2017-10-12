import React, {Component} from 'react';
import '../css/EditorPage.css';
import { editStory } from '../actions';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Map from '../components/Map';
import EventInfo from './EventInfo';
import RaisedButton from 'material-ui/RaisedButton';

class EditorPage extends Component {
  state = {
    currentEvent: {}
  }

  constructor (props) {
    super(props);
    console.log('props in editor page', props);
    if(props.story.events.length > 0) {
      this.state.currentEvent = props.story.events[props.story.events.length-1]
    }
  }

  saveStory = () => {
    this.props.editStory();
  }

  onEventUpdate = (event) => {

  }

  onEventDelete = (event) => {

  }

  onEventSave = (event) => {
    this.props.editstory(event);
  }

  render () {
    return (
      <div className="EditorPage">
        <EventInfo
          event={this.state.currentEvent}
          onEventSave={this.onEventSave}
          onEventDelete={this.onEventDelete}
        />
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  story: state.entities.stories[ownProps.computedMatch.params.storyId],
});

const mapDispatchToProps = (dispatch) => ({
  editStory: (data) => dispatch(editStory(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(EditorPage);
