import {default as sut} from './operation-action-case';
import {initialState} from '../calcReducer';
import {Operation, calculate} from '../../domain/calculator';

jest.mock('../../domain/calculator');
calculate.mockImplementation(()=>0);
describe('operation action', ()=>{
	it('payLoad is UNKNOWN, returns un-changed state', ()=>{
		const state = sut(initialState,Operation.UNKNNOWN);			
		expect(state).toBe(initialState);
	});
    
	it('payLoad is valid operation and state does not contain currentOperation, returns state with payLoad as currentOperation', ()=>{            
		const state = sut(initialState,Operation.ADD);
		expect(state).toEqual({...initialState, currentOperation:Operation.ADD});
	});
    
	it('payLoad is valid operation and state contains currentOperation, calls calulate with expected arguments', ()=>{            
		sut({...initialState, currentOperation:Operation.ADD, currentVal:1, previousVal:2},Operation.EQUAL);
		expect(calculate).toHaveBeenCalledWith(Operation.ADD, 1, 2);
	});

	it('payLoad is EQUAL, returns state with reset and UNKNWON operation', ()=>{
		const state = sut({...initialState, currentOperation:Operation.ADD},Operation.EQUAL);
		expect(state).toEqual({...initialState, currentOperation:Operation.UNKNNOWN, reset:true});
	});	

	it('payLoad is PERCENTAGE, calls calulate with expected arguments', ()=>{
		sut({...initialState, currentVal:1},Operation.PERCENTAGE);
		expect(calculate).toHaveBeenCalledWith(Operation.PERCENTAGE, 1);
	});

	it('payLoad is POSITIVE_NEGATIVE, calls calulate with expected arguments', ()=>{
		sut({...initialState, currentVal:1},Operation.POSITIVE_NEGATIVE);
		expect(calculate).toHaveBeenCalledWith(Operation.POSITIVE_NEGATIVE, 1);
	});
});