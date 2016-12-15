import React, { PureComponent, PropTypes } from 'react';
import { style } from './style.css';

export default class Example extends PureComponent {
	static propTypes = {
		name: PropTypes.string,
		onClick: PropTypes.func,
	};

	static defaultProps = {
		name: 'example',
		onClick: () => {},
	}

	render() {
		const { name, onClick } = this.props;
		return (
			<div className={style} onClick={onClick}>{name}</div>
		);
	}
}
