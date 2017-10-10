import React, {Component} from 'react';
import '../css/EditorPage.css';

import Map from '../components/Map';
import EventInfoContainer from '../components/EventInfoContainer';

class EditorPage extends Component {

  render () {
    return (
      <div className="EditorPage">
        <EventInfoContainer/>
        <Map />
      </div>
    )
  }
}

export default EditorPage;
