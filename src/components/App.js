import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import '../css/App.css';

import NavBar from '../containers/NavBar';
import Main from '../containers/Main';

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: '#673AB7',
  },
  menuItem: {
    selectedTextColor: '#673AB7',
  },
});

class App extends Component {
  render() {
    return (
      <Router>
        <MuiThemeProvider muiTheme={muiTheme}>
          <div className="App">
            <NavBar/>
            <Main/>
          </div>
        </MuiThemeProvider>
      </Router>
    );
  }
}

export default App;
