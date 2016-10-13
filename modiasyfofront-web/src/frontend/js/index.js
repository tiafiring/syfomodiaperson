import './utils/globals';
import { render } from 'react-dom';
import React from 'react';
import AppRouter from './routers/AppRouter.js';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import history from './history.js';
import ledere from './reducers/ledere';
import navbruker from './reducers/navbruker';
import rootSaga from './sagas';
import opprettWebsocketConnection from './contextHolder';
import { hentNavbruker } from './actions/navbruker_actions';

const rootReducer = combineReducers({
    history,
    ledere,
    navbruker,
});

const sagaMiddleware = createSagaMiddleware();

const store = createStore(rootReducer,
    applyMiddleware(sagaMiddleware)
);

sagaMiddleware.run(rootSaga);

const fnr = window.location.pathname.split('/')[2];
store.dispatch(hentNavbruker(fnr));

opprettWebsocketConnection((event) => {
    store.dispatch(hentNavbruker(event.data));
    history.replace(`/sykefravaer/${event.data}`);
});

render(<Provider store={store}>
        <AppRouter history={history} /></Provider>,
    document.getElementById('maincontent'));

export {
    store,
    history,
};
