import React, {Component} from 'react';
import '../css/Viewer.css';

import { connect } from 'react-redux';
import { fetchSingleStory } from '../actions';
import { Card, CardHeader } from 'material-ui/Card';
// import Chip from 'material-ui/Chip';
import EventCard from '../components/EventCard';

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

  renderEvents = () => {
    if (!this.props.stories || !this.props.match.params.storyId) return null;
    const story = this.props.stories[this.props.match.params.storyId];
    const {events} = story;
    return events.map((event, i) => <EventCard key={i} data={event}/>);
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
