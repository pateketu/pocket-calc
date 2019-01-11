import {initialState} from '../calcReducer';
import {default as sut} from './error-action-case';

describe('error action', ()=>{
	it('shows error message in currentVal', ()=>{
		const err = 'Error!';
		const state = sut(initialState, {message:err});	
		expect(state).toEqual({...initialState, currentVal:err});
	});
});