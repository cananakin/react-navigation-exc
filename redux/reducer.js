import { combineReducers } from 'redux'
import { UPDATE_USER, ADD_CONTACT } from './actions';

const merge = (prev, next) => Object.assign({}, prev, next);

const contactReducer = (state = [], action) => {
    switch (action.type) {
        case ADD_CONTACT:
            return [...state, action.payload]
        default:
            return state;
    }
}

const userReducer = (state = {}, action) => {
    switch (action.type) {
        case UPDATE_USER:
            return merge(state, action.payload)
        case ADD_CONTACT:
            return merge(state, {prevContact: action.payload})
        default:
            return state;
    }
}

const reducer = combineReducers({
    user: userReducer,
    contacts: contactReducer
})

export default reducer;