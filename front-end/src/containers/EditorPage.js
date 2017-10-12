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

  render () {
    return (
      <div className="EditorPage">
        <EventInfo/>
        <div className="buttons">
          <RaisedButton label="Next Event" primary={true} onClick={this.saveStory}/>
          <Link to={'/me/stories'}>
            <RaisedButton label="Publish Story" primary={true} onClick={this.saveStory}/>
          </Link>
      </div>
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
