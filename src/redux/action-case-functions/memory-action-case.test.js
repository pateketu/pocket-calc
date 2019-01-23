import { initialState } from '../calcReducer';
import sut from './memory-action-case';
import {MemoryOperation} from '../calcActions';

describe('memory actiopn case', ()=>{
	it('MC, stores current value into memory', ()=>{
		const currentState = {...initialState, currentVal:50};
		const state = sut(currentState,MemoryOperation.MS);
		expect(state).toEqual({...currentState, memory:50});
	});

	it('MC, clears memory', ()=>{
		const currentState = {...initialState, memory:50};
		const state = sut(currentState,MemoryOperation.MC);
		expect(state).toEqual({...currentState, memory:undefined});
	});

	it('MR, updates currentVal from memory', ()=>{
		const currentState = {...initialState, memory:50};
		const state = sut(currentState,MemoryOperation.MR);
		expect(state).toEqual({...currentState, currentVal:50});
	});
});