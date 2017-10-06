import React, {Component} from 'react';
import { Switch, Route } from 'react-router';
import '../css/Main.css';

import HomePage from './HomePage';
import Viewer from './Viewer';
import NoMatch from '../components/NoMatch';
import UserPage from './UserPage';
import PrivateRoute from '../components/PrivateRoute';

class Main extends Component {
  render() {
    return (
      <div className="Main">
        <Switch>
          <Route
            exact path='/'
            component={HomePage}
          />
          <Route
            path='/story'
            component={Viewer}
          />
          <PrivateRoute
            token={'undefined'}
            path="/me/stories"
            component={UserPage}
          />
          <Route
            component={NoMatch}
          />
        </Switch>
      </div>
    );
  }
}

export default Main;
