import {calculate as sut} from'./calculator';
import {Operation} from './calculator';
describe('calc-opertaions', ()=>{
	describe('invalid params', ()=>{

		it('returns nothing for an un-known operation', ()=>{
			const result = sut('r', 0, 0);
			expect(result).toBeUndefined();
		});

		it('returns nothing if currentValue is NaN', ()=>{
			const result = sut('+',null, 7);
			expect(result).toBeUndefined();
		});

		it('returns nothing if nextValue specified is NaN', ()=>{
			const result = sut('+', 7,'hh');
			expect(result).toBeUndefined();
		});
	});

	describe('divide operation', ()=>{
		
		it('currentVal and nextVal are divisible, returns expected whole number result', ()=>{
			const result = sut(Operation.DIVIDE, 4, 8);
			expect(result).toBe(2);
		});

		it('currentVal and nextVal are not divisible, returns expected decimal result', ()=>{
			const result = sut(Operation.DIVIDE, 3, 8);
			expect(result).toBe(2.67);
		});

		it('nextVal is zero, returns error', ()=>{
			expect(() => {
				sut(Operation.DIVIDE, 0, 8);
			}).toThrow();
		});
	});

	describe('multiply operation', ()=>{
		
		it('currentVal and nextVal are whole numbers, returns expected whole number result', ()=>{
			const result = sut(Operation.MULTIPLY, 8, 4);
			expect(result).toBe(32);
		});

		it('currentVal and nextVal are decimal, returns expected decimal result', ()=>{
			const result = sut(Operation.MULTIPLY, 8.1, 3.1);
			expect(result).toBe(25.11);
		});

	});

	describe('subtract operation', ()=>{
		
		it('currentVal and nextVal are whole numbers, returns expected whole number result', ()=>{
			const result = sut(Operation.SUBTRACT, 4, 8);
			expect(result).toBe(4);
		});

		it('currentVal and nextVal are decimal, returns expected decimal result', ()=>{
			const result = sut(Operation.SUBTRACT, 3.1, 8.5);
			expect(result).toBe(5.4);
		});

		it('currentVal is less then nextVal, returns expected negative result', ()=>{
			const result = sut(Operation.SUBTRACT, 3, 1);
			expect(result).toBe(-2);
		});

		it('currentVal is less then nextVal, returns expected negative decimal result', ()=>{
			const result = sut(Operation.SUBTRACT, 3, 1.1);
			expect(result).toBe(-1.9);
		});

	});

	describe('add operation', ()=>{
		
		it('currentVal and nextVal are whole numbers, returns expected whole number result', ()=>{
			const result = sut(Operation.ADD, 8, 4);
			expect(result).toBe(12);
		});

		it('currentVal and nextVal are decimal, returns expected decimal result', ()=>{
			const result = sut(Operation.ADD, 0.1, 0.2);
			expect(result).toBe(0.3);
		});

		it('currentVal and nextVal are negative whole number , returns expected decimal result', ()=>{
			const result = sut(Operation.ADD, 5.7, 0.2);
			expect(result).toBe(5.9);
		});
		it('currentVal and nextVal negative decimal, returns expected decimal result', ()=>{
			const result = sut(Operation.ADD, -0.177, -0.2);
			expect(result).toBe(-0.38);
		});
	
	});

	describe('equal operation', ()=>{
		
		it('returns currentValue as result', ()=>{
			const result = sut(Operation.EQUAL, 8, 4);
			expect(result).toBe(8);
		});
	
	});

	describe('percentage operation', ()=>{
		
		it('returns expected result', ()=>{
			const result = sut(Operation.PERCENTAGE, 8);
			expect(result).toBe(0.08);
		});
		
	});

	describe('Positive/Negative operation', ()=>{
		
		it('currentVal is negative, returns positive value', ()=>{
			const result = sut(Operation.POSITIVE_NEGATIVE, -8);
			expect(result).toBe(8);
		});

		it('currentVal is positive, returns negative value', ()=>{
			const result = sut(Operation.POSITIVE_NEGATIVE, 8);
			expect(result).toBe(-8);
		});

	});	
    
});