import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom'
import '../css/App.css';

import NavBar from '../containers/NavBar';
import Main from '../containers/Main';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <NavBar/>
          <Main/>
        </div>
      </Router>
    );
  }
}

export default App;
