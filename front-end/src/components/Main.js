import React, {Component} from 'react';
import { Switch, Route } from 'react-router';
import '../css/Main.css';

import HomePage from './HomePage';
import Viewer from './Viewer';

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
        </Switch>
      </div>
    );
  }
}

export default Main;
