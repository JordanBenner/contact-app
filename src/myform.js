import React, { Component } from 'react';

import {Card, CardActions, CardTitle, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Slider from 'material-ui/Slider';
import TimePicker from 'material-ui/TimePicker';
import './myform.css';
import database,{User} from './firebase';
import {addContact} from './action';
import { connect } from 'react-redux';


class MyForm extends Component {
  constructor(props) {
    super(props);

    if (props.contact) {
      this.state = props.contact;
      this.title = 'Edit Contact';
    } else {
      this.state = {name: '', color: 'blue'};
      this.title = 'Add Contact';
    }

    this.history = props.history;
  }

  update_state (event, key) {
  this.setState({[key]: event.target.value});
  }

  update_select = (event, index, value) => {
  this.setState({color: value});
}

  handleSubmit(event) {
    console.log('submitted: ' + this.state.name);
    event.preventDefault();

    var contacts = localStorage.contacts || '[]';
    contacts = JSON.parse(contacts);

    if (this.props.contact) {
      contacts[this.props.index] = this.state;
    } else {
      contacts.push(this.state);
    }

    localStorage.contacts = JSON.stringify(contacts);

    database.ref('contacts/' + User.user.uid).set(contacts);

    this.history.push('/');
  }

  render() {
    return (
      <div>
      <form onSubmit={event => this.handleSubmit(event)}>
        <Card className="md-card">
          <CardTitle title={this.title}/>
            <CardText>
              <TextField floatingLabelText="Full Name" defaultValue={this.state.name} onChange={event => this.update_state(event, 'name')}/>
                <TextField floatingLabelText="Email Address" defaultValue={this.state.email} onChange={event => this.update_state(event, 'email')}/>
                  <TextField floatingLabelText="Phone Number" defaultValue={this.state.phone} onChange={event => this.update_state(event, 'phone')}/>
                    <TextField floatingLabelText="Address" defaultValue={this.state.address} onChange={event => this.update_state(event, 'address')}/>
                      <TextField floatingLabelText="City" defaultValue={this.state.city} onChange={event => this.update_state(event, 'city')}/>
                        <TextField floatingLabelText="state" defaultValue={this.state.state} onChange={event => this.update_state(event, 'state')}/>
                          <TextField floatingLabelText="Zip Code" defaultValue={this.state.zip} onChange={event => this.update_state(event, 'zip')}/>
              <SelectField floatingLabelText="Color"value={this.state.color}onChange={this.update_select}>
                <MenuItem value="red" primaryText="Red" />
                <MenuItem value="blue" primaryText="Blue" />
              </SelectField>
              <Slider defaultValue={0.5} step={1} min={0} max={10}/>
              <TimePicker hintText="12hr Format"/>
            </CardText>
            <CardActions>
              <div className='btn'>
                <div className='btn-save'>
              <RaisedButton type='save' label="Save" secondary={true} href=''/>
            </div>
            <div className='btn-delete'>
                <RaisedButton type='delete' label="Delete" secondary={true} href={"/delete/" + this.props.index}/>
              </div>
              </div>
            </CardActions>
          </Card>
      </form>
      </div>
    );

  }
}

function mapStateToProps (state) {
  return {
    contacts: state
  }
}
function mapDispatchToProps (dispatch) {
  return {
    onSubmit: function (index, data) {
      dispatch(addContact(index, data))
    }
  }
}

// after MyForm class
MyForm = connect(mapStateToProps, mapDispatchToProps)(MyForm)


export default MyForm
