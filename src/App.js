import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {BrowserRouter, Route, Link, Switch, Redirect} from 'react-router-dom';
import './App.css';
import MyForm from './myform';

const Home = () => (<h2>Home</h2>)

const NoMatch = ({ location }) => (
  <div>
    <h3>Page not found: {location.pathname}</h3>
  </div>
)


class App extends Component {
  render(){
  return (
      <MuiThemeProvider>
        <div>
        <BrowserRouter>
          <div>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/form">Form</Link></li>
            </ul>
            <Switch>
            <Route exact path="/" component={Home}/>
            <Route path="/form" component={MyForm}/>
            <Redirect from="/old-form" to="/form"/>
            <Route component={NoMatch}/>
          </Switch>
          </div>
        </BrowserRouter>
        <div>
          <AppBar
            title="Contact App"
            iconClassNameRight="muidocs-icon-navigation-expand-more"/>
          </div>
        </div>
      </MuiThemeProvider>
    )
  }
}

export default App;
