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
			isRipple: false,
			isClicked: true,
			isAnimate: false,
			d: 0,
			l: 0,
			t: 0
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
		const mouseEvent = e.nativeEvent;
		const elementWidth = mouseEvent.target.clientWidth;
		const elementHeight = mouseEvent.target.clientHeight;
		let _t = mouseEvent.offsetY;
		let _l = mouseEvent.offsetX;
		const box = {
			tl: {
				x: 0,
				y: 0
			},
			tr: {
				x: elementWidth,
				y: 0
			},
			br: {
				x: elementWidth,
				y: elementHeight
			},
			bl: {
				x: 0,
				y: elementHeight
			},
			c: {
				x: elementWidth / 2,
				y: elementHeight / 2
			}
		};

		let corner = {};

		if (_l >= box.c.x) {
			if (_t >= box.c.y) {
				corner = box.tl;
			} else {
				corner = box.bl;
			}
		} else {
			if (_t >= box.c.y) {
				corner = box.tr;
			} else {
				corner = box.br;
			}
		}

		const _r = Math.round( Math.sqrt( Math.pow(corner.x - _l, 2) + Math.pow(corner.y - _t, 2) ) );

		const _d = _r * 2;
		_l = _l - _r;
		_t = _t - _r;

		this.setState({
			isRipple: true,
			isClicked: false,
			isAnimate: true,
			t: _t,
			l: _l,
			d: _d
		});
	}

	handleMouseUp = (e) => {
		if (this.state.isAnimate) {
			this.setState({
				isClicked: true
			});
		} else {
			this.setState({
				isClicked: true,
				isRipple: false
			})
		}
	}

	handleRippleTransitionEnd = (e) => {
		console.log(e.nativeEvent.propertyName);
		if (this.state.isClicked) {
			this.setState({
				isAnimate: false,
				isRipple: false
			});
		} else {
			this.setState({
				isAnimate: false
			});
		}
	}

	/**
	 * Renders
	 */
	render() {
		const { label } = this.props;
		const {isRipple, t, l, d} = this.state;
		const rootCn = cn(s.root);
		const buttonCn = cn(s.button, {
			[s.isRipple] : isRipple
		});
		const rippleAreaCn = cn(s.ripple_area);
		const rippleWaveCn = cn(s.ripple_wave);
		const labelCn = cn(s.label);
		const rippleStyle = {
			top: t + 'px',
			left: l + 'px',
			width: d + 'px',
			height: d + 'px'
		};

		return (
			<div
				className={rootCn}
			>
				<button
					className={buttonCn}
					onMouseDown={this.handleMouseDown}
					onMouseUp={this.handleMouseUp}
				>
					<div>
						<div className={rippleAreaCn}>
							<div
								className={rippleWaveCn}
								onTransitionEnd={this.handleRippleTransitionEnd}
								style={rippleStyle}
							>
							</div>
						</div>
						<div>
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