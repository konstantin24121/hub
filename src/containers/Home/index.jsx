import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';
import * as testActions from 'actions/testAction';

import TestComponent from 'components/TestComponent';

class Home extends Component {
	static propTypes = {
		name: PropTypes.string,

		// Store
		counter: PropTypes.number,

		// Dispatchers
		decrementCounter: PropTypes.func,
	};

	constructor(props) {
		super(props);
	}

	handleClick = () => {
		console.log('click');
	};

	render() {
		const { counter } = this.props;
		return (
			<div>
				Home. Counter from store zad - {counter}
				<TestComponent name="inc" onClick={this.handleClick} />
				<TestComponent name="dec" onClick={this.props.decrementCounter} />
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		counter: state.sample.counter,
	};
}

function matchDispatchToProps(dispatch){

}

export default connect(mapStateToProps, testActions)(Home);
