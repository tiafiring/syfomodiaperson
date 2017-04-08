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
import enhet from './mote/reducers/enhet';
import virksomhet from './mote/reducers/virksomhet';
import rootSaga from './sagas/index';
import { hentNavbruker, sjekkTilgangMoteadmin } from './actions/navbruker_actions';
import { valgtEnhet } from './mote/actions/enhet_actions';
import { opprettWebsocketConnection } from './contextHolder';

const rootReducer = combineReducers({
    history,
    ledere,
    navbruker,
    moter,
    virksomhet,
    epostinnhold,
    arbeidstaker,
    enhet,
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
    document.getElementById('maincontent'));;

document.addEventListener('DOMContentLoaded', () => {
    window.pushModiacontext({
        verdi: fnr,
        eventType: 'NY_AKTIV_BRUKER',
    });

    const config = {
        config: {
            toggles: {
                visEnhetVelger: true,
                visVeileder: true,
                visSokefelt: true,
                overrideenhetersaga: true,
                overrideveiledersaga: true,
            },
            handlePersonsokSubmit: (nyttFnr) => {
                if (nyttFnr !== fnr) {
                    window.location = `/sykefravaer/${nyttFnr}`;
                }
            },
            fnr,
            applicationName: 'Sykefravær',
            handleChangeEnhet: (data) => {
                store.dispatch(valgtEnhet(data));
                window.pushModiacontext({
                    verdi: data,
                    eventType: 'NY_AKTIV_ENHET',
                });
            },
        },
    };
    window.renderDecoratorHead(config);
});

opprettWebsocketConnection((callbackValue) => {
    if (callbackValue === 'NY_AKTIV_BRUKER') {
        window.hentModiaContext({
            callbackFunc: ({ aktivBruker }) => {
                if (aktivBruker !== fnr) {
                    window.location = `/sykefravaer/${aktivBruker}`;
                }
            },
        });
    } else if (callbackValue === 'NY_AKTIV_ENHET') {
        window.hentModiaContext({
            callbackFunc: ({ aktivEnhet }) => {
                store.dispatch(valgtEnhet(aktivEnhet));
            },
        });
    }
});

export {
    store,
    history,
};
