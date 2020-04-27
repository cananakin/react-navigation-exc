// action type
export const UPDATE_USER = 'UPDATE_USER';
export const ADD_CONTACT = 'ADD_CONTACT';

// action func

export const updateUser = (update) => ({ type: UPDATE_USER, payload: update })
export const addContact = (newContact) => ({ type: ADD_CONTACT, payload: newContact })