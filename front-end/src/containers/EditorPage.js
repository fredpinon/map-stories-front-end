import React, {Component} from 'react';
import '../css/EditorPage.css';

import Map from '../components/Map';
import EventInfo from '../components/EventInfo';
import RaisedButton from 'material-ui/RaisedButton';

class EditorPage extends Component {

  render () {
    const styleButton = {
      marginRight: 30,
      marginBottom: 30,
    }
    return (
      <div className="EditorPage">
        <EventInfo/>
        <div className="buttons">
          <RaisedButton label="Save Event" primary={true} style={styleButton}/>
          <RaisedButton label="Save and Publish Story" primary={true} style={styleButton}/>
        </div>
      </div>
    )
  }
}

export default EditorPage;
