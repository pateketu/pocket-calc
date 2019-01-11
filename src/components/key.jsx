
import React from 'react';
import PropTypes from 'prop-types';
export default function Key(props) {
	const classes = `btn btn-outline-secondary btn-lg ${props.className ? props.className : ''} ${props.isActive ? 'active' : ''}`;
	return	<button 
		onClick={props.onClick}        
		className={classes.trim()}>
		{props.value}
	</button>;
}

Key.propTypes = {
	onClick:PropTypes.func.isRequired,
	value:PropTypes.string.isRequired,
	isActive:PropTypes.bool,
	className:PropTypes.string,
};
