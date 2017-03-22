import React, { PureComponent, PropTypes } from 'react';


class RaisedButton extends PureComponent {
	static propTypes = {
		/**
		* Текст кнопки
		 */
		text: PropTypes.string,
		/**
		 * Обработчик нажатия кнопки
		 */
		onClick: PropTypes.func,
	};

	static defaultProps = {
		text: '',
		/* eslint-disable no-unused-vars */
		onClick: (event) => {},
		/* eslint-enable no-unused-vars */
	};

	constructor(props) {
		super(props);
		this.state = {
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

	/**
	 * Renders
	 */
	render() {
		const { text } = this.props;

		return (
			<button
				onClick={this.handleClick}
			>
				{text}
			</button>
		);
	}
}

export default RaisedButton;
/**
 * version: 0.1.0
 */