import * as React from 'react';
import {mount} from 'enzyme';
import Calculator from './calculator';
import {Provider} from 'react-redux';
import store from '../redux/store';
import toJson from 'enzyme-to-json';

describe('Calculator', ()=>{
	let wrapper; 
	beforeEach(()=>{		
		wrapper = mount(<Provider store={store}>
			<Calculator></Calculator>
		</Provider>);
	});	
	
	it('renders as expeced', ()=>{
		expect(toJson(wrapper, {noKey:true})).toMatchSnapshot();   
	});

	describe('calculation',()=>{
		/* 
			Clearing calculator after each test as tests are 
			simulating actual usage and in actual usage like this 
			test there will be only one copy of the state (redux store)
		*/
		afterEach(()=>{
			wrapper.find('button[children="C"]').simulate('click');
		});
	
		it('click --> 1 --> 5 -- > + --> 5 --> =, updates display with expected calculated value', ()=>{
			const expectedResult = '20';
			
			wrapper.find('button[children="1"]').simulate('click');
			wrapper.find('button[children="5"]').simulate('click');
			wrapper.find('button[children="+"]').simulate('click');
			wrapper.find('button[children="5"]').simulate('click');
			wrapper.find('button[children="="]').simulate('click');

			expect(wrapper.find('.display').text()).toBe(expectedResult);
		});

		it('click --> 0.1 -- > + --> 0.2 --> =, updates display with expected calculated value', ()=>{
			const expectedResult = '0.3';

			wrapper.find('button[children="0"]').simulate('click');
			wrapper.find('button[children="."]').simulate('click');
			wrapper.find('button[children="1"]').simulate('click');
			wrapper.find('button[children="+"]').simulate('click');
			wrapper.find('button[children="0"]').simulate('click');			
			wrapper.find('button[children="."]').simulate('click');
			wrapper.find('button[children="2"]').simulate('click');
			wrapper.find('button[children="="]').simulate('click');
			
			expect(wrapper.find('.display').text()).toBe(expectedResult);
		});

		it('click --> 5  --> - --> 1 --> =, updates display with expected calculated value', ()=>{
			const expectedResult = '4';
			
			wrapper.find('button[children="5"]').simulate('click');			
			wrapper.find('button[children="-"]').simulate('click');
			wrapper.find('button[children="1"]').simulate('click');
			wrapper.find('button[children="="]').simulate('click');

			expect(wrapper.find('.display').text()).toBe(expectedResult);
		});

		it('click --> 1  --> - --> 5 --> =, updates display with expected calculated value', ()=>{
			const expectedResult = '-4';
			
			wrapper.find('button[children="1"]').simulate('click');			
			wrapper.find('button[children="-"]').simulate('click');
			wrapper.find('button[children="5"]').simulate('click');
			wrapper.find('button[children="="]').simulate('click');

			expect(wrapper.find('.display').text()).toBe(expectedResult);
		});


		it('click --> 7 --> 0 --> %, updates display with expected calculated value', ()=>{
			const expectedResult = '0.7';

			wrapper.find('button[children="7"]').simulate('click');
			wrapper.find('button[children="0"]').simulate('click');			
			wrapper.find('button[children="%"]').simulate('click');
			
			expect(wrapper.find('.display').text()).toBe(expectedResult);
		});

		it('click --> 1 --> 5 -- > + --> 5 --> + --> 6 --> +, updates display with expected calculated value', ()=>{
			const expectedResult = '26';
			
			wrapper.find('button[children="1"]').simulate('click');
			wrapper.find('button[children="5"]').simulate('click');
			wrapper.find('button[children="+"]').simulate('click');
			wrapper.find('button[children="5"]').simulate('click');
			wrapper.find('button[children="+"]').simulate('click');
			wrapper.find('button[children="6"]').simulate('click');
			wrapper.find('button[children="+"]').simulate('click');

			expect(wrapper.find('.display').text()).toBe(expectedResult);
		});

		it('click --> 5 --> + --> 5 --> X --> 6 =, updates display with expected calculated value', ()=>{
			const expectedResult = '35';
			
			wrapper.find('button[children="5"]').simulate('click');
			wrapper.find('button[children="+"]').simulate('click');
			wrapper.find('button[children="5"]').simulate('click');
			wrapper.find('button[children="X"]').simulate('click');
			wrapper.find('button[children="6"]').simulate('click');
			wrapper.find('button[children="="]').simulate('click');
			
			expect(wrapper.find('.display').text()).toBe(expectedResult);
		});

		it('click --> 5 --> - --> 5 --> X --> 6 =, updates display with expected calculated value', ()=>{
			const expectedResult = '-25';
			
			wrapper.find('button[children="5"]').simulate('click');
			wrapper.find('button[children="-"]').simulate('click');
			wrapper.find('button[children="5"]').simulate('click');
			wrapper.find('button[children="X"]').simulate('click');
			wrapper.find('button[children="6"]').simulate('click');
			wrapper.find('button[children="="]').simulate('click');
			
			expect(wrapper.find('.display').text()).toBe(expectedResult);
		});

		it('click --> 5 --> + --> 30 --> ÷ --> 6 =, updates display with expected calculated value', ()=>{
			const expectedResult = '10';
			
			wrapper.find('button[children="5"]').simulate('click');
			wrapper.find('button[children="+"]').simulate('click');
			wrapper.find('button[children="3"]').simulate('click');
			wrapper.find('button[children="0"]').simulate('click');
			wrapper.find('button[children="÷"]').simulate('click');
			wrapper.find('button[children="6"]').simulate('click');
			wrapper.find('button[children="="]').simulate('click');
			
			expect(wrapper.find('.display').text()).toBe(expectedResult);
		});

		it('click --> 5 --> * --> 5 --> =, updates display with expected calculated value', ()=>{
			const expectedResult = '25';
			
			wrapper.find('button[children="5"]').simulate('click');
			wrapper.find('button[children="X"]').simulate('click');
			wrapper.find('button[children="5"]').simulate('click');
			wrapper.find('button[children="="]').simulate('click');
			
			expect(wrapper.find('.display').text()).toBe(expectedResult);
		});

		it('click --> 4 --> ÷ --> 2 --> =, updates display with expected calculated value', ()=>{
			const expectedResult = '2';
			
			wrapper.find('button[children="4"]').simulate('click');
			wrapper.find('button[children="÷"]').simulate('click');
			wrapper.find('button[children="2"]').simulate('click');
			wrapper.find('button[children="="]').simulate('click');
			
			expect(wrapper.find('.display').text()).toBe(expectedResult);
		});
		
		it('click --> 2 --> ÷ --> 4 --> =, updates display with expected calculated value', ()=>{
			const expectedResult = '0.5';
			
			wrapper.find('button[children="2"]').simulate('click');
			wrapper.find('button[children="÷"]').simulate('click');
			wrapper.find('button[children="4"]').simulate('click');
			wrapper.find('button[children="="]').simulate('click');
			
			expect(wrapper.find('.display').text()).toBe(expectedResult);
		});

		it('click --> 2 --> ÷ --> 0 --> =, shows error in display', ()=>{		
			
			wrapper.find('button[children="2"]').simulate('click');
			wrapper.find('button[children="÷"]').simulate('click');
			wrapper.find('button[children="0"]').simulate('click');
			wrapper.find('button[children="="]').simulate('click');
			
			expect(wrapper.find('.display').text()).toContain('Cannot divide by Zero');
		});

		it('click --> 2 --> + --> 1 --> 2 --> =, shows error in display', ()=>{		
			const expectedResult = '14';
			wrapper.find('button[children="2"]').simulate('click');
			wrapper.find('button[children="+"]').simulate('click');
			wrapper.find('button[children="1"]').simulate('click');
			wrapper.find('button[children="2"]').simulate('click');
			wrapper.find('button[children="="]').simulate('click');
			
			expect(wrapper.find('.display').text()).toBe(expectedResult);
		});

		it('click --> - --> - , keeps zero in display', ()=>{		
			const expectedResult = '0';
			wrapper.find('button[children="-"]').simulate('click');
			wrapper.find('button[children="-"]').simulate('click');
			
			expect(wrapper.find('.display').text()).toBe(expectedResult);
		});

		it('click --> 4 --> 5 --> + --> 3 --> = --> X --> 2 --> =, updates display with expected calculated value', ()=>{		
			const expectedResult = '24';
			wrapper.find('button[children="4"]').simulate('click');
			wrapper.find('button[children="5"]').simulate('click');
			wrapper.find('button[children="+"]').simulate('click');
			wrapper.find('button[children="3"]').simulate('click');
			wrapper.find('button[children="="]').simulate('click');
			wrapper.find('button[children="÷"]').simulate('click');
			wrapper.find('button[children="2"]').simulate('click');
			wrapper.find('button[children="="]').simulate('click');
			
			expect(wrapper.find('.display').text()).toBe(expectedResult);
		});
	});
});