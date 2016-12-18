import React, { Component, PropTypes } from 'react';
import Markdown from 'rsg-components/Markdown';
import cx from 'classnames';
import throttle from 'lodash/throttle';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Drawer from 'material-ui/Drawer';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();

const s = require('./StyleGuide.css');

class StyleGuideRenderer extends Component {
	static displayName = 'StyleGuideRenderer';

	static propTypes = {
		title: PropTypes.string.isRequired,
		homepageUrl: PropTypes.string.isRequired,
		components: PropTypes.object.isRequired,
		toc: PropTypes.node.isRequired,
		sidebar: PropTypes.bool,
	}

	constructor(props) {
		super(props);
		this.state = {
			drawerOpen: localStorage.getItem(`${this.constructor.displayName}DrawerOpen`) === 'true',
		};
		this.handleResize = throttle(this.handleResize, 300);
	}

	componentWillMount() {
		window.addEventListener('resize', this.handleResize);
		this.handleResize();
	}

	componentWillUpdate(nextProps, nextState) {
		localStorage.setItem(`${this.constructor.displayName}DrawerOpen`, nextState.drawerOpen);
	}

	componentWillUnmount() {
		window.removeEventListener('resize', this.handleResize);
		this.handleResize.cancel();
	}

	handleResize = () => {
		this.setState({
			isMobile: Math.max(document.documentElement.clientWidth, window.innerWidth || 0) > 800,
		});
	};

	handleOpenDrawer = () => {
		this.setState({
			drawerOpen: true,
		});
	};

	handleCloseDrawer = () => {
		this.setState({
			drawerOpen: false,
		});
	};

	render() {
		const { title, homepageUrl, components, toc, sidebar } = this.props;
		const { drawerOpen } = this.state;
		return (
			<MuiThemeProvider>
				<div className={cx(s.root, drawerOpen && sidebar && s.root_HasSidebar)}>
					<div className={s.header}>
						{sidebar &&
							<IconButton
								tooltip={drawerOpen ? 'Close filter' : 'Open filter'}
								tooltipPosition="bottom-left"
								onClick={drawerOpen ? this.handleCloseDrawer : this.handleOpenDrawer}
							>
								<FontIcon className="material-icons" color="white">bookmark</FontIcon>
							</IconButton>
						}
						{!sidebar &&
							<a href="/#">
								<IconButton
									tooltip="Back to styleguide"
									tooltipPosition="bottom-left"
								>
									<FontIcon className="material-icons" color="white">widgets</FontIcon>
								</IconButton>
							</a>
						}
					</div>
					<main className={s.content}>
						<div className={s.components}>
							{components}
						</div>
					</main>
					{sidebar &&
						<Drawer open={drawerOpen} docked={this.state.isMobile}>
							<h1 className={s.heading}>{title}</h1>
							<IconButton
								tooltip={drawerOpen ? "Close filter" : "Open filter"}
								tooltipPosition="bottom-left"
								onClick={drawerOpen ? this.handleCloseDrawer : this.handleOpenDrawer}
								style={{ position: 'absolute', top: '0.5rem', right: 0, zIndex: 2 }}
							>
								<FontIcon className="material-icons" color="white">close</FontIcon>
							</IconButton>
							<div className={s.doc}>
								<div className={s.scrollbar}>
									{toc}
								</div>
							</div>

							<footer className={s.footer}>
								<Markdown text={`Generated with [React Styleguidist](${homepageUrl})`} />
							</footer>
						</Drawer>
					}
				</div>
			</MuiThemeProvider>
		);
	}
}

export default StyleGuideRenderer;
