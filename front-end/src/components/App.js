import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom'
import '../css/App.css';

import NavBar from './NavBar';
import Main from './Main';

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
