import React, {Component} from 'react';
import FacebookLogin from 'react-facebook-login';

class LoginButton extends Component {

  responseFacebook = (response) => {
    this.props.handleLogin(response);
  }

  render() {
    return (
      <div className="LoginButton">
        <FacebookLogin
          appId="1365727290221575"
          autoLoad={false}
          fields="name,email,picture.type(large)"
          scope="public_profile, email"
          callback={this.responseFacebook}
        />
      </div>
    );
  }
}

// <button onClick={this.props.handleLogin}>LOG IN</button>
export default LoginButton;
