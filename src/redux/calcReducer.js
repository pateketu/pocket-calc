import {Operation} from '../domain/calculator';

import {INPUT, OPERATION, CLEAR, POINT,ERROR} from './calcActions';

import input from './action-case-functions/input-action-case';
import operation from './action-case-functions/operation-action-case';
import point from './action-case-functions/point-action-case';
import clear from './action-case-functions/clear-action-case';
import error from './action-case-functions/error-action-case';

const actionCaseFunc = {
	[INPUT]: input,
	[OPERATION]: operation,
	[CLEAR]: clear,
	[POINT]:point,
	[ERROR]:error
};

export const initialState = {
	currentVal:0, 
	previousVal:undefined,
	precedingVal:undefined,
	currentOperation:Operation.UNKNNOWN,
	previousOperation:Operation.UNKNNOWN,
	reset:false,
	point:false
};

export default function reducer(state=initialState, action={type:'', payLoad:null}){
	let nextState = state;    

	if(action.type in actionCaseFunc){
		nextState = actionCaseFunc[action.type](state, action.payLoad);
	}	
	return nextState;
}


