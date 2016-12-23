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
import { cyan500 } from 'material-ui/styles/colors';
import PropsEditor from '../PropsEditor';

const s = require('./Playground.css');

export default class PlaygroundRenderer extends PureComponent {
	static propTypes = {
		code: PropTypes.string.isRequired,
		showCode: PropTypes.bool.isRequired,
		showPropsEditor: PropTypes.bool.isRequired,
		name: PropTypes.string.isRequired,
		index: PropTypes.number.isRequired,
		props: PropTypes.object.isRequired,
		evalInContext: PropTypes.func.isRequired,
		onChange: PropTypes.func.isRequired,
		onCodeToggle: PropTypes.func.isRequired,
		onPropsEditorToggle: PropTypes.func.isRequired,
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
		const { code, showCode, showPropsEditor, name, index,
			singleExample, evalInContext, onChange,
			onCodeToggle, onPropsEditorToggle, props } = this.props;
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
				{(showPropsEditor && props) && (
					<PropsEditor props={props} componentName={name} code={code} />
				)}
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
							iconStyle={{ color: containerSize === 'Lg' ? cyan500 : 'currentColor' }}
						>
							tv
						</IconButton>
						<IconButton
							tooltip="Middle container"
							iconClassName="material-icons"
							onClick={this.handleChangeContainerSize('Md')}
							iconStyle={{ color: containerSize === 'Md' ? cyan500 : 'currentColor' }}
						>
							laptop
						</IconButton>
						<IconButton
							tooltip="Small container"
							iconClassName="material-icons"
							onClick={this.handleChangeContainerSize('Sm')}
							iconStyle={{ color: containerSize === 'Sm' ? cyan500 : 'currentColor' }}
						>
							tablet_android
						</IconButton>
						<IconButton
							tooltip="Extra small container"
							iconClassName="material-icons"
							onClick={this.handleChangeContainerSize('Xs')}
							iconStyle={{ color: containerSize === 'Xs' ? cyan500 : 'currentColor' }}
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
						<IconButton
							tooltip={showPropsEditor ? 'Hide props editor' : 'Show props editor'}
							iconClassName="material-icons"
							onClick={onPropsEditorToggle}
							iconStyle={{ color: showPropsEditor ? cyan500 : 'currentColor' }}
						>
							tune
						</IconButton>
						<ToolbarSeparator />
						<IconButton
							tooltip={showCode ? 'Hide code' : 'Show code'}
							iconClassName="material-icons"
							onClick={onCodeToggle}
							iconStyle={{ color: showCode ? cyan500 : 'currentColor' }}
						>
							code
						</IconButton>
					</ToolbarGroup>
				</Toolbar>
			</div>
		);
	}
}
