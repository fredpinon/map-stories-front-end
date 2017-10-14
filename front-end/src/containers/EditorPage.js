import React, {Component} from 'react';
import '../css/EditorPage.css';
import { editEvent, deleteEvent } from '../actions';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { withRouter } from 'react-router';

import Map from '../components/Map';
import EventInfo from '../components/EventInfo';

class EditorPage extends Component {

  state = {
    currentEvent: {},
    showPrevious: true,
    showNext: true,
  }

  constructor (props) {
    super(props);
    if(props.story.events.length > 0) {
      this.state.currentEvent = props.story.events[props.story.events.length-1]
    }
  }

  componentWillMount () {
    if (this.props.story.events.length === 0) this.setState({showPrevious: false, showNext: false});
    if (this.state.currentEvent === this.props.story.events[0]) this.setState({showPrevious: false});
    if (this.state.currentEvent === this.props.story.events[this.props.story.events.length-1]) this.setState({showNext: false});
  }

  onEventEdit = (event, method=undefined) => {
    const storyId = this.props.story.id;
    method !== undefined ? this.props.editEvent(event, storyId, method) : this.props.editEvent(event, storyId);
  }

  onEventDelete = (eventId) => {
    const storyId = this.props.story.id;
    this.props.deleteEvent(storyId, eventId);
  }

  markerAdded = (coordinates) => {
    console.log('from editorpage', coordinates);
  }

  render () {
    return (
      <div className="EditorPage">
        <div className="EventInfoDiv">
          <EventInfo
            event={this.state.currentEvent}
            onEventEdit={this.onEventEdit}
            onEventDelete={this.onEventDelete}
            showPrevious={this.state.showPrevious}
            showNext={this.state.showNext}
          />
        </div>
        <Map onMarkerAdded={this.markerAdded}/>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  story: state.entities.stories[ownProps.computedMatch.params.storyId],
});

const mapDispatchToProps = (dispatch) => ({
  editEvent: (data, storyId, method) => dispatch(editEvent(data, storyId, method)),
  deleteEvent: (storyId, eventId) => dispatch(deleteEvent(storyId, eventId))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EditorPage));
