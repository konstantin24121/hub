/* eslint-disable */

import React, { Component, PropTypes } from 'react';
import Markdown from 'rsg-components/Markdown';
import cx from 'classnames';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Drawer from 'material-ui/Drawer';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import ActionHome from 'material-ui/svg-icons/action/home';
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
	  this.state = {drawerOpen: localStorage.getItem(`${this.constructor.displayName}DrawerOpen`) === 'true'};
	}

	componentWillUpdate(nextProps, nextState) {
		localStorage.setItem(`${this.constructor.displayName}DrawerOpen`, nextState.drawerOpen);
	}

	handleOpenDrawer = () => {
		this.setState({
			drawerOpen: true,
		})
	};

	handleCloseDrawer = () => {
		this.setState({
			drawerOpen: false,
		})
	};

	render(){
		const { title, homepageUrl, components, toc, sidebar } = this.props;
		const { drawerOpen } = this.state;
		return(
			<MuiThemeProvider>
				<div className={cx(s.root, drawerOpen && s.root_HasSidebar)}>
					<div className={s.header}>
						<IconButton
							tooltip="Open filter"
							tooltipPosition="bottom-left"
							onClick={ drawerOpen ? this.handleCloseDrawer : this.handleOpenDrawer }
						>
					    <FontIcon className="material-icons" color="white">bookmark</FontIcon>
				    </IconButton>
					</div>
					<main className={s.content}>
						<div className={s.components}>
							{components}
						</div>
					</main>
					{sidebar &&
						<Drawer open={drawerOpen}>
							<h1 className={s.heading}>{title}</h1>
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
