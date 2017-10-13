import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';

import { connect } from 'react-redux';
import { storeCredentials, logOutUser, fetchStoriesSearch, clearSearch  } from '../actions';

import '../css/NavBar.css';
import LoginButton from '../components/LoginButton';
import Logged from '../components/Logged';
import Search from '../components/Search';

import AppBar from 'material-ui/AppBar';

const _ = require('underscore');

class NavBar extends Component {

  handleLogin = (response) => {
    const userCredentials = {
      token: response.accessToken,
      email: response.email,
      name: response.name,
      picture: response.picture.data.url,
    };
    this.props.logIn(userCredentials);
  }

  handleSignOut = () => this.props.logOut();

  handleSearching = e => this.search(e.target.value);

  search = _.debounce((query) => {
    if (query.length > 2) this.props.searchStory(query);
    else this.props.clear();
  }, 500);

  render() {
    const { pathname } = this.props.location;
    const search = (
      <TextField
        className="Search"
        hintText="search..."
        onChange={this.handleSearching}
      />
    );
    return (
      <AppBar
        className="NavBar"
        title={<Link to='/'>Map Stories</Link>}
        showMenuIconButton={false}
        iconElementRight={
          this.props.userCredentials.token
          ? (
            <div className="LoggedInActions">
              {pathname === '/' ? search : null}
              <p>{this.props.userCredentials.name}</p>
              <Logged handleSignOut={this.handleSignOut}/>
            </div>
          ) : (
            <div className="LoggedInActions">
              {pathname === '/' ? search : null}
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

  export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NavBar));
