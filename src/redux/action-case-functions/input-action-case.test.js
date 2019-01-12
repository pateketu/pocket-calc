import {default as sut} from './input-action-case';
import {initialState} from '../calcReducer';
import {Operation} from '../../domain/calculator';
describe('input action', ()=>{
	it('NaN input, returns un-changed state', ()=>{
		const state = sut(initialState, null);			
		expect(state).toBe(initialState);
	});

	it('valid input returns state with new current value', ()=>{            
		const state = sut(initialState,5);			            
		expect(state).toEqual({...initialState, currentVal: 5});            
	});

	
	it('state contains current Value, returns state with new current Value made up of existing current Value and input', ()=>{            
		const state = sut({...initialState, currentVal:5 }, 9);
		expect(state).toEqual({...initialState, currentVal:59});      
	});    

	it('state contains an operation, returns state with input as current Value and updates previous Value with current value', ()=>{		
		const currentState = {...initialState, currentVal:5, currentOperation:Operation.ADD };
		const state = sut(currentState, 9);
		expect(state).toEqual({...currentState, currentVal:9, previousVal:5});      
	});

	it('reset is true, updates current Value from input', ()=>{
		const currentState = {...initialState, currentVal:59, previousVal:9, reset:true };		
		const state = sut(currentState, 8);			
		expect(state).toEqual({...currentState, currentVal:8, previousVal:undefined, reset:false});      
	});

	it('state has point, updates current value with expected decimal value', ()=>{
		const state = sut({...initialState, currentVal:'0.' }, 8);
		expect(state).toEqual({...initialState, currentVal:0.8});     
	});

	it('state contains an active operation and a point, updates current Value with expected decimal value', ()=>{
		const currentState = {...initialState, currentVal:'0.', point:true, currentOperation:Operation.ADD, previousVal:0.9 };
		const state = sut(currentState, 8);
		expect(state).toEqual({...currentState, currentVal:0.8, point:false});     
	});

	it('state contains current Value, previous Value & an active operation, returns new current Value made up of existing current Value and input', ()=>{
		const currentState = {...initialState, currentVal:6,  currentOperation:Operation.ADD, previousVal:4};
		const state = sut(currentState, 8);
		expect(state).toEqual({...currentState, currentVal:68});     
	});

	it('current value is NaN, returns state with new current Value', ()=>{
		const state = sut({...initialState, currentVal:'Errrr'}, 7);
		expect(state).toEqual({...initialState, currentVal:7});     
	});

	it('restricts up to MAX_SAFE_INTEGER', ()=>{
		let state = sut(initialState,Number.MAX_SAFE_INTEGER);
			
		for(let i=1;i<20;i++){
			state = sut(state,i);
		}

		expect(state.currentVal).toBe(Number.MAX_SAFE_INTEGER);
	});
});