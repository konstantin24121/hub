import React, { PureComponent, PropTypes } from 'react';

import { style } from './style.css';
/**
 * It's just components example.
 * He show how components must be designed.
 */
class Example extends PureComponent {
	static propTypes = {
		/**
		 * Заголовок отображаемый компонентом
		 */
		name: PropTypes.string.isRequired,
		/**
		 * Срабатывает при клике на компонент
		 */
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

export default Example;
/**
 * version: 0.0.1
 */
