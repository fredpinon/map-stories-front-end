import React, {Component} from 'react';
import FacebookLogin from 'react-facebook-login';
import TiSocialFacebookCircular from 'react-icons/lib/ti/social-facebook-circular';
import '../css/LoginButton.css';
import playbutton from '../resources/playbutton.svg';
class LoginButton extends Component {

  responseFacebook = (response) => {
    this.props.handleLogin(response);
  }

  render() {
    const style = {color:'white'};
    return (
      <FacebookLogin
        cssClass="LoginButton"
        appId="1365727290221575"
        autoLoad={false}
        fields="name,email,picture.type(large)"
        scope="public_profile, email"
        callback={this.responseFacebook}
        textButton="LOG IN WITH FACEBOOK"
        style={{ 'text-align': 'center'}}
        // icon="https://facebookbrand.com/wp-content/themes/fb-branding/prj-fb-branding/assets/images/fb-art.png"
      />
    );
  }
}

export default LoginButton;
