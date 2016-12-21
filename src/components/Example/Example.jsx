import React, { PureComponent, PropTypes } from 'react';

import s from './Example.css';
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
		 * Размер компонента
		 */
		size: PropTypes.oneOf(['big', 'medium', 'small']),
		/**
		 * Срабатывает при клике на компонент
		 */
		onClick: PropTypes.func,
	};

	static defaultProps = {
		onClick: () => {},
	}

	render() {
		const { name, onClick } = this.props;
		return (
			<div className={s.root} onClick={onClick}>{name}</div>
		);
	}
}

export default Example;
/**
 * version: 0.0.1
 */
