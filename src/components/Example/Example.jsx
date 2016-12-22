import React, { PureComponent, PropTypes } from 'react';
import cn from 'classnames';

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
		 * Бэбс. Просто баба
		 */
		count: PropTypes.number,
		/**
		 * Срабатывает при клике на компонент
		 */
		onClick: PropTypes.func,
	};

	static defaultProps = {
		count: 5,
		onClick: (string, anotherString) => {},
	}

	handleClick = () => {
		this.props.onClick('zad', 'пухлый');
	};

	render() {
		const { name, count, size } = this.props;
		const rootClass = cn(s.root, s[`root_${size}`]);
		return (
			<div className={rootClass} onClick={this.handleClick}>
				{name}
				{count && `, ${count}`}
			</div>
		);
	}
}

export default Example;
/**
 * version: 0.0.1
 */
