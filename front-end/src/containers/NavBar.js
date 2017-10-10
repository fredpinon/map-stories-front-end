import React, {Component} from 'react';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import { storeCredentials, logOutUser, fetchStoriesSearch, clearSearch  } from '../actions';

import '../css/NavBar.css';
import LoginButton from '../components/LoginButton';
import Logged from '../components/Logged';

import AppBar from 'material-ui/AppBar';
import TextField from 'material-ui/TextField';

class NavBar extends Component {

  // state = {
  //   searchTerm: '',
  // }

  handleLogin = (response) => {
    const userCredentials = {
      token: response.accessToken,
      email: response.email,
      name: response.name,
      picture: response.picture.data.url,
    };
    this.props.logIn(userCredentials);
    // post to db
  }

  handleSignOut = () => {
    this.props.logOut();
  }


  handleSearching = e => {
    // dispatch searchStory
    // debounce
    // if its empty -> dispatch clear array
    if (e.target.value.length > 2) this.props.searchStory(e.target.value)
    else this.props.clear()

  };

  render() {
    // console.log('searched stories', this.props.page);

    const search = (
      <TextField
        className="Search"
        hintText="search..."
        // value = {this.state.searchTerm}
        onChange= {this.handleSearching}
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
  page: state.pages.storiesList
});

const mapDispatchToProps = (dispatch) => ({
  logIn: (userCredentials) => dispatch(storeCredentials(userCredentials)),
  logOut: () => dispatch(logOutUser()),
  searchStory: (query) => dispatch(fetchStoriesSearch(query)),
  clear: () => dispatch(clearSearch())
});

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
