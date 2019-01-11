import React from 'react';
import Display from './display';
import KeyPad from './key-pad'

export default function Calculator() {
	return	<div className="calculator">
		<Display></Display>
		<KeyPad></KeyPad>
	</div>;
}