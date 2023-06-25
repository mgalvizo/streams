import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
// Advanced store setup to configure Redux DevTools
import { createStore, applyMiddleware, compose } from 'redux';
import reduxThunk from 'redux-thunk';

import App from './components/App';
import reducers from './reducers';

const element = document.getElementById('root');
const root = ReactDOM.createRoot(element);

// Redux DevTools code from the repo
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
    reducers,
    composeEnhancers(applyMiddleware(reduxThunk))
);

root.render(
    <Provider store={store}>
        <App />
    </Provider>
);
