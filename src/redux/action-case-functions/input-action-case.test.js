import {default as sut} from './input-action-case';
import {initialState} from '../calcReducer';
import {Operation} from '../../domain/calculator';
describe('input action', ()=>{
	it('payLoad is NaN, returns un-changed state', ()=>{
		const state = sut(initialState, null);			
		expect(state).toBe(initialState);
	});

	it('payLoad is valid number, returns state with currentVal as input', ()=>{            
		const state = sut(initialState,5);			            
		expect(state).toEqual({...initialState, currentVal: 5});            
	});

	
	it('payLoad is valid number and state has a currentVal, returns state with currentVal made up of first and second input', ()=>{
            
		const state = sut({...initialState, currentVal:5 }, 9);					
			
		expect(state).toEqual({...initialState, currentVal:59});      

	});    

	it('payLoad is valid number and state contains an operation, returns state with payLoad as currentVal and currentVal as previousVal', ()=>{
		
		const currentState = {...initialState, currentVal:5, currentOperation:Operation.ADD };
		const state = sut(currentState, 9);					
			
		expect(state).toEqual({...currentState, currentVal:9, previousVal:5});      
	});

	it('payLoad is valid number and reset is true, returns state with payLoad as currentVal', ()=>{
		const currentState = {...initialState, currentVal:59, previousVal:9, reset:true };
		
		const state = sut(currentState, 8);
			
		expect(state).toEqual({...currentState, currentVal:8, previousVal:undefined, reset:false});      
	});

	it('payLoad is valid number, and state has point, returs decimal value for currentVal', ()=>{
		const state = sut({...initialState, currentVal:'0.' }, 8);
		expect(state).toEqual({...initialState, currentVal:0.8});     
	});

	it('payLoad is valid number, and state contains current operation and a point, returns expected currentVal and previousVal', ()=>{
		const currentState = {...initialState, currentVal:'0.', point:true, currentOperation:Operation.ADD, previousVal:0.9 };
		const state = sut(currentState, 8);
		expect(state).toEqual({...currentState, currentVal:0.8, point:false});     
	});

	it('payLoad is valid number, and state contains a currentVal, previousVal & an Operation, returns currentVal made up with payLoad input', ()=>{
		const currentState = {...initialState, currentVal:6,  currentOperation:Operation.ADD, previousVal:4};
		const state = sut(currentState, 8);
		expect(state).toEqual({...currentState, currentVal:68});     
	});

	it('restricts up to MAX_SAFE_INTEGER', ()=>{
		let state = sut(initialState,Number.MAX_SAFE_INTEGER);
			
		for(let i=1;i<20;i++){
			state = sut(state,i);
		}

		expect(state.currentVal).toBe(Number.MAX_SAFE_INTEGER);
	});
});