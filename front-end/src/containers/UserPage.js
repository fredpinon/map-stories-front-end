import React, {Component} from 'react';
import '../css/UserPage.css';

import { connect } from 'react-redux'
import { fetchUser } from '../actions'

class UserPage extends Component {

  componentWillMount() {
    this.props.loadUser();
  }

  render() {
    return (
      <div className="UserPage">
        I am the Userpage
      </div>
    );
  }
}

const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch) => ({
  loadUser: () => dispatch(fetchUser())
});

export default connect(mapStateToProps, mapDispatchToProps)(UserPage)
