import React, { PropTypes } from 'react';

import s from './style.css';

const App = ({ children }) => (
  <div>
    <div className={s.root}>
      {children}
    </div>
  </div>
);

App.propTypes = {
  children: PropTypes.node.isRequired,
};

export default App;
