import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

export class Display extends React.PureComponent{	
	render(){		
		return<div className='display-4 text-right display'>
			{this.props.value}
		</div>;
	}
}

Display.propTypes = {	
	value:PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number
	]).isRequired
};

export default connect((state)=>({    
	value:state.currentVal
}))(Display);