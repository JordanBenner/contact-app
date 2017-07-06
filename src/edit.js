import React, { Component } from 'react';

import MyForm from './myform';

class Edit extends Component {
  constructor (props) {
    super(props);

    // var contacts = localStorage.contacts || '[]';
    // contacts = JSON.parse(contacts);
    edit(){
    this.state = {
      contact: contacts[this.props.match.params.index]
      this.props.history.push('/');
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

function mapStateToProps (state) {
  return {
    contacts: state
  }
}
function mapDispatchToProps (dispatch) {
  return {
    onSubmit: function (index, data) {
      dispatch(editContact(index, data))
    }
  }
}

Edit = connect(mapStateToProps, mapDispatchToProps)(Edit)

export default Edit
