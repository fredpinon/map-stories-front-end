import React, {Component} from 'react';

import { connect } from 'react-redux'
import { fetchUser } from '../actions'

import '../css/Viewer.css';

class Viewer extends Component {

  componentWillMount() {
    this.props.loadUser();
    console.log('in the component');
  }

  render() {
    return (
      <div className="Viewer">
        I am the viewer
      </div>
    );
  }
}

const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch) => ({
  loadUser: () => dispatch(fetchUser())
});

export default connect(mapStateToProps, mapDispatchToProps)(Viewer)
