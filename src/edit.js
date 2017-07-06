import React, { Component } from 'react';

import MyForm from './myform';
import {editContact} from './action';
import { connect } from 'react-redux';

class Edit extends Component {
  constructor (props) {
    super(props);

    // var contacts = localStorage.contacts || '[]';
    // contacts = JSON.parse(contacts);
  }

  render() {
    return (
      <div>
        <MyForm index={this.props.match.params.index} history={this.props.history}/>
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
