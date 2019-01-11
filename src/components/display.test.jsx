import * as React from 'react';
import {mount} from 'enzyme';
import {Display} from './display';

describe('display', ()=>{
	it('shows currentVal', ()=>{
		const value = 59;
		const wrapper = mount(<Display value={value}></Display>);
		expect(wrapper.find('.display').text()).toBe(value.toString());
	});
});