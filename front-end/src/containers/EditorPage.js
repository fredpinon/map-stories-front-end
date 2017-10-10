import React, {Component} from 'react';
import '../css/EditorPage.css';

import MapContainer from './MapContainer';
import EventInfoContainer from '../components/EventInfoContainer';

class EditorPage extends Component {

  render () {
    return (
      <div className="EditorPage">
        <EventInfoContainer/>
      </div>
    )
  }
}

export default EditorPage;
