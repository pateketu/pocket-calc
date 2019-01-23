import { MemoryOperation } from '../calcActions';

export default function memoryOperation(state, payLoad){
	if(payLoad === MemoryOperation.MS){
		return {...state, memory:state.currentVal};
	}

	if(payLoad === MemoryOperation.MC){
		return {...state, memory:undefined};
	}

	if(payLoad === MemoryOperation.MR){
		return {...state, currentVal:state.memory};
	}
}