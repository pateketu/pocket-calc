import {createStore} from 'redux';
import calc from './calcReducer';

const store = createStore(calc);

export default store;
