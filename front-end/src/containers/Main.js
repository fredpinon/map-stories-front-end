import React, {Component} from 'react';
import { withRouter, Switch, Route } from 'react-router';
import '../css/Main.css';

import { connect } from 'react-redux';

import HomePage from './HomePage';
import Viewer from './Viewer';
import UserPage from './UserPage';
import EditorPage from './EditorPage';
import CreatePage from './CreatePage';
import NoMatch from '../components/NoMatch';
import PrivateRoute from '../components/PrivateRoute';

import Snackbar from 'material-ui/Snackbar';

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
            path="/me/createstory"
            component={CreatePage}
          />
          <PrivateRoute
            token={this.props.token}
            path="/me/editstory"
            component={EditorPage}
          />
          <Route
            component={NoMatch}
          />
        </Switch>
        <Snackbar
          open={(new Date()).getTime() <= this.props.errors.errorTime}
          message={this.props.errors.errorMessage}
          autoHideDuration={5000}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.authentication.token,
  errors: state.errors
});

const mapDispatchToProps = (dispatch) => ({});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
