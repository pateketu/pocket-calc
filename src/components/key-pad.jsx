import React from 'react';
import {Operation} from '../domain/calculator';
import Key from './key';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import * as actions from '../redux/calcActions';
export class KeyPad extends React.PureComponent{
     
	constructor(props){
		super(props);
		this.createOperationKeys();
		this.createNumberKeys();
		this.createArthmaticOperationKeys();
	}

	createOperationKeys(){
		this.operationKeys = {
			'C': () => this.props.clear(),
			[Operation.POSITIVE_NEGATIVE] : () => this.props.operation(Operation.POSITIVE_NEGATIVE),
			[Operation.PERCENTAGE]: () => this.props.operation(Operation.PERCENTAGE)
		};
	}

	createNumberKeys(){
		this.numberKeys = [
			{key:0, action:() => this.props.input(0)},
			{key:'.', action:() => this.props.point()}
		];	
		
		for(let i=1;i<=9;i++){
			this.numberKeys.push({key:i, action:()=>this.props.input(i)});
		}
	}

	createArthmaticOperationKeys(){
		this.arthmaticOperationKeys = {
			[Operation.DIVIDE]: ()=>this.props.operation(Operation.DIVIDE),
			[Operation.MULTIPLY]: ()=>this.props.operation(Operation.MULTIPLY),
			[Operation.SUBTRACT]: ()=>this.props.operation(Operation.SUBTRACT),
			[Operation.ADD]: ()=>this.props.operation(Operation.ADD),
			[Operation.EQUAL]: ()=>this.props.operation(Operation.EQUAL)
		};
	}

	handleWithCatch = (func)=>{
		try{
			func();
		}catch(error){
			this.props.error(error);
		}
	}
	
	render(){
		return <div className="d-flex keyPad">
			<div className="keyPad-col-1">
				<div className="d-flex operationKeys">
					{ 
						Object.keys(this.operationKeys).map(key =>
							<Key key={key} 
								value={key} 
								onClick={()=> this.handleWithCatch(()=> 
									this.operationKeys[key]())}>
							</Key>)
					}
				</div>
				<div className="d-flex flex-wrap-reverse numberKeys">
					{
						this.numberKeys.map(numberKey=>
							<Key key={numberKey.key} 
								className={`number-key-${numberKey.key}`}
								value={numberKey.key.toString()} 
								onClick={()=> numberKey.action()}>
							</Key>)
					}
				</div>
			</div>
			<div className="d-flex flex-column arthmaticOperationKeys">
				{
					Object.keys(this.arthmaticOperationKeys).map(key =>
						<Key key={key} 
							value={key} 
							isActive = {this.props.currentOperation === key}
							onClick={()=> this.handleWithCatch(()=> 
								this.arthmaticOperationKeys[key]())}>
						</Key>)
				}
			</div>
		</div>;
	}    
}

export default connect((state)=>({
	currentOperation:state.currentOperation
}),
(dispath)=>({
	operation:(ops)=>dispath(actions.operation(ops)),
	clear:()=>dispath(actions.clear()),
	input:(number)=>dispath(actions.input(number)),
	point:()=>dispath(actions.point()),
	error:(error)=>dispath(actions.error(error))
}))(KeyPad);

KeyPad.propTypes = {
	currentOperation:PropTypes.string,
	clear:PropTypes.func.isRequired,
	operation:PropTypes.func.isRequired,
	input:PropTypes.func.isRequired,
	point:PropTypes.func.isRequired,
	error:PropTypes.func.isRequired
};
