import {Operation} from '../../domain/calculator';
export default function input(state, payLoad){
    
	if(isNaN(parseInt(payLoad))) return state;
	
	let nextVal = Number(payLoad);

	if(state.reset){		
		return {...state, currentVal:nextVal, 
			previousVal:undefined, 
			reset:false};
	}

	if(state.currentOperation !== Operation.UNKNNOWN 
		&& !state.point
		&& !state.previousVal){		
		return {...state, previousVal:state.currentVal, currentVal:nextVal};
	}  
	
	const newVal = state.currentVal !== 0 ? `${state.currentVal}${nextVal}` : nextVal;
	
	if(Number(newVal) > Number.MAX_SAFE_INTEGER) return state;

	return {...state, currentVal:Number(newVal), point:false};    
}