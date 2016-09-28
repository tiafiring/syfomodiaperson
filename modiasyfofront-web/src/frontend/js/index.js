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

// <POC for contextholder>

let contextholder;
function httpGet(url) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", url, false);
    xmlHttp.send(null);
    return xmlHttp.responseText;
}

function getUserId() {
    return httpGet(window.location.origin + "/contextholder/userid");
}

function openWebSocketConnection() {
    contextholder = new WebSocket('wss://' + window.location.host + '/contextholder/websocket/' + getUserId());
    contextholderOnMessage();
}

function contextholderOnMessage() {
    contextholder.onmessage = function(e) {
        if (e.data === 'OK') {
            return;
        }
        history.replace(`/sykefravaer/${e.data}`);
    }
}

function pushNewFnr(fnr) {
    contextholder.send(fnr);
}

openWebSocketConnection();

// </POC for contextholder>

render(<Provider store={store}>
        <AppRouter history={history} /></Provider>,
    document.getElementById('maincontent'));

export {
    store,
    history,
};
