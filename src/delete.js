import React, { Component } from 'react';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import './myform'
import {delContact} from './action';
import { connect } from 'react-redux';

class Delete extends Component {
  constructor (props) {
    super(props);
    this.state = {
      open: true,
    };
  }

  handleClose() {
    this.setState({open: false});
    this.props.history.push('/');
  }

  doDelete () {
    this.props.onSubmit(this.props.match.params.index);
    this.props.history.push('/');
  }

  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={() => this.handleClose()}
      />,
      <FlatButton
        label="Delete"
        primary={true}
        onTouchTap={() => this.doDelete()}
      />,
    ];


    return (
      <div>
        <Dialog
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
        Do you want to Delete this contact?
        </Dialog>
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
    onSubmit: function (index) {
      dispatch(delContact(index))
    }
  }
}

Delete = connect(mapStateToProps, mapDispatchToProps)(Delete)

export default Delete
