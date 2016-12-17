import React, { PureComponent, PropTypes } from 'react';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';
import CopyToClipboard from 'react-copy-to-clipboard';
import Snackbar from 'material-ui/Snackbar';
import { lime500, blue200 } from 'material-ui/styles/colors';

const s = require('./ReactComponent.css');

class ReactComponentRenderer extends PureComponent {

	constructor(props) {
		super(props);
		this.state = {
			copied: false,
		};
	}

	handleCopy = () => {
		this.setState({
			copied: true,
		});
	};

	handleCloseSnackbar = () => {
		this.setState({
			copied: false,
		});
	};

	render() {
		const { name, pathLine, description,
			props, examples, sidebar, pure, importString } = this.props;
		return (
			<div className={s.root} id={`${name}-container`}>
				<header className={s.header}>
					<h2 className={s.primaryHeading} id={name}>
						{name}
						{pure &&
							<a
								href="https://facebook.github.io/react/docs/react-api.html#react.purecomponent"
								target="_blank"
								rel="noopener noreferrer"
								style={{ verticalAlign: 'middle' }}
							>
								<IconButton
									tooltip="This component is PureComponent"
									tooltipPosition="top-right"
									style={{ padding: 0, width: 'auto', height: 'auto' }}
								>
									<FontIcon
										className="material-icons"
										color={lime500}
									>
										flash_on
									</FontIcon>
								</IconButton>
							</a>
						}
					</h2>
					<div className={s.pathLine}>{pathLine}</div>
					{sidebar ? (
						<a className={s.isolatedLink} href={`#!/${name}`}>
							<IconButton
								tooltip="Open isolated mode"
								tooltipPosition="top-left"
								style={{ padding: 0, width: 'auto', height: 'auto' }}
							>
								<FontIcon
									className="material-icons"
								>
									bug_report
								</FontIcon>
							</IconButton>
						</a>
					) : (
						<a
							className={s.isolatedLink}
							href="#"
						>
							<IconButton
								tooltip="Close isolated mode"
								tooltipPosition="top-left"
								style={{ padding: 0, width: 'auto', height: 'auto' }}
							>
								<FontIcon
									className="material-icons"
								>
									bug_report
								</FontIcon>
							</IconButton>
						</a>
					)}
				</header>
				<div>
					{description}
				</div>
				<div className={s.importLine}>
					<CopyToClipboard
						text={importString}
						onCopy={this.handleCopy}
					>
						<span>
							{importString}
						</span>
					</CopyToClipboard>
				</div>
				<div className={s.props}>
					<h3 className={s.heading}>Props</h3>
					{props}
				</div>
				<Snackbar
					open={this.state.copied}
					message="Code copied"
					autoHideDuration={4000}
					onRequestClose={this.handleCloseSnackbar}
				/>
				{examples}
			</div>
		);
	}
}

ReactComponentRenderer.propTypes = {
	name: PropTypes.string.isRequired,
	pathLine: PropTypes.string.isRequired,
	importString: PropTypes.string.isRequired,
	description: PropTypes.node,
	props: PropTypes.node,
	examples: PropTypes.node,
	sidebar: PropTypes.bool,
	pure: PropTypes.bool,
};

export default ReactComponentRenderer;