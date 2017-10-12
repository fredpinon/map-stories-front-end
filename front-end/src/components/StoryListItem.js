import React, {Component} from 'react';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

class StoryListItem extends Component {

  state = {
    openDelete: false,
    openPublish: false
  };

  handleOpenPublish = () => {
    this.setState({openPublish: true});
  };

  handleClosePublish = () => {
    this.setState({openPublish: false});
  };

  handleOpenDelete = () => {
    this.setState({openDelete: true});
  };

  handleCloseDelete = () => {
    this.setState({openDelete: false});
  };


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
    const actionsDelete = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={this.handleCloseDelete}
      />,
      <FlatButton
        label="Delete"
        primary={true}
        onClick={this.handleCloseDelete}
      />,
    ];
    const actionsPublish = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={this.handleClosePublish}
      />,
      <FlatButton
        label="Publish"
        primary={true}
        onClick={this.handleClosePublish}
      />,
    ];

    const style = {
      height: 80,
      width: '100%'
    };

    return (
      <div className="StoryListItem">
        <Paper className="Paper" style={style} zDepth={1} children={this.renderStoryAssets()}/>
        <div className='Buttons'>
          <RaisedButton
            label='DELETE'
            onClick={(e) => {
              e.preventDefault();
              this.setState({openDelete: true});;
            }}
          >
            <Dialog
           title="Are you sure you want to delete?"
           actions={actionsDelete}
           modal={true}
           open={this.state.openDelete}
            >
            Story cannot be restored later
            </Dialog>
          </RaisedButton>
          <RaisedButton
            label='PUBLISH'
            onClick={(e) => {
              e.preventDefault();
              this.setState({openPublish: true});;
            }}
          >
            <Dialog
           title="Are you sure you want to publish?"
           actions={actionsPublish}
           modal={true}
           open={this.state.openPublish}
            >
            </Dialog>
          </RaisedButton>
        </div>
      </div>
    );
  }
}


export default StoryListItem;
