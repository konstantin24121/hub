import React, { Component, PropTypes } from 'react';

export default class App extends Component {
	static propTypes = {
		name: PropTypes.string,
	};

	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div>
				{this.props.children}
			</div>
		);
	}
}
