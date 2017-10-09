import React, {Component} from 'react';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import { storeCredentials, logOutUser, fetchStoriesSearch  } from '../actions';

import '../css/NavBar.css';
import LoginButton from '../components/LoginButton';
import Logged from '../components/Logged';

import AppBar from 'material-ui/AppBar';
import TextField from 'material-ui/TextField';

class NavBar extends Component {

  state = {
    searchTerm: '',
  }

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

  handleKeyPress = e => {
    if (e.key === 'Enter' && this.state.searchTerm !== '') {
      this.props.searchStory(this.state.searchTerm);
    }
  }

  handleSearching = e => this.setState({searchTerm: e.target.value});

  render() {
    const search = (
      <TextField
        className="Search"
        hintText="search..."
        value = {this.state.searchTerm}
        onChange= {this.handleSearching}
        onKeyPress={this.handleKeyPress}
      />
    )
    return (
        <AppBar
          className="NavBar"
          title={<Link to='/'>Map Stories</Link>}
          showMenuIconButton={false}
          iconElementRight={
            this.props.userCredentials.token
            ? (
              <div className="LoggedInActions">
                {search}
                <p>{this.props.userCredentials.name}</p>
                <Logged handleSignOut={this.handleSignOut}/>
              </div>
            ) : (
              <div className="LoggedInActions">
                {search}
                <LoginButton handleLogin={this.handleLogin}/>
              </div>
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
  logOut: () => dispatch(logOutUser()),
  searchStory: (query) => dispatch(fetchStoriesSearch(query))
});

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
