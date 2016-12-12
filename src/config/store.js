
import { createStore, applyMiddleware, compose } from 'redux';
import config from 'config';

const middleware = [
];

let enhancer;
if (__DEVTOOLS__ && __DEVELOPMENT__ && typeof window === 'object') {
	if (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) {
		const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
			name: config.name,
		}) || compose;
		enhancer = composeEnhancers(
			applyMiddleware(...middleware),
		);
		log.info('Open ReduxDevTools for debuging');
	} else {
		const { persistState } = require('redux-devtools');
		const DevTools = require('containers/DevTools').default;
		enhancer = compose(
			applyMiddleware(...middleware),
			DevTools.instrument(),
			persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
		);
	}
} else {
	enhancer = applyMiddleware(...middleware);
}

const configureStore = (initialState) => {
	const rootReducer = require('reducers').default;
	const store = createStore(rootReducer, initialState, enhancer);

	if (__DEVELOPMENT__ && module.hot) {
		// Enable Webpack hot module replacement for reducers
		module.hot.accept('reducers', () => {
			const nextRootReducer = require('reducers').default;
			store.replaceReducer(nextRootReducer);
		});
	}

	return store;
};

export default configureStore;
