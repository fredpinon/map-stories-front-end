import React, {Component} from 'react';
import '../css/EditorPage.css';
import { editEvent, deleteEvent, fetchSingleStory } from '../actions';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import Map from '../components/Map';
import EventInfo from '../components/EventInfo';
import TimeLine from '../components/TimeLine';

class EditorPage extends Component {

 state = {
    currentEventIndex: 0,
    showPrev: false,
    showNext: false,
    coordinates: {},
    times: []
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

  componentWillMount = () => {
    const times = [];
    this.props.story.events.map(event => {
      times.push(event.startTime)
    })
    this.setState({times})
  }

  newEvent = () => ({
    title: '',
    startTime: '00:00',
    mapLocation: '',
    dateAndTime: '',
    attachments: []
  })

  onEventEdit = (event) => {
    const storyId = this.props.story._id;
    event.coordinates = [this.state.coordinates];
    this.props.editEvent(event, storyId);
    this.props.story.events[this.state.currentEventIndex] = event;
    this.goNext();
    // this.getTimes();
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
    this.setState({
      coordinates
    })
  }

  // getTimes = () => {
  //   const times = [];
  //   this.props.story.events.map(event => {
  //     times.push(event.startTime)
  //   })
  //   this.setState({times})
  // }

  // shouldComponentUpdate(nextProps, nextState) {
  //   console.log(nextState.coordinates);
  //   if (nextState.coordinates) return false;
  //   return true;
  // }

  renderEventInfo () {
    if(!this.props.story.events || typeof this.props.story.events[0] === 'string') return null;

    const currentEvent = this.props.story.events[this.state.currentEventIndex]
      ? this.props.story.events[this.state.currentEventIndex]
      : this.newEvent();

    console.log('currentEvent', currentEvent);

    return (
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
    )
  }

  matched = (match) => {
    console.log('STORY', this.props.story.events);
    console.log('THIS IS THE CURRENT EVENT TIME:', match);
    // this.setState({time: match})
    this.props.story.events.map((event, i) => {
      let mark = 0;
      let y = event.startTime.split(':')
      y.length > 2 ? mark = parseInt(y[0]) * 60 +   parseInt(y[1]) + (parseInt(y[2])/60) : mark = parseInt(y[0]) + (parseInt(y[1])/60)
      if (match === mark) {
        this.setState({currentEventIndex: i})
        console.log('matched:', i);

      }
      console.log('this is this:', match, mark);
      // return <EventCard key={i} data={event} expanded={false} Markers={this.eventTimes()}/>
    }
    )
  }

  render () {
    const event = this.props.story.events[this.state.currentEventIndex];
    const markersProps = {}
    if (event && event.coordinates && event.coordinates.length > 0) {
      markersProps.markers = event.coordinates;
    }

    return (
      <div className="EditorPage">
        <div className="EventInfoDiv">
          {this.renderEventInfo()}
        </div>
        <div className="MapTimeLine">
          <Map {...markersProps} onMarkerAdded={this.markerAdded} editor />

          <TimeLine times={this.state.times} match={this.matched} />

        </div>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  story: state.entities.stories[ownProps.computedMatch.params.storyId],
});

const mapDispatchToProps = (dispatch) => ({
  fetchSingleStory: (storyId) => dispatch(fetchSingleStory(storyId)),
  editEvent: (data, storyId) => dispatch(editEvent(data, storyId)),
  deleteEvent: (storyId, eventId) => dispatch(deleteEvent(storyId, eventId))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EditorPage));
