import React, { PropTypes } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import { style } from './style.css';

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
