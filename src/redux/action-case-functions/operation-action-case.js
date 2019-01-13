import {Operation, calculate} from '../../domain/calculator';

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
	
	const reset = payLoad === Operation.EQUAL;
	const nextOperation = payLoad === Operation.EQUAL ? Operation.UNKNNOWN : payLoad;

	if(state.currentOperation !== Operation.UNKNNOWN){
		const result = calculate(state.currentOperation, state.currentVal, state.previousVal);

		return {...state,  currentVal: !isNaN(parseInt(result)) ? result : 0, 
			currentOperation:nextOperation,
			previousVal:undefined,
			reset};
	}	
	return {...state, currentOperation:payLoad, reset};   
}