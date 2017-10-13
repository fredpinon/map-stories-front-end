import React, {Component} from 'react';
import '../css/EditorPage.css';
import { editEvent } from '../actions';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { withRouter } from 'react-router';

import Map from '../components/Map';
import EventInfo from '../components/EventInfo';
import RaisedButton from 'material-ui/RaisedButton';

class EditorPage extends Component {
  state = {
    currentEvent: {}
  }

  constructor (props) {
    super(props);
    if(props.story.events.length > 0) {
      this.state.currentEvent = props.story.events[props.story.events.length-1]
    }
  }

  onEventEdit = (event, method=undefined) => {
    const storyId = this.props.story.id;
    method !== undefined ? this.props.editEvent(event, storyId, method) : this.props.editEvent(event, storyId);
  }

  markerAdded = (coordinates) => {
    console.log('from editorpage', coordinates);
  }

  render () {
    return (
      <div className="EditorPage">
        <div style={{
          position: 'absolute',
          height: '100%',
          overflowY: 'scroll'
        }}>
          <EventInfo
            event={this.state.currentEvent}
            onEventEdit={this.onEventEdit}
          />
          <div className="buttons">
            <RaisedButton label="Prev Event" primary={true} />
            <RaisedButton label="Next Event" primary={true} />
          </div>
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
  editEvent: (data, storyId, method) => dispatch(editEvent(data, storyId, method))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EditorPage));
