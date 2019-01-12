import {default as sut} from './operation-action-case';
import {initialState} from '../calcReducer';
import {Operation, calculate} from '../../domain/calculator';

jest.mock('../../domain/calculator');

describe('operation action', ()=>{
	beforeEach(()=>{
		calculate.mockImplementation(()=>0);
	});
	it('operation is UNKNOWN, returns un-changed state', ()=>{
		const state = sut(initialState,Operation.UNKNNOWN);			
		expect(state).toBe(initialState);
	});
    
	it('state does not have active operation, returns state with new operation', ()=>{            
		const state = sut(initialState,Operation.ADD);
		expect(state).toEqual({...initialState, currentOperation:Operation.ADD});
	});
    
	it('state has an active operation, calls calulate with expected arguments', ()=>{            
		sut({...initialState, currentOperation:Operation.ADD, currentVal:1, previousVal:2},Operation.EQUAL);
		expect(calculate).toHaveBeenCalledWith(Operation.ADD, 1, 2);
	});

	it('EQUAL operation returns state with reset and no active operation', ()=>{
		const state = sut({...initialState, currentOperation:Operation.ADD},Operation.EQUAL);
		expect(state).toEqual({...initialState, currentOperation:Operation.UNKNNOWN, reset:true});
	});	

	it('PERCENTAGE operation calls calulate with expected arguments', ()=>{
		sut({...initialState, currentVal:1},Operation.PERCENTAGE);
		expect(calculate).toHaveBeenCalledWith(Operation.PERCENTAGE, 1);
	});

	it('POSITIVE_NEGATIVE operation calls calulate with expected arguments', ()=>{
		sut({...initialState, currentVal:1},Operation.POSITIVE_NEGATIVE);
		expect(calculate).toHaveBeenCalledWith(Operation.POSITIVE_NEGATIVE, 1);
	});

	it('calculate returns NaN, keeps currentVal  to zero', ()=>{
		calculate.mockClear();
		calculate.mockImplementation(()=>undefined);
		const state = sut({...initialState, currentOperation:Operation.SUBTRACT}, Operation.SUBTRACT);		
		expect(state).toEqual({...initialState, currentOperation:Operation.SUBTRACT, currentVal:0});
	});
});