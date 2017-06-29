import React, { Component } from 'react';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

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
    console.log(this.props.match.params);
    var contacts = localStorage.contacts || '[]';
    contacts = JSON.parse(contacts);

    contacts.splice(this.props.match.params.index, 1);

    localStorage.contacts = JSON.stringify(contacts);
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
          Discard draft?
        </Dialog>
      </div>
    );
  }
}

export default Delete
