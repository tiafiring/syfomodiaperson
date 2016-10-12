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

opprettWebsocketConnection((event) => {

    if (event === "onerror") {
        document.getElementById('contextholderfeil').style.display = "block";
    } else {
        document.getElementById('contextholderoppdatering').style.display = "block";
        history.replace(`/sykefravaer/${event.data}`);
    }
});

render(<Provider store={store}>
        <AppRouter history={history} /></Provider>,
    document.getElementById('maincontent'));

export {
    store,
    history,
};
