import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import * as testActions from 'actions/testAction';

import TestComponent from 'components/TestComponent';

class Page extends Component {
	static propTypes = {
		name: PropTypes.string,
	};

	constructor(props) {
		super(props);
	}

	handleClick = () => {
		this.props.incrementCounter();
	};

	render() {
		const { counter } = this.props;
		return (
			<div>
				Page zad - {counter}
				<TestComponent name="inc" onClick={this.handleClick} />
			</div>
		);
	}
}

function mapStateToProps(state){
	return {
		counter: state.sample.counter
	};
}

export default connect(mapStateToProps, testActions)(Page);
