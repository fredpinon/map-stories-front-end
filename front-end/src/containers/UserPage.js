import React, {Component} from 'react';
import '../css/UserPage.css';

import { connect } from 'react-redux';
import { fetchStoriesUserPage } from '../actions';

class UserPage extends Component {

  componentWillMount() {
    this.props.loadStories();
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
  loadStories: () => dispatch(fetchStoriesUserPage())
});

export default connect(mapStateToProps, mapDispatchToProps)(UserPage);
