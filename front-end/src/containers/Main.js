import React, {Component} from 'react';
import { withRouter, Switch, Route } from 'react-router';
import '../css/Main.css';

import { connect } from 'react-redux';

import HomePage from './HomePage';
import Viewer from './Viewer';
import UserPage from './UserPage';
import EditorPage from './EditorPage';
import NoMatch from '../components/NoMatch';
import PrivateRoute from '../components/PrivateRoute';

class Main extends Component {
  render() {
    return (
      <div className="Main">
        <Switch>
          <Route
            exact path="/"
            component={HomePage}
          />
          <Route
            path="/story/:storyId"
            component={Viewer}
          />
          <PrivateRoute
            token={this.props.token}
            path="/me/stories"
            component={UserPage}
          />
          <PrivateRoute
            token={this.props.token}
            path="/me/editstory/:storyId"
            component={EditorPage}
          />
          <Route
            component={NoMatch}
          />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.authentication.token,
});

const mapDispatchToProps = (dispatch) => ({});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
