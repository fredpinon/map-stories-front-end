import React, {Component} from 'react';
import '../css/EditorPage.css';

import Map from '../components/Map';
import EventInfo from '../components/EventInfo';
import RaisedButton from 'material-ui/RaisedButton';

class EditorPage extends Component {

  markerAdded = (coordinates) => {
    console.log('from editorpage', coordinates);
  }

  render () {
    const styleButton = {
      marginRight: 30,
      marginBottom: 30,
    }
    return (
      <div className="EditorPage">
        <EventInfo/>
        <Map onMarkerAdded={this.markerAdded}/>
      </div>
    )
  }
}

export default EditorPage;
