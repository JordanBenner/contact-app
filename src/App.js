import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import MenuItem from 'material-ui/MenuItem';
import {BrowserRouter, Route, Link, Switch, Redirect} from 'react-router-dom';
import './App.css';
import MyForm from './myform';
// navbar burger
import MoreIcon from 'material-ui/svg-icons/navigation/menu';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
// homepage list
import {List, ListItem} from 'material-ui/List';
import ActionGrade from 'material-ui/svg-icons/action/grade';
import {pinkA200} from 'material-ui/styles/colors';
// delete contact
import Gravatar from 'react-gravatar';

import Delete from './delete';

const Home = () => {
  var contacts = localStorage.contacts || '[]';
  // var contacts = localStorage.removeItem || '[]';
  // localStorage.clear();
  contacts = JSON.parse(contacts);

  return (
    <div>
      <h2>Contacts</h2>
      <ListContacts contacts={contacts}/>
    </div>
  )
}

const NoMatch = ({ location }) => (
  <div>
    <h3>Page not found: {location.pathname}</h3>
  </div>
)
const Article = ({ match }) => (
  <div>
    <h3>Article Slug: {match.params.slug}</h3>
  </div>
)

const NavMenu = (props) => (
  <IconMenu {...props} iconButtonElement={
      <IconButton><MoreIcon color={'white'}/></IconButton>
    }
    targetOrigin={{horizontal: 'right', vertical: 'top'}}
    anchorOrigin={{horizontal: 'right', vertical: 'top'}}
    >
    <MenuItem value={1}><Link to="/">Home</Link></MenuItem>
    <MenuItem value={2}><Link to="/form">Form</Link></MenuItem>
  </IconMenu>
)

const ListContacts = (props) => (
  <div>
    <List>
      {props.contacts.map((c, index) => {
        return (
          <ListItem
            key={index}
            primaryText={c.name}
            rightIcon={<ActionGrade color={pinkA200} />}
            leftAvatar={<Gravatar email={c.email} size={40} />}
          />
        )
      })}
    </List>
  </div>
);


class App extends Component {
  constructor(props) {
   super(props);
   this.state = {value: 2};
 }

  render(){
  return (
      <MuiThemeProvider>
        <div>
          <BrowserRouter>
            <div>
              <AppBar
                title="Contact App"
                iconClassNameRight="muidocs-icon-navigation-expand-more"
                iconElementLeft={<NavMenu/>}/>
              <Switch>
              <Route exact path="/" component={Home}/>
              <Route path="/form" component={MyForm}/>
              <Route path="/delete/:index" component={Delete}/>
              <Redirect from="/old-form" to="/form"/>
              <Route path="/article/:slug" component={Article}/>
              <Route component={NoMatch}/>
            </Switch>
            </div>
          </BrowserRouter>

        </div>
      </MuiThemeProvider>
    )
  }
}

export default App;
