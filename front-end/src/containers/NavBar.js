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

  renderLogStatus = () => {
    if (this.props.userCredentials.token) return <p>logged in</p>
    else return <LoginButton handleLogin={this.handleLogin}/>
  }

  render() {
    return (
      <div className="NavBar">
        <div className="logo">
          <Link to='/'>Map Stories</Link>
        </div>
        {this.renderLogStatus()}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  userCredentials: state.authentication,
});

const mapDispatchToProps = (dispatch) => ({
  logIn: (userCredentials) => dispatch(storeCredentials(userCredentials))
});

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
