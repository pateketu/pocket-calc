import {default as sut, initialState} from './calcReducer';
import input from './action-case-functions/input-action-case';
import operation from './action-case-functions/operation-action-case';
import point from './action-case-functions/point-action-case';
import clear from './action-case-functions/clear-action-case';
import error from './action-case-functions/error-action-case';
import memoryOperation from './action-case-functions/memory-action-case';

import * as actions from './calcActions';
import { Operation } from '../domain/calculator';

jest.mock('./action-case-functions/input-action-case');
jest.mock('./action-case-functions/operation-action-case');
jest.mock('./action-case-functions/point-action-case');
jest.mock('./action-case-functions/clear-action-case');
jest.mock('./action-case-functions/error-action-case');
jest.mock('./action-case-functions/memory-action-case');

input.mockImplementation=(()=>initialState);
operation.mockImplementation=(()=>initialState);
point.mockImplementation=(()=>initialState);
clear.mockImplementation=(()=>initialState);
error.mockImplementation=(()=>initialState);
memoryOperation.mockImplementation=(()=>initialState);

describe('calcReducer', ()=>{
	beforeEach(() => {		
		input.mockClear();
		operation.mockClear();
		point.mockClear();
		clear.mockClear(),
		error.mockClear();
	});

	it('should return initial state', ()=>{
		const  state = sut();
		expect(state).toEqual(initialState);
	});	

	it('invokes input case action with expected argumenets', ()=>{
		sut(initialState, actions.input(6));
		expect(input).toHaveBeenCalledWith(initialState, 6);
	});

	it('invokes operation case action with expected argumenets', ()=>{
		sut(initialState, actions.operation(Operation.ADD));
		expect(operation).toHaveBeenCalledWith(initialState, Operation.ADD);
	});

	it('invokes point case action', ()=>{
		sut(initialState, actions.point());
		expect(point).toHaveBeenCalled();
	});

	it('invokes clear case action', ()=>{
		sut(initialState, actions.clear());
		expect(clear).toHaveBeenCalled();
	});

	it('invokes error case action', ()=>{
		sut(initialState, actions.error());
		expect(error).toHaveBeenCalled();
	});

	it('invockes memory case action', ()=>{
		sut(initialState, actions.memoryOperation('M1'));
		expect(memoryOperation).toHaveBeenCalled();
	});
});
	