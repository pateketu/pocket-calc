
import React from 'react';
import PropTypes from 'prop-types';
export default function Key(props) {
	return	<button 
		onClick={props.onClick}        
		className={props.isActive ? 'active' : ''}>
		{props.value}
	</button>;
}

Key.propTypes = {
	onClick:PropTypes.func.isRequired,
	value:PropTypes.string.isRequired,
	isActive:PropTypes.bool
};
