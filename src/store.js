import { createStore, applyMiddleware } from 'redux';
import createPromise from 'redux-promise-middleware';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';

import createReducer from './reducers';

const promiseMiddleWare = createPromise({
    promiseTypeSuffixes: [ 'PENDING', 'SUCCESS', 'ERROR' ]
});


// 根据不同环境加载所需的 middlewares
let middlewares;
if (process.env.NODE_ENV === 'production') {
    middlewares = [
        thunkMiddleware,
        promiseMiddleWare
    ];
} else {
    const logger = createLogger({
        level: 'info',
        duration: true,
        collapsed: true
    });
    middlewares = [
        thunkMiddleware,
        promiseMiddleWare,
        logger
    ];
}

function configureStore(initialState) {
    const store = createStore(createReducer(), initialState, applyMiddleware(...middlewares));
    store.asyncReducers = {};
    return store;
}

const initialState = {};

const store = configureStore(initialState);


export function injectAsyncReducer(asyncReducers) {
    Object.assign(store.asyncReducers, asyncReducers);
    store.replaceReducer(createReducer(store.asyncReducers));
}

export default store;
