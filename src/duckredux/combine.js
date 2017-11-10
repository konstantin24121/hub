import { combineReducers } from 'redux';

import sample from './modules/sample';

const rootReduser = combineReducers({
  sample,
});

export default rootReduser;
