import React, { Component } from 'react';

import MyForm from './myform';

class Edit extends Component {
  constructor (props) {
    super(props);

    var contacts = localStorage.contacts || '[]';
    contacts = JSON.parse(contacts);

    this.state = {
      contact: contacts[this.props.match.params.index]
    }
  }
  render() {
    return (
      <div>
        <MyForm contact={this.state.contact} index={this.props.match.params.index} history={this.props.history}/>
      </div>
    )
  }
}

export default Edit
