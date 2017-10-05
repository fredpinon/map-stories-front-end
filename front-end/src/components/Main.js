import React, {Component} from 'react';
import { Switch, Route } from 'react-router';
import '../css/Main.css';

import HomePage from './HomePage';
import Viewer from './Viewer';
import NoMatch from './NoMatch';

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
            path='/me'
            component={Viewer}
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
