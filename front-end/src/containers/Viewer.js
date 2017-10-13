import React, {Component} from 'react';
import '../css/Viewer.css';

import { connect } from 'react-redux';
import { fetchSingleStory } from '../actions';
import { Card, CardHeader } from 'material-ui/Card';
import EventCard from '../components/EventCard';
import Map from '../components/Map';
import Slider from 'material-ui/Slider';
import RaisedButton from 'material-ui/RaisedButton';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon'
import { purple500 } from 'material-ui/styles/colors';
import { Link } from 'react-router-dom';
// import playbutton from '../resources/playbutton.svg';
// import playbutton from 'material-ui/svg-icons/action/play_circle_filled'
import Subheader from 'material-ui/Subheader';
// import Slider from 'material-ui-slider-label/Slider';
import { cyan500 } from 'material-ui/styles/colors';


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
          <div className="EventsContainerWrapper">
          <div className="EventsContainer">
            {this.renderTitles()}
            {this.renderEvents()}
          </div>
          </div>
          <Map onMarkerAdded={this.markerAdded} editorPage={false}/>
        </div>
        <div className="SliderContainer">
          <i class="material-icons md-36 purple">play_circle_filled</i>
          <Slider
            defaultValue={5 / 100}
            min={0}
            max={1}
            step={5 / 100}
            value={0.5}
            // onChange={onChange}
            label={
              <div style={this.styles.labelStyleOuter}>
                <div style={this.styles.labelStyleInner}>
                  {0.5}
                </div>
              </div>
            }
          />
      </div>
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
