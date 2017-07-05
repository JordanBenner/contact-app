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
import Edit from './edit';
import SearchBar from 'material-ui-search-bar'
import database, {auth, User} from './firebase'

class Home extends Component {
  constructor (props) {
    super(props);

    this.read_data();
    this.full_contact_list = [];
    this.state = {
      contacts: this.filter(),
      searchTerm: ''
    };
  }

  read_data () {
    console.log('checking for data');

    if (User.user) {
      database.ref('contacts/' + User.user.uid)
        .once('value').then((contacts) => {
          this.full_contact_list = contacts.val();
          this.setState({contacts: this.filter(this.searchTerm)});
        });
    } else {
      setTimeout(() => { this.read_data() }, 300);
    }
  }

  // method that recieves action, and sets off state
  searchUpdated(term) {
    console.log(term);
    this.setState({searchTerm: term});

    var filter_contacts = this.filter(term);
    this.setState({contacts: filter_contacts});
  }

  filter (term) {
    var matched = [];
    this.full_contact_list.forEach(function (c, index) {
      c.index = index;
      if (term) {
        if (c.name && c.name.toLowerCase().search(term.toLowerCase()) > -1) {
          matched.push(c);
        } else if (c.email && c.email.toLowerCase().search(term.toLowerCase()) > -1) {
          matched.push(c);
        } else if (c.phone && c.phone.toLowerCase().search(term.toLowerCase()) > -1) {
          matched.push(c);
        } else if (c.address && c.address.toLowerCase().search(term.toLowerCase()) > -1) {
          matched.push(c);
        } else if (c.city && c.city.toLowerCase().search(term.toLowerCase()) > -1) {
          matched.push(c);
        } else if (c.state && c.state.toLowerCase().search(term.toLowerCase()) > -1) {
          matched.push(c);
        } else if (c.zip && c.zip.toLowerCase().search(term.toLowerCase()) > -1) {
          matched.push(c);
        }
      } else {
        matched.push(c);
      }
    });
    return matched;
  }

  render () {
    return (
      <div className='home-contact'>
        <h2>Contacts</h2>
        <SearchBar onChange={(term) => this.searchUpdated(term)} onRequestSearch={() => console.log('requested')} style={{ margin: '0 auto', maxWidth: 800}}/>
        <ListContacts contacts={this.state.contacts} history={this.props.history}/>
      </div>
    )
  }
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
// repopulate list
class ListContacts extends Component {
  goto(index) {
    console.log(index);
    this.props.history.push('/edit/' + index);
  }

  render() {
    return (
      <div>
        <List>
          {this.props.contacts.map((c) => {
            return (
              <ListItem
                key={c.index}
                primaryText={c.name}
                rightIcon={<ActionGrade color={pinkA200} />}
                leftAvatar={<Gravatar email={c.email} size={40}
                onTouchTap={() => this.goto(c.index)}/>}
              />
            )
          })}
        </List>
      </div>
    )
  }
}

// action
class App extends Component {
  login () {
    console.log('logging in');
    auth()
      .then(function (user) {
        console.log(user);
      })
      .catch(function (e) {
        console.log(e);
      });
}
  constructor(props) {
   super(props);
   this.state = {value: 2};
 }

// view renders everthing then goes back to action
  render(){
  return (
      <MuiThemeProvider>
        <div>
          <BrowserRouter>
            <div>
              <AppBar title="Contact App" iconClassNameRight="muidocs-icon-navigation-expand-more" iconElementLeft={<NavMenu/>}/>
              <div>
                <button onClick={(e) => this.login(e)}>Login</button>
              </div>
            <Switch>
              <Route exact path="/" component={Home}/>
              <Route path="/form" component={MyForm}/>
              <Route path="/delete/:index" component={Delete}/>
              <Route path="/edit/:index" component={Edit}/>
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
