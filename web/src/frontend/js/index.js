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
import { reducer as formReducer } from 'redux-form';
import { ledetekster, hentLedetekster, tidslinjer } from 'digisyfo-npm';
import moter from './mote/reducers/moter';
import epostinnhold from './mote/reducers/epostinnhold';
import rootSaga from './sagas';
import { hentNavbruker, sjekkTilgangMoteadmin } from './actions/navbruker_actions';

const rootReducer = combineReducers({
    history,
    ledere,
    navbruker,
    moter,
    epostinnhold,
    tidslinjer,
    ledetekster,
    form: formReducer,
});

const sagaMiddleware = createSagaMiddleware();

const store = createStore(rootReducer,
    applyMiddleware(sagaMiddleware)
);

sagaMiddleware.run(rootSaga);

const fnr = window.location.pathname.split('/')[2];
store.dispatch(hentNavbruker(fnr));
store.dispatch(sjekkTilgangMoteadmin());
store.dispatch(hentLedetekster());

render(<Provider store={store}>
        <AppRouter history={history} /></Provider>,
    document.getElementById('maincontent'));

export {
    store,
    history,
};
