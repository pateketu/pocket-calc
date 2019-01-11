export const INPUT = 'pocket-cals/INPUT';
export const OPERATION = 'pocket-cals/OPERATION';
export const CLEAR = 'pocket-cals/CLEAR';
export const POINT = 'pocket-cals/POINT';
export const ERROR = 'pocket-cals/ERROR';

export function input(val){
	return {
		type:INPUT,
		payLoad:val
	};
}

export function operation(ops){
	return {
		type:OPERATION,
		payLoad:ops
	};
}

export function clear(){
	return {
		type:CLEAR
	};
}


export function point(){
	return {
		type:POINT
	};
}

export function error(error){
	return {
		type:ERROR,
		payLoad:error
	};
}
