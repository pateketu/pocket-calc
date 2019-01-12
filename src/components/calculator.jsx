import React from 'react';
import Display from './display';
import KeyPad from './key-pad';

export default function Calculator() {
	return	<div className="calculator">
		<div className="ee-branding"></div>
		<Display></Display>
		<KeyPad></KeyPad>
	</div>;
}