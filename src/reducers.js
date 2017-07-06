import database,{User} from './firebase';

var initialState = []

export function contacts (state, action) {
  if (state === undefined) {
    return initialState;
  }

  switch (action.type) {
    case 'ADD_CONTACT':
      var new_state = [...state];
      new_state.push(action.data);
      database.ref('contacts/' + User.user.uid).set(new_state);
      return new_state;

    case 'DELETE_CONTACT':
      console.log(state);
      var new_state = [...state];
      new_state.splice(action.index, 1);
      console.log(new_state);
      database.ref('contacts/' + User.user.uid).set(new_state);
      return new_state;

    case 'SET_CONTACTS':
      console.log(action.data || []);
      return action.data || [];

    case 'EDIT_CONTACTS':
      console.log(action.data || []);
      return action.data || [];

    default:
      return state;
    }
}

export default contacts;
