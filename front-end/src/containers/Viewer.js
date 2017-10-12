import React, {Component} from 'react';
import '../css/Viewer.css';

import { connect } from 'react-redux';
import { fetchSingleStory } from '../actions';
import { Card, CardHeader } from 'material-ui/Card';
import EventCard from '../components/EventCard';
import Map from '../components/Map';


class Viewer extends Component {

  componentWillMount() {
    if (!this.props.match.params.storyId) return null;
    this.props.loadStory(this.props.match.params.storyId);
  }

  renderTitles = () => {
    const story = this.props.stories[this.props.match.params.storyId];
    const { title, tagLine } = story;
    const styles = {
      title: {
        fontWeight: 'bold',
      },
      subtitle: {
        fontWeight: 'bold',
        fontStyle: 'italic',
      }
    }
    return (
      <Card className="Titles">
        <CardHeader
          title={title}
          titleStyle={styles.title}
          subtitle={tagLine}
          subtitleStyle={styles.subtitle}
        />
      </Card>
    )
  }

  markerAdded = (coordinates) => {
    console.log('from editorpage', coordinates);
  }

  renderEvents = () => {
    const { storyId } = this.props.match.params
    if (!this.props.stories[storyId].events) return null;
    const events = this.props.stories[storyId].events;
    return events.map((event, i) => <EventCard key={i} data={event}/>);
  }


  render() {
    return (
      <div className="Viewer">
        <div className="MapViewer">
          <div style={{
            position: 'absolute',
            height: '100%',
            overflowY: 'scroll'
          }}>
          <div className="EventsContainer">
            {this.renderTitles()}
            { this.renderEvents() }
          </div>
          </div>
          <Map onMarkerAdded={this.markerAdded}/>
        </div>
        <div className="SliderContainer"></div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  stories: state.entities.stories,
});

const mapDispatchToProps = (dispatch) => ({
  loadStory: (storyId) => dispatch(fetchSingleStory(storyId))
});

export default connect(mapStateToProps, mapDispatchToProps)(Viewer);
