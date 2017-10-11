import React, {Component} from 'react';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

class StoryListItem extends Component {

  state = {
    open: false,
  };

  handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
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

  // onClickedButton (e) {
  //   this.handleOpen;
  //   e.preventDefault();
  // }

  render() {
    const actionsDelete = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={this.handleClose}
      />,
      <FlatButton
        label="Delete"
        primary={true}
        onClick={this.handleClose}
      />,
    ];
    const actionsPublish = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={this.handleClose}
      />,
      <FlatButton
        label="Publish"
        primary={true}
        onClick={this.handleClose}
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
              this.setState({open: true});;
            }}
          >
            <Dialog
           title="Are you sure you want to delete?"
           actions={actionsDelete}
           modal={true}
           open={this.state.open}
            >
            Story cannot be restored later
            </Dialog>
          </RaisedButton>
          <RaisedButton
            label='PUBLISH'
            onClick={(e) => {
              e.preventDefault();
              this.setState({open: true});;
            }}
          >
            <Dialog
           title="Are you sure you want to publish?"
           actions={actionsPublish}
           modal={true}
           open={this.state.open}
            >
            </Dialog>
          </RaisedButton>
        </div>
      </div>
    );
  }
}


export default StoryListItem;
