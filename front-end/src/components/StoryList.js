import React, {Component} from 'react';
import { Link } from 'react-router-dom';

import '../css/StoryList.css';
import StoryListItem from './StoryListItem'

class StoryList extends Component {

  renderListItem = () => {
    if (!this.props.stories) return null;
    return Object.keys(this.props.stories)
    .map(id => {
      const location = {pathname: `/story/${id}`}
      return (
        <Link key={id} to={location}>
          <StoryListItem story={this.props.stories[id]}/>
        </Link>
      )
    })
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
