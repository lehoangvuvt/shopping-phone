import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from '../reducer/index';
import createSagaMiddleware from 'redux-saga';
import rootSaga from '../saga/saga';

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const sagaMiddleware = createSagaMiddleware();

export const store = createStore(   
    rootReducer,
    composeEnhancer(applyMiddleware(sagaMiddleware)),
);

sagaMiddleware.run(rootSaga);
