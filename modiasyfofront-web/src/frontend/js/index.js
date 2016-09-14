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
const ledereJson = require('./mockData/ledere.json');
const navBrukerJson = require('./mockData/navBruker.json');

const rootReducer = combineReducers({
    history,
    ledere,
    navBruker,
});

const store = createStore(rootReducer,
    applyMiddleware(thunkMiddleware)
);

store.dispatch(setLedere(ledereJson));
store.dispatch(setNavBruker(navBrukerJson));

render(<Provider store={store}>
        <AppRouter history={history} /></Provider>,
    document.getElementById('maincontent'));

export {
    store,
    history,
};
