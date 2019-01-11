export const Operation = {
	UNKNNOWN:'UNKNOWN',
	DIVIDE:'÷',
	MULTIPLY:'X',
	SUBTRACT:'-',
	ADD:'+',
	EQUAL:'=',
	PERCENTAGE:'%',
	POSITIVE_NEGATIVE:'+/-',
};

const calcOperation = {
	[Operation.DIVIDE]: (currentVal, nextVal) =>  {				
		if(currentVal === 0)
			throw new Error('Error: Cannot divide by Zero');

		
		return !isNaN(parseInt(currentVal)) && !isNaN(parseInt(nextVal)) 
			?  nextVal/currentVal : 
			currentVal || nextVal;
	},
	[Operation.MULTIPLY]: (currentVal, nextVal) => isNaN(parseInt(nextVal)) ? currentVal : currentVal * nextVal,
	[Operation.SUBTRACT]:(currentVal, nextVal) =>
		!isNaN(parseInt(currentVal)) && !isNaN(parseInt(nextVal)) ?  nextVal - currentVal
			: currentVal || nextVal,
	[Operation.ADD]:(currentVal, nextVal) =>isNaN(parseInt(nextVal)) ? currentVal : currentVal + nextVal,
	[Operation.EQUAL]:(currentVal) => currentVal,
	[Operation.PERCENTAGE]:(currentVal) => currentVal/100,
	[Operation.POSITIVE_NEGATIVE]:(currentVal) => currentVal < 0 ? Math.abs(currentVal) : currentVal * -1
};

export function calculate(operation, currentVal, nextVal){
	if(!(operation in calcOperation)) return;

	if(isNaN(parseInt(currentVal))) return;

	if(nextVal !== undefined && isNaN(parseInt(nextVal))) return;

	return fixFloatPrecision(calcOperation[operation](currentVal, nextVal));
}

function fixFloatPrecision(result){
	let numericVal = result;	
	if( Math.abs(numericVal) % 1 !== 0){
		numericVal = numericVal.toString().split('.')[1].length >=2 
			? numericVal.toFixed(2) : numericVal;
	}	
	return Number(numericVal);
}
