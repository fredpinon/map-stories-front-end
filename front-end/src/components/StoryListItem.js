import React, {Component} from 'react';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';

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
        <div className='Buttons'>
          <RaisedButton
            target='_blank'
            label='DELETE'
            onClick={(e) => {
              e.preventDefault();
            }}
          />
          <RaisedButton
            target='_blank'
            label='PUBLISH'
            onClick={(e) => {
              e.preventDefault();
            }}
          />
        </div>
      </div>
    );
  }
}


export default StoryListItem;
