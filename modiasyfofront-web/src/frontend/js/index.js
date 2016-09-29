import { render } from 'react-dom';
import React from 'react';
import AppRouter from './routers/AppRouter.js';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import history from './history.js';
import ledere from './reducers/ledere';
import navBruker from './reducers/navBruker';
import rootSaga from './sagas';

const rootReducer = combineReducers({
    history,
    ledere,
    navBruker,
});

const sagaMiddleware = createSagaMiddleware();

const store = createStore(rootReducer,
    applyMiddleware(sagaMiddleware)
);

sagaMiddleware.run(rootSaga);

// <POC for contextholder>

let contextholder;
function httpGet(url) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", url, false);
    xmlHttp.send(null);
    return xmlHttp.responseText;
}

function getNode() {
    return httpGet(window.location.origin + "/contextholder/finnnode");
}

function getUserId() {
    return httpGet(window.location.origin + "/contextholder/userid");
}

function openWebSocketConnection() {
    contextholder = new WebSocket('wss://' + getNode() + ':8443/contextholder/websocket/' + getUserId());
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

openWebSocketConnection();

// </POC for contextholder> 

setTimeout(() => {
    history.replace(`/sykefravaer/887766`);
}, 3000);

render(<Provider store={store}>
        <AppRouter history={history} /></Provider>,
    document.getElementById('maincontent'));

export {
    store,
    history,
};
