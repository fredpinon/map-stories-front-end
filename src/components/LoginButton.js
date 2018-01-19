import React, {Component} from 'react';
import FacebookLogin from 'react-facebook-login';
import '../css/LoginButton.css';

class LoginButton extends Component {

  responseFacebook = (response) => {
    this.props.handleLogin(response);
  }

  render() {
    return (
      <FacebookLogin
        cssClass="LoginButton"
        appId="1365727290221575"
        autoLoad={false}
        fields="name,email,picture.type(large)"
        scope="public_profile, email"
        callback={this.responseFacebook}
        textButton="Login with Facebook"
      />
    );
  }
}

export default LoginButton;
