import React, {Component} from 'react';
import '../css/EditorPage.css';

import Map from '../components/Map';
import EventInfoContainer from '../components/EventInfoContainer';

class EditorPage extends Component {

  markerAdded = (coordinates) => {
    console.log('from editorpage', coordinates);
  }

  render () {
    return (
      <div className="EditorPage">
        <EventInfoContainer/>
        <Map markers={[{lng: 2.0943817138674774, lat: 41.37442896404224}, {lng: 2.097128295907737, lat: 41.49386011885025}]} onMarkerAdded={this.markerAdded}/>
      </div>
    )
  }
}

export default EditorPage;
