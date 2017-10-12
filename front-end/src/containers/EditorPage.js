import React, {Component} from 'react';
import '../css/EditorPage.css';

import Map from '../components/Map';
import EventInfo from '../components/EventInfo';

class EditorPage extends Component {

  markerAdded = (coordinates) => {
    console.log('from editorpage', coordinates);
  }

  render () {
    return (
      <div className="EditorPage">
        <Map onMarkerAdded={this.markerAdded}/>
      </div>
    )
  }
}

export default EditorPage;
