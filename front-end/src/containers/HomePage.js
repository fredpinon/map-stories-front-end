import React, {Component} from 'react';
import '../css/HomePage.css';

import { connect } from 'react-redux';
import { fetchStoriesHomePage } from '../actions';

class HomePage extends Component {

  componentWillMount() {
    this.props.loadStories();
  }

  render() {
    return (
      <div className="HomePage">
        I am the homepage
      </div>
    );
  }
}

const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch) => ({
  loadStories: () => dispatch(fetchStoriesHomePage())
});

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
