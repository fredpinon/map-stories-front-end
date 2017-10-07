import React, {Component} from 'react';

class LoginButton extends Component {
  render() {
    return (
      <div className="LoginButton">
        <button onClick={this.props.handleLogin}>LOG IN</button>
      </div>
    );
  }
}

export default LoginButton;
