import React, { PropTypes } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const App = ({ children }) => (
	<div>
		<MuiThemeProvider>
			{children}
		</MuiThemeProvider>
	</div>
);

App.propTypes = {
	children: PropTypes.node.isRequired,
};

export default App;
