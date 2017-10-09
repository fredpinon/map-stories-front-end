import React, {Component} from 'react';
import FacebookLogin from 'react-facebook-login';
import TiSocialFacebookCircular from 'react-icons/lib/ti/social-facebook-circular';

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
        textButton={null}
        icon={<TiSocialFacebookCircular />}
      />
    );
  }
}

export default LoginButton;
