import React, {Component} from 'react';
import Calculator from './components/calculator';
import {Provider} from 'react-redux';
import store from './redux/store';
import './App.css';
import './eelogo.jpg';
class App extends Component {
	render() {
		return (
			<Provider store={store}>
				<Calculator></Calculator>
			</Provider>
		);
	}
}  
export default App;