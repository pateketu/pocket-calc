import * as React from 'react';
import {KeyPad} from './key-pad';
import {mount} from 'enzyme';
import { Operation } from '../domain/calculator';
import toJson from 'enzyme-to-json';
describe('key pad component', ()=>{
	
	it('renders as expected', ()=>{
		const wrapper = mount(<KeyPad 
			operation={()=>{}} 
			clear={()=>{}}
			input={()=>{}}
			point={()=>{}}
			error={()=>{}}></KeyPad>);	
		expect(toJson(wrapper, {noKey:true})).toMatchSnapshot();   
		
	});
	describe('actions', ()=>{
		it('pressing clear button, dispatches clear action', ()=>{			
			const mockClear =  jest.fn();
			const wrapper = mount(<KeyPad 
				operation={()=>{}} 
				input={()=>{}}
				point={()=>{}}
				clear={mockClear}
				error={()=>{}}></KeyPad>);				
			wrapper.find('button[children="C"]').simulate('click');
			expect(mockClear).toHaveBeenCalled();
		});

		it('pressing operation button, dispatches expected operation action', ()=>{					
			
			[Operation.POSITIVE_NEGATIVE, Operation.PERCENTAGE].forEach((operation)=>{
				const mockOperation =  jest.fn();
				const wrapper = mount(<KeyPad 
					operation={mockOperation} 
					clear={()=>{}}
					input={()=>{}}
					point={()=>{}}
					error={()=>{}}></KeyPad>);				
				wrapper.find(`button[children="${operation}"]`).simulate('click');
				expect(mockOperation).toHaveBeenCalledWith(operation);
			});
			
		});

		it('pressing number button, dispatches expected input action', ()=>{		
			
			for(let i=0;i<=9;i++){
				const mockInput =  jest.fn();
				const wrapper = mount(<KeyPad 
					operation={()=>{}} 
					clear={()=>{}}
					input={mockInput}
					point={()=>{}}
					error={()=>{}}></KeyPad>);								
				wrapper.find(`button[children="${i}"]`).simulate('click');
				expect(mockInput).toHaveBeenCalledWith(i);
			}
		});
		it('shows currentOperation as active', ()=>{

			const currentOpertaion =Operation.ADD; 
			
			const wrapper = mount(<KeyPad 
				currentOperation = {currentOpertaion}
				operation={()=>{}} 
				clear={()=>{}}
				input={()=>{}}
				point={()=>{}}
				error={()=>{}}
			></KeyPad>);							
			
			wrapper.find(`button[children="${currentOpertaion}"]`).hasClass('active');
		});
	});
	
	
});