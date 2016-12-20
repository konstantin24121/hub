import React, { PropTypes, PureComponent } from 'react';
import Editor from 'rsg-components/Editor';
import Preview from 'rsg-components/Preview';
import RaisedButton from 'material-ui/RaisedButton';
import IconButton from 'material-ui/IconButton';
import MenuItem from 'material-ui/MenuItem';
import IconMenu from 'material-ui/IconMenu';
import Palette from 'material-ui/svg-icons/image/palette';
import cn from 'classnames';
import { Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle } from 'material-ui/Toolbar';

const s = require('./Playground.css');

export default class PlaygroundRenderer extends PureComponent {
	static propTypes = {
		code: PropTypes.string.isRequired,
		showCode: PropTypes.bool.isRequired,
		name: PropTypes.string.isRequired,
		index: PropTypes.number.isRequired,
		evalInContext: PropTypes.func.isRequired,
		onChange: PropTypes.func.isRequired,
		onCodeToggle: PropTypes.func.isRequired,
		singleExample: PropTypes.bool,
	};

	constructor(props) {
		super(props);
		this.state = {
			containerSize: 'Lg',
			containerBg: 'Light',
		};
	}

	handleChangeContainerSize = (size) => () => {
		this.setState({ containerSize: size });
	};

	handleChangeContainerBackground = (event, value) => {
		this.setState({ containerBg: value });
	}

	render() {
		const { code, showCode, name, index,
			singleExample, evalInContext, onChange, onCodeToggle } = this.props;
		const { containerSize, containerBg } = this.state;

		const previewClass = cn(s.preview, 'rsg--example-preview',
			s[`preview_Size${containerSize}`],
			s[`preview_Bg${containerBg}`],
		);

		return (
			<div className={s.root}>
				<div className={s.previewBox}>
					<div className={previewClass}>
						<Preview code={code} evalInContext={evalInContext} />
					</div>
				</div>
				{showCode && (
					<div>
						<Editor code={code} onChange={onChange} />
					</div>
				)}
				<Toolbar>
					<ToolbarGroup>
						<IconButton
							tooltip="Large container"
							iconClassName="material-icons"
							onClick={this.handleChangeContainerSize('Lg')}
							iconStyle={{ color: containerSize === 'Lg' ? 'rgb(0, 188, 212)' : 'currentColor' }}
						>
							tv
						</IconButton>
						<IconButton
							tooltip="Middle container"
							iconClassName="material-icons"
							onClick={this.handleChangeContainerSize('Md')}
							iconStyle={{ color: containerSize === 'Md' ? 'rgb(0, 188, 212)' : 'currentColor' }}
						>
							laptop
						</IconButton>
						<IconButton
							tooltip="Small container"
							iconClassName="material-icons"
							onClick={this.handleChangeContainerSize('Sm')}
							iconStyle={{ color: containerSize === 'Sm' ? 'rgb(0, 188, 212)' : 'currentColor' }}
						>
							tablet_android
						</IconButton>
						<IconButton
							tooltip="Extra small container"
							iconClassName="material-icons"
							onClick={this.handleChangeContainerSize('Xs')}
							iconStyle={{ color: containerSize === 'Xs' ? 'rgb(0, 188, 212)' : 'currentColor' }}
						>
							phone_android
						</IconButton>
						<ToolbarSeparator />
						<IconMenu
							onChange={this.handleChangeContainerBackground}
							value={containerBg}
							iconButtonElement={
								<IconButton touch>
									<Palette />
								</IconButton>
							}
						>
							<MenuItem value="Dark" primaryText="Dark" />
							<MenuItem value="Light" primaryText="Light" />
							<MenuItem value="Transparent" primaryText="Transparent" />
						</IconMenu>
					</ToolbarGroup>
					<ToolbarGroup>
						<RaisedButton primary label={showCode ? 'Hide code' : 'Show code'} onClick={onCodeToggle} />
					</ToolbarGroup>
				</Toolbar>
			</div>
		);
	}
}
