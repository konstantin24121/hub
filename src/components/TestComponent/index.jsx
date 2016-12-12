import React, { PureComponent, PropTypes } from 'react';
import { style } from './style.css';

export default class TestComponent extends PureComponent {
	static propTypes = {
		name: PropTypes.string,
		onClick: PropTypes.func,
	};

	static defaultProps = {
		name: 'btn',
		onClick: () => {},
	}

	render() {
		const { name, onClick } = this.props;
		return (
			<button className={style} onClick={onClick}>{name}</button>
		);
	}
}
