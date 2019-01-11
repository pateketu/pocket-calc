import {initialState} from '../calcReducer';
import {default as sut} from './clear-action-case';
import {Operation} from '../../domain/calculator';
describe('clear', ()=>{
	it('resets everything with', ()=>{
		const state = sut({...initialState, currentVal:6, currentOperation:Operation.DIVIDE, previousVal:6});	
		expect(state).toEqual(initialState);
	});
});