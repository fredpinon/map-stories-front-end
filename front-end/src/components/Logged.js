import React, {Component} from 'react';
import { withRouter } from 'react-router';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

class Logged extends Component {

  redirectToMyStories = () => {
    this.props.history.push('/me/stories');
  }

  render() {
    return (
      <div className="Logged">
      <IconMenu
        iconStyle={{fill: 'white'}}
        iconButtonElement={
          <IconButton><MoreVertIcon/></IconButton>
        }
        targetOrigin={{horizontal: 'right', vertical: 'top'}}
        anchorOrigin={{horizontal: 'right', vertical: 'top'}}
        >
        <MenuItem
          primaryText="My Stories"
          onClick={this.redirectToMyStories}
          />
        <MenuItem
          primaryText="Sign out"
          onClick={this.props.handleSignOut}
          />
      </IconMenu>
      </div>
    );
  }
}

export default withRouter(Logged);
