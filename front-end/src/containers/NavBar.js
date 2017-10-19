import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';

import { connect } from 'react-redux';
import { logOutUser, fetchStoriesSearch, clearSearch, loginUser } from '../actions';

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
    this.props.loginUserToDb(userCredentials);
  }

 handleSignOut = () => {
  // localStorage.clear();
  // localStorage.removeItem('state');
  // localStorage.setItem('state', {});
  // console.log(localStorage.getItem('state'));
   this.props.logOut();
 }

 handleSearching = query => this.search(query);

 search = _.debounce((query) => {
    if (query.length > 2) this.props.searchStory(query);
    else this.props.clear();
  }, 500);

 render() {
    const { pathname } = this.props.location;
    const { token, picture } = this.props.user;
    return (
      <AppBar
        className="NavBar"
        title={<Link to='/'>Map Stories</Link>}
        showMenuIconButton={false}
        iconElementRight={
          token
          ? (
            <div className="LoggedInActions">
              {pathname === '/' ? <Search passQuery={this.handleSearching}/> : null}
              <img className="ProfilePic" src={picture} alt="profilePic"/>
              <Logged handleSignOut={this.handleSignOut}/>
            </div>
          ) : (
            <div className="LoggedInActions">
              {pathname === '/' ? <Search passQuery={this.handleSearching}/> : null}
              <LoginButton handleLogin={this.handleLogin}/>
            </div>
          )}
        />
      );
    }
  }

 const mapStateToProps = (state) => ({
    editors: state.entities.editors,
    page: state.pages.storiesList,
    user: state.authentication,
  });

 const mapDispatchToProps = (dispatch) => ({
    loginUserToDb : (userCredentials) => dispatch(loginUser(userCredentials)),
    logOut: () => dispatch(logOutUser()),
    searchStory: (query) => dispatch(fetchStoriesSearch(query)),
    clear: () => dispatch(clearSearch())
  });

 export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NavBar));
