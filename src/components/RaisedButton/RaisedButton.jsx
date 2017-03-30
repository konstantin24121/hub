import React, { PureComponent, PropTypes } from 'react';

import cn from 'classnames';
import s from './RaisedButton.css';

class RaisedButton extends PureComponent {
	static propTypes = {
		/**
		* Текст кнопки
		 */
		label: PropTypes.string,
		/**
		 * Обработчик нажатия кнопки
		 */
		onClick: PropTypes.func,
	};

	static defaultProps = {
		label: '',
		/* eslint-disable no-unused-vars */
		onClick: (event) => {},
		/* eslint-enable no-unused-vars */
	};

	constructor(props) {
		super(props);
		this.state = {
			isRipple: false
		};
	}

	componentWillReceiveProps(nextProps) {
		this.setState({
			value: nextProps.value,
		});
	}


	/**
	 * Handles
	 */
	handleClick = (e) => {
		this.props.onClick(e);
	}

	handleMouseDown = (e) => {
		this.setState({
			isRipple: true
		});
	}

	handleMouseUp = (e) => {
		this.setState({
			isRipple: false
		});
	}

	handleRippleTransitionEnd = (e) => {
		
	}

	/**
	 * Renders
	 */
	render() {
		const { label } = this.props;
		const rootCn = cn(s.root);
		const buttonCn = cn(s.button);
		const rippleAreaCn = cn(s.ripple_area);
		const rippleWaveCn = cn(s.ripple_wave);
		const labelCn = cn(s.label);

		return (
			<div
				className={rootCn}
			>
				<button
					className={buttonCn}
					onClick={this.handleClick}
				>
					<div>
						<div className={rippleAreaCn}>
							<div className={rippleWaveCn} onTransitionEnd={this.handleRippleTransitionEnd}></div>
						</div>
						<div onMouseDown={this.handleMouseDown} onMouseUp={this.handleMouseUp}>
							<span className={labelCn}>{label}</span>
						</div>
					</div>
				</button>
			</div>
		);
	}
}

export default RaisedButton;
/**
 * version: 0.1.0
 */