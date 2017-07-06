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
import {addContact, editContact} from './action';
import { connect } from 'react-redux';


class MyForm extends Component {
  constructor(props) {
    super(props);
    this.state = {name: 'j doe', color: 'blue'};
    if (props.index === undefined) {
      this.title = 'Add Contact';

    } else {
      this.read_data();
      this.title = 'Edit Contact';
    }

    this.history = props.history;
  }

  read_data () {
    if (this.props.contacts.length > 0) {
      this.state = Object.assign(this.state, this.props.contacts[this.props.index]);
      this.setState({name: this.state.name});
    } else {
      setTimeout(() => {this.read_data()}, 100);
    }
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

    if (this.props.index === undefined) {
      this.props.onSubmit(this.state);
    } else {
      this.props.onEdit(this.props.index, this.state);
    }

    this.history.push('/');
  }

  render() {
    return (
      <div>
      <form onSubmit={event => this.handleSubmit(event)}>
        <Card className="md-card">
          <CardTitle title={this.title}/>
            <CardText>
              <TextField floatingLabelText="Full Name" value={this.state.name} onChange={event => this.update_state(event, 'name')}/>
                <TextField floatingLabelText="Email Address" value={this.state.email} onChange={event => this.update_state(event, 'email')}/>
                  <TextField floatingLabelText="Phone Number" value={this.state.phone} onChange={event => this.update_state(event, 'phone')}/>
                    <TextField floatingLabelText="Address" value={this.state.address} onChange={event => this.update_state(event, 'address')}/>
                      <TextField floatingLabelText="City" value={this.state.city} onChange={event => this.update_state(event, 'city')}/>
                        <TextField floatingLabelText="state" value={this.state.state} onChange={event => this.update_state(event, 'state')}/>
                          <TextField floatingLabelText="Zip Code" value={this.state.zip} onChange={event => this.update_state(event, 'zip')}/>
              <SelectField floatingLabelText="Color" value={this.state.color} onChange={this.update_select}>
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
    },
    onEdit: function (index, data) {
      dispatch(editContact(index, data))
    },
  }
}

// after MyForm class
MyForm = connect(mapStateToProps, mapDispatchToProps)(MyForm)


export default MyForm
