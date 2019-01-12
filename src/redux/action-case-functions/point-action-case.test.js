import {default as sut} from './point-action-case';
import {initialState} from '../calcReducer';
import {Operation} from '../../domain/calculator';
describe('point action', ()=>{
	it('returns expected state with a point in current Value', ()=>{
		const state = sut(initialState);
		expect(state).toEqual({...initialState, point:true, currentVal:'0.'});
	});
    
	it('does not change state if current value is already a decimal number', ()=>{
		const initState = {...initialState, currentVal:'2.1'};
		const state = sut(initState);
		expect(state).toBe(initState);
	});

	it('reset is true, sets current Value to 0.', ()=>{
		const state = sut({...initialState, currentVal:20, reset:true});
		expect(state).toEqual({...initialState, currentVal:'0.', reset:false, point:true });
	});

	it('state has an active operation, sets current Value to 0. and updates previous Value with current Value', ()=>{
		const state = sut({...initialState, currentVal:20, currentOperation:Operation.ADD});
		expect(state).toEqual({...initialState, point:true, currentVal:'0.', previousVal:20, currentOperation:Operation.ADD});
	});

	it('current value is zero and state has an active operation, sets the current value to 0.', ()=>{
		const state = sut({...initialState, currentVal:0, previousVal:20, currentOperation:Operation.ADD});
		expect(state).toEqual({...initialState, point:true, currentVal:'0.', previousVal:20, currentOperation:Operation.ADD});
	});
});