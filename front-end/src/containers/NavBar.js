import React, {Component} from 'react';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import { storeCredentials } from '../actions';

import '../css/NavBar.css';
import LoginButton from '../components/LoginButton';

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

  render() {
    return (
      <div className="NavBar">
        <div className="logo">
          <Link to='/'>Map Stories</Link>
        </div>
        <LoginButton handleLogin={this.handleLogin}/>
      </div>
    );
  }
}

const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch) => ({
  logIn: (userCredentials) => dispatch(storeCredentials(userCredentials))
});

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
