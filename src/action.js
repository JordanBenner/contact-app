export function addContact (data) {

  return {
    type: 'ADD_CONTACT',
    data: data
  }
}


export function editContact (index, data) {

  return {
    type: 'EDIT_CONTACT',
    index: index,
    data: data
  }
}


export function delContact (index) {

  return {
    type: 'DELETE_CONTACT',
    index: index
  }
}

export function setContacts (data) {

  return {
    type: 'SET_CONTACTS',
    data: data
  }
}
