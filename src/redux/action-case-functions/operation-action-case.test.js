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

	it('state does not have active operation and has reset flag, returns state with new operation and falsy reset', ()=>{            
		const state = sut({...initialState, reset:true}, Operation.ADD);
		expect(state).toEqual({...initialState, currentOperation:Operation.ADD, reset:false});
	});

	it('for left to right operation, saves current operation as previous operation & sets current operation to left to right operation', ()=>{
		[Operation.MULTIPLY, Operation.DIVIDE].forEach((leftToRightOps) =>{
			[Operation.ADD, Operation.SUBTRACT].forEach((ops)=>{			
				const currentState = {...initialState, currentOperation:ops, currentVal:4, previousVal:5};
				const state = sut(currentState, leftToRightOps);
				expect(state).toEqual({...currentState, previousOperation:ops, currentOperation:leftToRightOps});
			});
		});
		
	});
	
	it('has previous ADD operation and preceding value, calls calculate method  with preceding value and result of current operation', ()=>{
		calculate.mockReset();
		calculate.mockImplementation(()=>0)
			.mockImplementationOnce(()=>30)
			.mockImplementationOnce(()=>0);

		const currentState = {...initialState, previousOperation:Operation.ADD, currentVal:6, previousVal:5, precedingVal:4, currentOperation:Operation.mockImplementation};
		sut(currentState, Operation.EQUAL);		
		expect(calculate).toHaveBeenCalledWith(Operation.ADD, 30, 4);

	});

	
});