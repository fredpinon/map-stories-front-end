import React, {Component} from 'react';
import { connect } from 'react-redux';
import Paper from 'material-ui/Paper';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

import { updateStory, deleteStory } from '../actions';

class StoryListItem extends Component {

  state = {
    openDelete: false,
    openPublish: false
  };

  openPublishDialog = () => {
    this.setState({openPublish: true});
  };

  closePublishDialog = () => {
    this.setState({openPublish: false});
  };

  openDeleteDialog = () => {
    this.setState({openDelete: true});
  };

  closeDeleteDialog = () => {
    this.setState({openDelete: false});
  };

  deleteStoryConfirm = () => {
    this.setState({openDelete: false});
    const storyId = this.props.story.id;
    this.props.deleteStory(storyId);
  };

  publishStoryConfirm = () => {
    this.setState({openPublish: false});
    const storyId = this.props.story.id;
    this.props.publishStory(storyId);
  };

  renderDeleteButton = () => {
    const actionsDelete = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={this.closeDeleteDialog}
        rippleColor="purple"
      />,
      <FlatButton
        label="Delete"
        primary={true}
        onClick={this.deleteStoryConfirm}
        rippleColor="purple"
      />,
    ];
    return (
      <div>
        <FlatButton
          label='DELETE'
          onClick={(e) => {
            e.preventDefault();
            this.setState({openDelete: true});;
          }}
          rippleColor="purple"
          primary={true}
          >
          <Dialog
            title="Are you sure you want to delete?"
            actions={actionsDelete}
            modal={true}
            open={this.state.openDelete}
          >
            Story cannot be restored later
          </Dialog>
        </FlatButton>
      </div>
    )
  }

  renderPublishButton = () => {
    const actionsPublish = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={this.closePublishDialog}
        rippleColor="purple"
      />,
      <FlatButton
        label="Publish"
        primary={true}
        onClick={this.publishStoryConfirm}
        rippleColor="purple"
      />,
    ];
    return (
      <FlatButton
        label='PUBLISH'
        onClick={(e) => {
          e.preventDefault();
          this.setState({openPublish: true});;
        }}
        rippleColor="purple"
        primary={true}
        >
        <Dialog
          title="Are you sure you want to publish?"
          actions={actionsPublish}
          modal={true}
          open={this.state.openPublish}
        >
        </Dialog>
      </FlatButton>
    )
  }

  renderButtons = () => {
    if (window.location.href.match('me/stories') !== null) {
      return (
        <div className='ButtonsRender'>
          {this.renderDeleteButton()}
          {this.renderPublishButton()}
        </div>
      )
    }
  }

  renderStoryAssets = () => {
    const { title, tagLine, editor } = this.props.story;
    return (
      <div className="ListItemPaper">
        <div className="ListItemDescription">
          <p>{title}</p>
          <p>{tagLine}</p>
          <p>{editor}</p>
        </div>
        <div className='Buttons'>
          {this.renderButtons()}
        </div>
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

const mapStateToProps = (state) => ({

});

const mapDispatchToProps = (dispatch) => ({
  publishStory: (storyId) => dispatch(updateStory(storyId, {published: true})),
  deleteStory: (storyId) => dispatch(deleteStory(storyId))
});

export default connect(mapStateToProps, mapDispatchToProps)(StoryListItem);
