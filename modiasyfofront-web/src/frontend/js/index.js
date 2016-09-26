import { render } from 'react-dom';
import React from 'react';
import AppRouter from './routers/AppRouter.js';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import history from './history.js';
import ledere from './reducers/ledere';
import navBruker from './reducers/navBruker';
import { setLedere } from './actions/ledere_actions';
import { setNavBruker } from './actions/navBruker_actions';
import { setBrukersSykmeldinger } from './actions/brukersSykmeldinger_actions';
import { setArbeidsgiversSykmeldinger } from './actions/arbeidsgiversSykmeldinger_actions';
import { setNavsSykmeldinger } from './actions/navsSykmeldinger_actions';
import arbeidsgiversSykmeldinger from './reducers/arbeidsgiversSykmeldinger';
import brukersSykmeldinger from './reducers/brukersSykmeldinger';
import navsSykmeldinger from './reducers/navsSykmeldinger';

const ledereJson = require('./mockData/ledere.json');
const navBrukerJson = require('./mockData/navBruker.json');
const sykmeldingerJson = require('./mockData/sykmeldinger.json');

const rootReducer = combineReducers({
    history,
    ledere,
    navBruker,
    arbeidsgiversSykmeldinger,
    brukersSykmeldinger,
    navsSykmeldinger,
});

const store = createStore(rootReducer,
    applyMiddleware(thunkMiddleware)
);

store.dispatch(setLedere(ledereJson));
store.dispatch(setNavBruker(navBrukerJson));
store.dispatch(setBrukersSykmeldinger(sykmeldingerJson));
store.dispatch(setArbeidsgiversSykmeldinger(sykmeldingerJson));
store.dispatch(setNavsSykmeldinger(sykmeldingerJson));

render(<Provider store={store}>
        <AppRouter history={history} /></Provider>,
    document.getElementById('maincontent'));

export {
    store,
    history,
};
