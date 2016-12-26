import React, { PropTypes, PureComponent } from 'react';
import IconButton from 'material-ui/IconButton';
import MenuItem from 'material-ui/MenuItem';
import IconMenu from 'material-ui/IconMenu';
import Palette from 'material-ui/svg-icons/image/palette';
import Tv from 'material-ui/svg-icons/hardware/tv';
import Laptop from 'material-ui/svg-icons/hardware/laptop';
import Tablet from 'material-ui/svg-icons/hardware/tablet-android';
import Phone from 'material-ui/svg-icons/hardware/phone-android';
import { cyan500 } from 'material-ui/styles/colors';
import Responsive from 'react-responsive-decorator';
import cn from 'classnames';

import s from './Toolbar.css';

@Responsive
class Toolbar extends PureComponent {
	static propTypes = {
		containerSize: PropTypes.string.isRequired,
		containerBg: PropTypes.string.isRequired,
		showCode: PropTypes.bool.isRequired,
		showPropsEditor: PropTypes.bool.isRequired,
		onColorChange: PropTypes.func.isRequired,
		onSizeChange: PropTypes.func.isRequired,
		onCodeClick: PropTypes.func.isRequired,
		onPropsEditorClick: PropTypes.func.isRequired,
	};

	componentWillMount() {
		const { media } = this.props;
		media({ minWidth: 800 }, () => {
			this.setState({
				isMobile: false,
			});
		});

		media({ maxWidth: 800 }, () => {
			this.setState({
				isMobile: true,
			});
		});
	}

	renderDimentionSet = () => {
		const { containerSize, onSizeChange } = this.props;
		return (
			<span>

				<IconButton
					tooltip="Large container"
					iconClassName="material-icons"
					onClick={onSizeChange('Lg')}
					iconStyle={{ color: containerSize === 'Lg' ? cyan500 : 'currentColor' }}
				>
					tv
				</IconButton>
				<IconButton
					tooltip="Middle container"
					iconClassName="material-icons"
					onClick={onSizeChange('Md')}
					iconStyle={{ color: containerSize === 'Md' ? cyan500 : 'currentColor' }}
				>
					laptop
				</IconButton>
				<IconButton
					tooltip="Small container"
					iconClassName="material-icons"
					onClick={onSizeChange('Sm')}
					iconStyle={{ color: containerSize === 'Sm' ? cyan500 : 'currentColor' }}
				>
					tablet_android
				</IconButton>
				<IconButton
					tooltip="Extra small container"
					iconClassName="material-icons"
					onClick={onSizeChange('Xs')}
					iconStyle={{ color: containerSize === 'Xs' ? cyan500 : 'currentColor' }}
				>
					phone_android
				</IconButton>
			</span>
		);
	};

	renderDimentionSelect = () => {
		const { containerSize, onSizeChange } = this.props;
		const handle = (event, value) => onSizeChange(value)();
		return (
			<IconMenu
				onChange={handle}
				value={containerSize}
				iconButtonElement={
					<IconButton
						touch
						iconStyle={{ color: cyan500 }}
					>
						{containerSize === 'Lg' && <Tv />}
						{containerSize === 'Md' && <Laptop />}
						{containerSize === 'Sm' && <Tablet />}
						{containerSize === 'Xs' && <Phone />}
					</IconButton>
				}
			>
				<MenuItem value="Lg" primaryText="Desctop" />
				<MenuItem value="Md" primaryText="Laptop" />
				<MenuItem value="Sm" primaryText="Tablet" />
				<MenuItem value="Xs" primaryText="Phone" />
			</IconMenu>
		);
	};

	render() {
		const { containerBg, showCode, showPropsEditor,
		onColorChange, onCodeClick, onPropsEditorClick } = this.props;
		const { isMobile } = this.state;

		return (
			<div className={s.toolbar}>
				<div className={s.toolbarGroup}>
					{isMobile ? this.renderDimentionSelect() : this.renderDimentionSet()}
					<div className={s.toolbarSeparator} />
					<IconMenu
						onChange={onColorChange}
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
				</div>
				<div className={cn(s.toolbarGroup, s.toolbarGroup_left)}>
					<div className={s.toolbarSeparator} />
					<IconButton
						tooltip={showPropsEditor ? 'Hide props editor' : 'Show props editor'}
						iconClassName="material-icons"
						onClick={onPropsEditorClick}
						iconStyle={{ color: showPropsEditor ? cyan500 : 'currentColor' }}
					>
						tune
					</IconButton>
					<IconButton
						tooltip={showCode ? 'Hide code' : 'Show code'}
						iconClassName="material-icons"
						onClick={onCodeClick}
						iconStyle={{ color: showCode ? cyan500 : 'currentColor' }}
					>
						code
					</IconButton>
				</div>
			</div>
		);
	}
}

export default Toolbar;
