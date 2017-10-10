import React, {Component} from 'react';
import '../css/EditorPage.css';

import Map from '../components/Map';
import EventInfo from '../components/EventInfo';

class EditorPage extends Component {

  render () {
    return (
      <div className="EditorPage">
        <Map/>
      </div>
    )
  }
}

export default EditorPage;
