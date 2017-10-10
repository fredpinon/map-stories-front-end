import React, {Component} from 'react';

class StoryListItem extends Component {

  renderStoryAssets = () => {
    const { title, tagLine, editor } = this.props.story;
    return (
      <div>
        <p>{title}</p>
        <p>{tagLine}</p>
        <p>{editor}</p>
      </div>
    )
  }

  render() {
    return (
      <div className="StoryListItem">
        {this.renderStoryAssets()}
      </div>
    );
  }
}

export default StoryListItem;
