import { createStore } from 'redux';

//import * as type from './actions';
import reducer from './reducer';

const store = createStore(reducer);

export default store;