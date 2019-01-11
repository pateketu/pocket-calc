import {default as sut} from './point-action-case';
import {initialState} from '../calcReducer';
import {Operation} from '../../domain/calculator';
describe('point action', ()=>{
	it('point action, returns expected state with a dot in currentVal', ()=>{
		const state = sut(initialState);
		expect(state).toEqual({...initialState, point:true, currentVal:'0.'});
	});
    
	it('point action does not change state if currentVal already contains a dot', ()=>{
		const initState = {...initialState, currentVal:'2.1'};
		const state = sut(initState);
		expect(state).toBe(initState);
	});

	it('reset is true, sets currentVal to 0.', ()=>{
		const state = sut({...initialState, currentVal:20, reset:true});
		expect(state).toEqual({...initialState, currentVal:'0.', reset:false, point:true });
	});

	it('state has an operation, sets currentVal to 0. and previousVal to currentVal', ()=>{
		const state = sut({...initialState, currentVal:20, currentOperation:Operation.ADD});
		expect(state).toEqual({...initialState, point:true, currentVal:'0.', previousVal:20, currentOperation:Operation.ADD});
	});
});