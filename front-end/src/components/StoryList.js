import React, {Component} from 'react';
import { Link } from 'react-router-dom';

import '../css/StoryList.css';
import StoryListItem from './StoryListItem'

class StoryList extends Component {

  renderListItem = () => {
    if (!this.props.stories) return null;
    return Object.keys(this.props.stories)
    .map(id => <StoryListItem key={id} story={this.props.stories[id]} renderEditor={this.props.renderEditor === false ? false : true}/>)
  }

  render() {
    return (
      <div className="StoryList">
        {this.renderListItem()}
      </div>
    );
  }
}

export default StoryList;
