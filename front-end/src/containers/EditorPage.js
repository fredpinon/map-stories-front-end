import React, {Component} from 'react';
import '../css/EditorPage.css';
import { editEvent, deleteEvent, fetchSingleStory } from '../actions';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import Map from '../components/Map';
import EventInfo from '../components/EventInfo';

class EditorPage extends Component {

 state = {
    currentEventIndex: {},
    showPrev: false,
    showNext: false,
  }

 constructor (props) {
    super(props);
    this.props.fetchSingleStory(props.computedMatch.params.storyId);
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.story.events && nextProps.story.events.length > 1) {
      this.setState({ showNext:true });
    }
  }

  newEvent = () => ({
    title: '',
    startTime: '00:00',
    mapLocation: '',
    dateAndTime: ''
  })

  onEventEdit = (event) => {
    const storyId = this.props.story.id;
    this.props.editEvent(event, storyId);
    this.goNext();
  }

 onEventDelete = (eventId) => {
    const storyId = this.props.story.id;
    this.props.deleteEvent(storyId, eventId);
  }

  goNext = () => {
    this.setState({
      showNext: this.props.story.events[this.state.currentEventIndex+1] !== undefined,
      showPrev: true,
      currentEventIndex: this.state.currentEventIndex+1
    })
  }

  goPrev = () => {
    if(this.state.currentEventIndex === 0) return;

    this.setState({
      showNext: true,
      showPrev: this.state.currentEventIndex > 1,
      currentEventIndex: this.state.currentEventIndex-1
    })
  }

  markerAdded = (coordinates) => {
    console.log('from editorpage', coordinates);
  }

  render () {
    const currentEvent = this.props.story.events[this.state.currentEventIndex]
      ? this.props.story.events[this.state.currentEventIndex]
      : {};
    return (
      <div className="EditorPage">
        <div className="EventInfoDiv">
          <EventInfo
            event={currentEvent}
            eventIndex={this.state.currentEventIndex}
            totalEvents={this.props.story.events.length}
            onEventEdit={this.onEventEdit}
            onEventDelete={this.onEventDelete}
            showPrev={this.state.showPrev}
            showNext={this.state.showNext}
            goNext={this.goNext}
            goPrev={this.goPrev}
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
  fetchSingleStory: (storyId) => dispatch(fetchSingleStory(storyId)),
  editEvent: (data, storyId, method) => dispatch(editEvent(data, storyId, method)),
  deleteEvent: (storyId, eventId) => dispatch(deleteEvent(storyId, eventId))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EditorPage));
