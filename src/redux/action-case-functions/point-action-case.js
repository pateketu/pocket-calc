import {Operation} from '../../domain/calculator';
export default function point(state){	
	const pointVal  = '0.';

	if(state.currentOperation !== Operation.UNKNNOWN){		
		return {...state, previousVal:state.currentVal, currentVal:pointVal, point:true};
	}  

	if(state.reset){
		return {...state, currentVal:pointVal, reset:false, point:true};	
	}

	return state.currentVal.toString().indexOf('.') >=0 ? state 
		: {...state, currentVal:`${state.currentVal}.`, point:true};
}
