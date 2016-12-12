/* eslint react/jsx-filename-extension: "off" */

import React from 'react';
import { Route, IndexRoute } from 'react-router';

import { App, Home, Page } from 'containers';

export default () => (
	<Route path="/" component={App}>
		{ /* Home (main) route */ }
		<IndexRoute component={Home} />
		<Route path="/page" component={Page} />
	</Route>
);
