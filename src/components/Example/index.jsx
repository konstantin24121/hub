import React, { PureComponent, PropTypes } from 'react';

import { style } from './style.css';
/**
 * Example component
 */
export default class Example extends PureComponent {
	static propTypes = {
		/**
		 * Заголовок отображаемый компонентом
		 */
		name: PropTypes.string,
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
