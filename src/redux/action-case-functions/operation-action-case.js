import {Operation, calculate} from '../../domain/calculator';
import { stat } from 'fs';

const immediateExecutionOperation = {
	
	[Operation.PERCENTAGE]:(state) =>
		({...state, currentOperation:Operation.UNKNNOWN,
			currentVal:calculate(Operation.PERCENTAGE, state.currentVal)}),

	[Operation.POSITIVE_NEGATIVE]:(state) =>
		({...state, currentOperation:Operation.UNKNNOWN,
			currentVal:calculate(Operation.POSITIVE_NEGATIVE, state.currentVal)})
};

export default function operation(state, payLoad){
	if(payLoad === Operation.UNKNNOWN) return state;

	if(payLoad in immediateExecutionOperation) {			
		return immediateExecutionOperation[payLoad](state);
	}

	if(isLeftToRight(state, payLoad)){
		return {...state, previousOperation:state.currentOperation, currentOperation:payLoad};
	}

	const reset = payLoad === Operation.EQUAL;
	const nextOperation = payLoad === Operation.EQUAL ? Operation.UNKNNOWN : payLoad;

	if(state.currentOperation !== Operation.UNKNNOWN){
		let result = calculate(state.currentOperation, state.currentVal, state.previousVal);

		if(state.previousOperation !== Operation.UNKNNOWN){
			result = calculate(state.previousOperation, result, state.precedingVal);
		}

		return {...state,  currentVal: !isNaN(parseInt(result)) ? result : 0, 
			currentOperation:nextOperation,
			previousVal:undefined,
			reset};
	}	
	return {...state, currentOperation:payLoad, reset};   
}

function isLeftToRight(state, newOperation){
	return (state.currentOperation === Operation.ADD 
				|| state.currentOperation === Operation.SUBTRACT)
			&& (newOperation === Operation.MULTIPLY	
					|| newOperation === Operation.DIVIDE)
			&& state.currentVal !== 0 
			&& state.previousVal !== 0;
}