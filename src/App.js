import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {BrowserRouter, Route, Link} from 'react-router-dom';
import './App.css';

const Home = () => (<h2>Home</h2>)

class App extends Component {
  render(){
  return (
      <MuiThemeProvider>
        <BrowserRouter>
          <div>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/form">Form</Link></li>
            </ul>
            <Route exact path="/" component={Home}/>
            <Route path="/form" component={MyForm}/>
          </div>
        </BrowserRouter>
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
