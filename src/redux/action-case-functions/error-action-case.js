import {initialState} from '../calcReducer';
export default function(state, payLoad){
	return {...state, ...initialState, currentVal:payLoad.message};
}