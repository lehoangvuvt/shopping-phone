import React from 'react';
import ReactDOM from 'react-dom';
import { store } from './store/index.js';
import { Provider } from 'react-redux';
import App from './containers/App.js';

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('root')
);