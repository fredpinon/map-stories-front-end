import React, {Component} from 'react';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

class Logged extends Component {

  render() {
    return (
      <div className="Logged">
      <IconMenu

        iconButtonElement={
          <IconButton><MoreVertIcon/></IconButton>
        }
        targetOrigin={{horizontal: 'right', vertical: 'top'}}
        anchorOrigin={{horizontal: 'right', vertical: 'top'}}
        >
        <MenuItem primaryText="Profile" />
        <MenuItem
          primaryText="Sign out"
          onClick={this.props.handleSignOut}
          />
      </IconMenu>
      </div>
    );
  }
}

export default Logged;
