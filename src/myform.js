import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';

import {Card, CardActions, CardTitle, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Slider from 'material-ui/Slider';
import TimePicker from 'material-ui/TimePicker';

import './myform.css';



class MyForm extends Component {
  constructor() {
    super();
    this.state = {name: '', color: 'blue'};
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
  }

  render() {
    return (
      <div>
      <AppBar title='My awsome form'/>
      <form onSubmit={event => this.handleSubmit(event)}>
        <Card className="md-card">
          <CardTitle title="My Form" subtitle="subtitle"/>
            <CardText>
              <TextField floatingLabelText="Your Name" defaultValue={this.state.name} onChange={event => this.update_state(event, 'name')}/>
              <SelectField floatingLabelText="Color"value={this.state.color}onChange={this.update_select}>
                <MenuItem value="red" primaryText="Red" />
                <MenuItem value="blue" primaryText="Blue" />
              </SelectField>
              <Slider defaultValue={0.5} step={1} min={0} max={10}/>
              <TimePicker hintText="12hr Format"/>
            </CardText>
            <CardActions>
              <RaisedButton type='submit' label="Submit" secondary={true}/>
            </CardActions>
          </Card>
      </form>
      </div>
    );

  }
}
export default MyForm
