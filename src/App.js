import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import './App.css';

class App extends Component {
  render(){
  return (
      <MuiThemeProvider>
        <div>
          <AppBar
            title="Contact App"
            iconClassNameRight="muidocs-icon-navigation-expand-more"/>
        </div>
      </MuiThemeProvider>
    )
  }
}

export default App;
