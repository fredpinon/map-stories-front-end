import React, {Component} from 'react';
import Paper from 'material-ui/Paper';

class StoryListItem extends Component {

  renderStoryAssets = () => {
    const { title, tagLine, editor } = this.props.story;

    return (
      <div className="ListItemDescription">
        <p>{title}</p>
        <p>{tagLine}</p>
        <p>{editor}</p>
      </div>
    )
  }

  render() {
    const style = {
      height: 80,
      width: '100%'
    };
    return (
      <div className="StoryListItem">
        <Paper className="Paper" style={style} zDepth={1} children={this.renderStoryAssets()}/>
      </div>
    );
  }
}

// return (
//   <div>
//     <p>{title}</p>
//     <p>{tagLine}</p>
//     <p>{editor}</p>
//   </div>
// )

export default StoryListItem;
