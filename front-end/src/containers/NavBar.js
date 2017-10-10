import React, {Component} from 'react';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import { storeCredentials, logOutUser } from '../actions';

import '../css/NavBar.css';
import LoginButton from '../components/LoginButton';
import Logged from '../components/Logged';

import AppBar from 'material-ui/AppBar';

class NavBar extends Component {

  handleLogin = (response) => {
    const userCredentials = {
      token: response.accessToken,
      email: response.email,
      name: response.name,
      picture: response.picture.data.url,
    };
    this.props.logIn(userCredentials);
    // post to db?
  }

  handleSignOut = () => {
    this.props.logOut();
  }

  render() {
    return (
        <AppBar
          className="NavBar"
          title={<Link to='/'>Map Stories</Link>}
          showMenuIconButton={false}
          iconElementRight={this.props.userCredentials.token
            ? (
              <div className="LoggedInActions">
                <p>{this.props.userCredentials.name}</p>
                <Logged handleSignOut={this.handleSignOut}/>
              </div>
            ) : (
              <LoginButton handleLogin={this.handleLogin}/>
            )}
        />
    );
  }
}

const mapStateToProps = (state) => ({
  userCredentials: state.authentication,
});

const mapDispatchToProps = (dispatch) => ({
  logIn: (userCredentials) => dispatch(storeCredentials(userCredentials)),
  logOut: () => dispatch(logOutUser())
});

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
