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
import sykmeldinger from './reducers/sykmeldinger';
import arbeidsgiversSykmeldinger from './reducers/arbeidsgiversSykmeldinger';
import { reducer as formReducer } from 'redux-form';
import { ledetekster, hentLedetekster, tidslinjer, hasURLParameter } from 'digisyfo-npm';
import moter from './mote/reducers/moter';
import epostinnhold from './mote/reducers/epostinnhold';
import arbeidstaker from './mote/reducers/arbeidstaker';
import virksomhet from './mote/reducers/virksomhet';
import rootSaga from './sagas/index';
import { hentNavbruker, sjekkTilgangMoteadmin } from './actions/navbruker_actions';
import { opprettWebsocketConnection } from './contextHolder';

const rootReducer = combineReducers({
    history,
    ledere,
    navbruker,
    moter,
    virksomhet,
    epostinnhold,
    arbeidstaker,
    tidslinjer,
    sykmeldinger,
    arbeidsgiversSykmeldinger,
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

if (hasURLParameter('visLedetekster')) {
    localStorage.setItem('visLedetekster', true);
} else {
    localStorage.removeItem('visLedetekster');
}

render(<Provider store={store}>
        <AppRouter history={history} /></Provider>,
    document.getElementById('maincontent'));

document.addEventListener('DOMContentLoaded', () => {
    const config = {
        config: {
            toggles: {
                visEnhetVelger: true,
                visVeileder: true,
                visSokefelt: true,
            },
            handlePersonsokSubmit: (nyttFnr) => {
                if (nyttFnr !== fnr) {
                    window.pushModiacontext({
                        fnr: nyttFnr,
                        callbackFunc: () => { window.location = "/sykefravaer/" + nyttFnr; }
                    });
                }
            },
            fnr,
            applicationName: 'Sykefravær',
        },
    };
    window.renderDecoratorHead(config);
});

opprettWebsocketConnection((callbackValue) => {

    if (callbackValue === 'NY_AKTIV_BRUKER') {
        window.hentModiaContext({
            callbackFunc: ({ aktivBruker }) => {
                if (aktivBruker !== fnr) {
                    window.location = "/sykefravaer/" + aktivBruker;
                }
            }
        });
    }

    if (callbackValue === 'NY_AKTIV_ENHET') {
        window.hentModiaContext({
            callbackFunc: ({ aktivEnhet }) => {
                if (aktivEnhet) {
                    console.log(aktivEnhet);
                }
            }
        });
    }


});

export {
    store,
    history,
};
