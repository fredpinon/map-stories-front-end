import React, {Component} from 'react';
import '../css/Viewer.css';

import { connect } from 'react-redux';
import { fetchSingleStory } from '../actions';
import Chip from 'material-ui/Chip';
import EventCard from '../components/EventCard';

class Viewer extends Component {

  componentWillMount() {
    if (!this.props.match.params.storyId) return null;
    this.props.loadStory(this.props.match.params.storyId);
  }

  renderTitles = () => {
    const title = 'Thai Boxing in the 17th Century';
    const tagline = 'A brief history of Thai Boxing';
    const styles = {
      titles: {
        marginTop: 15,
        marginLeft: 15,
      }
    }
    return (
        <Chip className="Titles" style={styles.titles}>
          <span className="Title">{title}: </span>
          <span className="Tagline">{tagline}</span>
        </Chip>
    )
  }

  renderEvents = () => {
    const events = ['event a', 'event b', 'event c', 'event d', 'event e'];
    return events.map((event, i) => {
      if (i < 2) return <EventCard key={i} data={event} expanded={true}/>
      else return <EventCard key={i} data={event}/>
    });
  }

  render() {
    return (
      <div className="Viewer">
        <div className="MapViewer">
          {this.renderTitles()}
          <div className="EventsContainer">
            {this.renderEvents()}
          </div>
        </div>
        <div className="Progress">

        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = (dispatch) => ({
  loadStory: (storyId) => dispatch(fetchSingleStory(storyId))
});

export default connect(mapStateToProps, mapDispatchToProps)(Viewer);
